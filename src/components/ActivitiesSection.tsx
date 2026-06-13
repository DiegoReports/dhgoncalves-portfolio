import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/config/site";
import {
  useStravaActivities,
  normalizePolyline,
  polylineToPath,
  getPolylinePoints,
  formatDistance,
  formatPace,
  formatDuration,
  hasGpsRoute,
  type StravaActivity,
} from "@/hooks/useStravaActivities";

const STRAVA_ORANGE = "#FC4C02";
const ADIDAS_GREEN = "#00A866";

// ── Icon mappings ─────────────────────────────────────────────────────────────

const WORKOUT_ICONS: Record<string, string> = {
  WeightTraining: "mdi:weight-lifter",
  Workout: "mdi:dumbbell",
  Yoga: "mdi:yoga",
  Crossfit: "mdi:weight",
  EllipticalTrainer: "mdi:run",
  StairStepper: "mdi:stairs",
  Swim: "mdi:swim",
  Golf: "mdi:golf",
  Soccer: "mdi:soccer",
  VirtualRide: "mdi:bicycle-electric",
  default: "mdi:lightning-bolt",
};

function getWorkoutIcon(activity: StravaActivity): string {
  return (
    WORKOUT_ICONS[activity.sport_type] ??
    WORKOUT_ICONS[activity.type] ??
    WORKOUT_ICONS.default
  );
}

// ── Hobbies config ────────────────────────────────────────────────────────────

const HOBBIES_CONFIG = [
  {
    icon: "mdi:bicycle",
    key: "cycling" as const,
    color: "#3B82F6",
    animate: { rotate: [-6, 6, -6] },
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    icon: "mdi:run-fast",
    key: "running" as const,
    color: "#22c55e",
    animate: { y: [-2, 2, -2] },
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    icon: "noto:soccer-ball",
    key: "futsal" as const,
    color: "#a3e635",
    animate: null,
    transition: null,
  },
];

// ── StatusBadge ───────────────────────────────────────────────────────────────

type Status = "loading" | "online" | "offline";

function StatusBadge({ status }: { status: Status }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center w-3 h-3">
        {status === "online" && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500"
            animate={{ scale: [1, 2.8, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        {status === "loading" ? (
          <Icon icon="svg-spinners:pulse-2" width={12} style={{ color: "#facc15" }} />
        ) : (
          <div
            className={`w-2 h-2 rounded-full ${
              status === "online" ? "bg-green-500" : "bg-red-500"
            }`}
          />
        )}
      </div>
      <span className="font-code text-xs text-muted-foreground">
        {status === "online"
          ? "Live · Strava"
          : status === "loading"
          ? "Connecting…"
          : "Offline"}
      </span>
    </div>
  );
}

// ── RouteMap (GPS activities — animated drawing) ───────────────────────────────

function RouteMap({ activity, wide = false }: { activity: StravaActivity; wide?: boolean }) {
  const w = wide ? 480 : 240;
  const h = wide ? 130 : 115;
  const points = getPolylinePoints(activity);
  const polylineStr = normalizePolyline(points, w, h, 10);
  const pathD = polylineToPath(polylineStr);
  const filterId = `glow-${activity.id}`;

  if (!pathD) return null;

  const pairs = polylineStr.split(" ");
  const firstPair = pairs[0]?.split(",");
  const lastPair = pairs[pairs.length - 1]?.split(",");
  const hasEndDot =
    lastPair && pairs.length > 1 && pairs[0] !== pairs[pairs.length - 1];

  const drawTransition = {
    pathLength: {
      duration: 4.5,
      ease: "linear" as const,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 0.8,
    },
    opacity: { duration: 0.4 },
  };

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      className="rounded-xl mt-auto block"
      style={{ background: "rgba(252,76,2,0.04)", minHeight: h }}
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Halo — animated in sync */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={STRAVA_ORANGE}
        strokeWidth={wide ? 9 : 8}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        opacity={0.1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={drawTransition}
      />

      {/* Main route — animated drawing */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={STRAVA_ORANGE}
        strokeWidth={wide ? 2.5 : 2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.92 }}
        transition={drawTransition}
      />

      {/* Start dot — green, always visible */}
      {firstPair && (
        <circle
          cx={firstPair[0]}
          cy={firstPair[1]}
          r={4}
          fill="#22c55e"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth={1}
        />
      )}

      {/* End dot — orange, always visible */}
      {hasEndDot && (
        <circle
          cx={lastPair![0]}
          cy={lastPair![1]}
          r={5}
          fill={STRAVA_ORANGE}
          stroke="rgba(0,0,0,0.35)"
          strokeWidth={1}
        />
      )}
    </svg>
  );
}

// ── WorkoutCard (non-GPS activities) ─────────────────────────────────────────

function WorkoutCard({ activity }: { activity: StravaActivity }) {
  const icon = getWorkoutIcon(activity);
  const duration = formatDuration(activity.moving_time);
  const elevation =
    activity.total_elevation_gain > 0
      ? `${activity.total_elevation_gain.toFixed(0)}m elev.`
      : null;
  const sportLabel = (activity.sport_type || activity.type)
    .replace(/([A-Z])/g, " $1")
    .trim();

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-3 py-4 rounded-xl mt-auto"
      style={{ background: "rgba(252,76,2,0.04)" }}
    >
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-2xl border border-border/30 bg-foreground/5 flex items-center justify-center"
      >
        <Icon icon={icon} width={30} height={30} className="text-foreground/70" />
      </motion.div>
      <div className="text-center space-y-0.5">
        <p className="font-code text-xs text-muted-foreground capitalize">{sportLabel}</p>
        <p className="font-code text-sm font-semibold" style={{ color: STRAVA_ORANGE }}>
          {duration}
        </p>
        {elevation && (
          <p className="font-code text-xs text-muted-foreground">{elevation}</p>
        )}
      </div>
    </div>
  );
}

// ── ActivitySkeleton ──────────────────────────────────────────────────────────

function ActivitySkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className="glass-card p-5 animate-pulse h-full flex flex-col gap-3"
      style={{ borderColor: `${STRAVA_ORANGE}20` }}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-muted" />
        <div className="h-3 w-20 rounded bg-muted" />
      </div>
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="h-3 w-1/2 rounded bg-muted" />
      <div className="rounded-xl bg-muted flex-1" style={{ minHeight: wide ? 130 : 115 }} />
    </div>
  );
}

