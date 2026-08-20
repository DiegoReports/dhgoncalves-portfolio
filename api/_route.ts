/**
 * Server-side route processing for Strava activities.
 *
 * Everything here exists so that absolute GPS coordinates never leave the
 * server. The client receives only unit-box (0..1) shape data, which is enough
 * to draw the route but carries no geographic reference.
 *
 * Files prefixed with `_` are not exposed as HTTP routes by Vercel.
 */

export type NormalizedRoute = {
  /** Points normalized to a 0..1 box. Carries no geographic information. */
  points: [number, number][];
  /** Longitude range / latitude range, so the client can preserve proportions. */
  aspect: number;
};

/** Fraction of the route trimmed from each end to drop the start/finish anchor. */
const TRIM_RATIO = 0.08;

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b: number;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

/**
 * Drops the first and last TRIM_RATIO of the route so the start and finish
 * points — typically home — are not part of the published shape.
 */
function trimEndpoints(points: [number, number][]): [number, number][] {
  if (points.length < 10) return points;
  const cut = Math.floor(points.length * TRIM_RATIO);
  return points.slice(cut, points.length - cut);
}

/**
 * Rescales points into a 0..1 box relative to their own bounding box. The
 * output preserves the route's shape but no longer contains latitude or
 * longitude values.
 */
function toUnitBox(points: [number, number][]): NormalizedRoute | null {
  if (points.length < 2) return null;

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const [lat, lng] of points) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;

  return {
    points: points.map(([lat, lng]) => [
      Number(((lng - minLng) / lngRange).toFixed(4)),
      Number(((lat - minLat) / latRange).toFixed(4)),
    ]),
    aspect: Number((lngRange / latRange).toFixed(4)),
  };
}

/**
 * Turns an encoded Strava polyline into a publishable, coordinate-free shape.
 * Returns null when the activity has no usable route.
 */
export function toPublicRoute(encodedPolyline: unknown): NormalizedRoute | null {
  if (typeof encodedPolyline !== "string" || encodedPolyline.length === 0) return null;
  return toUnitBox(trimEndpoints(decodePolyline(encodedPolyline)));
}
