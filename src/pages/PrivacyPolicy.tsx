import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { siteUrls } from "@/config/site";

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  const p = t.privacyPolicy;

  const sections = [
    p.dataCollected,
    p.purpose,
    p.googleAnalytics,
    p.legalBasis,
    p.howToWithdraw,
    p.retention,
    p.thirdPartySharing,
  ];

  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="font-code text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← {t.notFound.back}
        </Link>

        <h1 className="font-code text-3xl md:text-4xl font-bold mt-6 mb-2">{p.title}</h1>
        <p className="text-sm text-muted-foreground mb-10">{p.lastUpdated}</p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-code text-lg font-semibold mb-2">{section.heading}</h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}

          <section>
            <h2 className="font-code text-lg font-semibold mb-2">{p.userRights.heading}</h2>
            <ul className="list-disc list-inside space-y-1">
              {p.userRights.body.map((right) => (
                <li key={right} className="font-body text-sm leading-relaxed text-muted-foreground">
                  {right}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-code text-lg font-semibold mb-2">{p.contact.heading}</h2>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {p.contact.body}{" "}
              <a
                href={siteUrls.email}
                className="underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors"
              >
                {siteUrls.email.replace("mailto:", "")}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