// ── ActivityCard ──────────────────────────────────────────────────────────────

function ActivityCard({
  activity,
  wide = false,
  delay = 0,
  isInView,
}: {
  activity: StravaActivity;
  wide?: boolean;
  delay?: number;
  isInView: boolean;
}) {
  const gps = hasGpsRoute(activity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, borderColor: `${STRAVA_ORANGE}25` }}
      animate={
        isInView
          ? { opacity: 1, y: 0, borderColor: `${STRAVA_ORANGE}25` }
          : { opacity: 0, y: 24, borderColor: `${STRAVA_ORANGE}25` }
      }
      whileHover={{ y: -4, borderColor: `${STRAVA_ORANGE}55` }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card p-5 flex flex-col gap-3 h-full cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/assets/strava_icon_130820.webp"
            alt="Strava"
            className="w-5 h-5 object-contain"
          />
          <span className="font-code text-xs" style={{ color: STRAVA_ORANGE }}>
            Strava
          </span>
        </div>
        {gps ? (
          <Icon
            icon={
              activity.type === "Ride" || activity.sport_type === "Ride"
                ? "mdi:bicycle"
                : activity.type === "Walk"
                ? "mdi:walk"
                : "mdi:run-fast"
            }
            width={18}
            className="text-muted-foreground"
          />
        ) : (
          <Icon icon={getWorkoutIcon(activity)} width={18} className="text-muted-foreground" />
        )}
      </div>

      {/* Name + stats */}
      <div>
        <p className="font-code text-sm font-semibold text-foreground line-clamp-1">
          {activity.name}
        </p>
        <div className="flex gap-4 mt-1">
          {gps && activity.distance > 0 && (
            <span className="font-code text-xs text-muted-foreground">
              {formatDistance(activity.distance)}
            </span>
          )}
          {gps && activity.average_speed > 0 ? (
            <span className="font-code text-xs font-medium" style={{ color: STRAVA_ORANGE }}>
              {formatPace(activity.average_speed)}
            </span>
          ) : (
            <span className="font-code text-xs text-muted-foreground">
              {formatDuration(activity.moving_time)}
            </span>
          )}
        </div>
      </div>

      {/* Map or workout card */}
      {gps ? (
        <RouteMap activity={activity} wide={wide} />
      ) : (
        <WorkoutCard activity={activity} />
      )}
    </motion.div>
  );
}

// ── ErrorCard ─────────────────────────────────────────────────────────────────

function ErrorCard({ label }: { label: string }) {
  return (
    <div
      className="glass-card p-5 flex flex-col items-center justify-center gap-2 h-full text-center"
      style={{ borderColor: `${STRAVA_ORANGE}20` }}
    >
      <img
        src="/assets/strava_icon_130820.webp"
        alt="Strava"
        className="w-8 h-8 object-contain opacity-40"
      />
      <p className="font-code text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

// ── PhotoCard ─────────────────────────────────────────────────────────────────

function PhotoCard({
  activities,
  isInView,
}: {
  activities?: StravaActivity[];
  isInView: boolean;
}) {
  const photoSrc = siteUrls.sportPhoto;
  const rawDate = activities?.[0]?.start_date_local;
  const dateObj = rawDate ? new Date(rawDate) : new Date();
  const dateStr = [
    String(dateObj.getDate()).padStart(2, "0"),
    String(dateObj.getMonth() + 1).padStart(2, "0"),
    dateObj.getFullYear(),
  ].join(".");

  return (
    <motion.div
      className="glass-card overflow-hidden relative h-full min-h-[180px]"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
    >
      {photoSrc ? (
        <motion.img
          src={photoSrc}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ filter: "grayscale(1)" }}
          animate={isInView ? { filter: "grayscale(0)" } : { filter: "grayscale(1)" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-card flex items-center justify-center">
          <Icon icon="mdi:image-outline" width={48} className="text-muted-foreground/30" />
        </div>
      )}
      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      {/* Date + location */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-0.5">
        <div className="flex items-center gap-1.5">
          <Icon
            icon="mdi:map-marker"
            width={13}
            style={{ color: "rgba(255,255,255,0.75)" }}
          />
          <span className="font-code text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
            São Paulo, BR
          </span>
        </div>
        <p className="font-code text-sm font-semibold text-white">{dateStr}</p>
      </div>
    </motion.div>
  );
}

// ── StravaConnectCard ─────────────────────────────────────────────────────────

function StravaConnectCard({
  isInView,
  label,
  cta,
}: {
  isInView: boolean;
  label: string;
  cta: string;
}) {
  return (
    <motion.a
      href={siteUrls.stravaProfile}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-5 flex flex-col justify-between h-full"
      style={{ borderColor: `${STRAVA_ORANGE}25` }}
      initial={{ opacity: 0, y: 24, borderColor: `${STRAVA_ORANGE}25` }}
      animate={
        isInView
          ? { opacity: 1, y: 0, borderColor: `${STRAVA_ORANGE}25` }
          : { opacity: 0, y: 24, borderColor: `${STRAVA_ORANGE}25` }
      }
      whileHover={{ y: -4, borderColor: `${STRAVA_ORANGE}55` }}
      transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 400, damping: 25 }}
    >
      <img
        src="/assets/Strava_Logo.svg.png"
        alt="Strava"
        className="h-5 object-contain object-left"
      />
      <div className="mt-3">
        <p className="font-code text-sm font-semibold text-foreground">{label}</p>
        <p className="font-code text-xs text-muted-foreground mt-1 leading-relaxed">
          Track runs, rides & workouts together.
        </p>
      </div>
      <div
        className="flex items-center gap-1.5 mt-4"
        style={{ color: STRAVA_ORANGE }}
      >
        <span className="font-code text-xs font-medium">{cta}</span>
        <ArrowUpRight size={13} />
      </div>
    </motion.a>
  );
}

// ── ActivitiesSection ─────────────────────────────────────────────────────────

const ActivitiesSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const { data: activities, isLoading, isError } = useStravaActivities();

  const act1 = activities?.[0];
  const act2 = activities?.[1];
  const act3 = activities?.[2];

  const status: Status = isLoading ? "loading" : isError || !activities ? "offline" : "online";

  return (
    <section id="activities" className="py-16 md:py-24 px-4 md:px-12 lg:px-20" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10 md:mb-14"
        >
          <span className="font-code text-muted-foreground text-xs md:text-sm">
            {t.activities.kicker}
          </span>
          <StatusBadge status={status} />
        </motion.div>

        {/* ── Bento grid ───────────────────────────────────────────────────────
            Row 1: [Photo 2col] [Hobbies 1col] [StravaConnect 1col]
            Row 2: [Act1 1col]  [Act2 1col]   [Act3 2col]
            Row 3: [Adidas 4col full-width]
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* ── Photo card ── lg: col-span-2 */}
          <div className="md:col-span-2 lg:col-span-2">
            <PhotoCard activities={activities} isInView={isInView} />
          </div>

          {/* ── Hobbies card ── lg: col-span-1 (reduced from 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(255,255,255,0.04)" }}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 400, damping: 25 }}
            className="glass-card p-5 lg:col-span-1 flex flex-col justify-between gap-5 cursor-default"
          >
            <div>
              <p className="font-code text-muted-foreground text-xs mb-1">
                {t.activities.hobbiesTitle}
              </p>
              <h3 className="font-code text-xl font-bold text-foreground leading-tight">
                {t.activities.hobbiesTitle}
              </h3>
            </div>

            <div className="flex flex-col gap-2.5">
              {HOBBIES_CONFIG.map((h, i) => (
                <motion.div
                  key={h.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-foreground/5 border border-border/30 hover:bg-foreground/[0.08] hover:border-border/60 transition-colors duration-300"
                >
                  <motion.div
                    animate={h.animate ?? {}}
                    transition={h.transition ?? {}}
                    className="w-7 h-7 flex items-center justify-center shrink-0"
                  >
                    <Icon icon={h.icon} width={24} height={24} />
                  </motion.div>
                  <span className="font-code text-sm font-medium text-foreground">
                    {t.activities.hobbies[h.key]}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Strava Connect card ── lg: col-span-1 */}
          <div className="lg:col-span-1">
            <StravaConnectCard
              isInView={isInView}
              label={t.activities.stravaConnect}
              cta={t.activities.stravaConnectCta}
            />
          </div>

          {/* ── Strava Activity #1 ── lg: col-span-1 */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <ActivitySkeleton />
            ) : isError || !act1 ? (
              <ErrorCard label={t.activities.error} />
            ) : (
              <ActivityCard activity={act1} delay={0.25} isInView={isInView} />
            )}
          </div>

          {/* ── Strava Activity #2 ── lg: col-span-1 */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <ActivitySkeleton />
            ) : isError || !act2 ? (
              <ErrorCard label={t.activities.error} />
            ) : (
              <ActivityCard activity={act2} delay={0.3} isInView={isInView} />
            )}
          </div>

          {/* ── Strava Activity #3 (featured) ── md+lg: col-span-2 */}
          <div className="md:col-span-2 lg:col-span-2">
            {isLoading ? (
              <ActivitySkeleton wide />
            ) : isError || !act3 ? (
              <ErrorCard label={t.activities.error} />
            ) : (
              <ActivityCard activity={act3} wide delay={0.35} isInView={isInView} />
            )}
          </div>

          {/* ── Adidas Running card ── full width (4 cols) */}
          <motion.a
            href={siteUrls.adidasRunning}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24, borderColor: `${ADIDAS_GREEN}25` }}
            animate={
              isInView
                ? { opacity: 1, y: 0, borderColor: `${ADIDAS_GREEN}25` }
                : { opacity: 0, y: 24, borderColor: `${ADIDAS_GREEN}25` }
            }
            whileHover={{ y: -4, borderColor: `${ADIDAS_GREEN}55` }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 400, damping: 25 }}
            className="glass-card p-6 md:col-span-2 lg:col-span-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${ADIDAS_GREEN}15`, border: `1px solid ${ADIDAS_GREEN}30` }}
              >
                <img
                  src="/assets/AdidasRunning_logo.png"
                  alt="Adidas Running"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-code text-sm font-semibold text-foreground">
                  {t.activities.adidasLabel}
                </p>
                <p className="font-code text-xs text-muted-foreground mt-0.5">
                  {t.activities.adidasCta}
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: `${ADIDAS_GREEN}15`,
                border: `1px solid ${ADIDAS_GREEN}30`,
                color: ADIDAS_GREEN,
              }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </motion.a>

        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
