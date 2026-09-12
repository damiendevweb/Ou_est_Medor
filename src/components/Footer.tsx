import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { sanityClient } from "../lib/sanity";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };
type FooterSocial = { label: string; url: string };
type FooterContent = {
  copyright?: string | null;
  colonne1?: FooterColumn | null;
  colonne2?: FooterColumn | null;
  colonne3?: FooterColumn | null;
  socials?: FooterSocial[] | null;
};

const FOOTER_QUERY = `*[_type == "footer"][0] {
  copyright,
  colonne1 { title, "links": links[] { label, href } },
  colonne2 { title, "links": links[] { label, href } },
  colonne3 { title, "links": links[] { label, href } },
  socials[] { label, url }
}`;

const FALLBACK_COLUMNS: FooterColumn[] = [
  {
    title: "Produit",
    links: [
      { label: "Médailles", href: "#" },
      { label: "Accessoires", href: "#" },
      { label: "Concept", href: "/le-concept" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Livraison", href: "#" },
      { label: "Retours", href: "#" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "CGV", href: "#" },
      { label: "Confidentialité", href: "#" },
      { label: "Mentions légales", href: "#" },
    ],
  },
];

const FALLBACK_SOCIALS: FooterSocial[] = [
  { label: "Facebook", url: "#" },
  { label: "Instagram", url: "#" },
  { label: "Twitter", url: "#" },
];

const FALLBACK_COPYRIGHT = "© 2026 Où est Médor ?";

const resolveColumns = (content: FooterContent | null): FooterColumn[] => {
  if (!content) return FALLBACK_COLUMNS;
  return [content.colonne1, content.colonne2, content.colonne3].filter(
    (col): col is FooterColumn =>
      Boolean(col?.title?.trim() && col?.links && col.links.length > 0),
  );
};

const resolveSocials = (content: FooterContent | null): FooterSocial[] => {
  if (!content?.socials) return FALLBACK_SOCIALS;
  return content.socials.filter((s) => s.label?.trim() && s.url?.trim());
};

const resolveCopyright = (content: FooterContent | null): string => {
  if (!content) return FALLBACK_COPYRIGHT;
  return content.copyright ?? "";
};

export const Footer = () => {
  const [content, setContent] = useState<FooterContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchContent = async () => {
      if (!sanityClient) return;
      try {
        const data = await sanityClient.fetch<FooterContent | null>(
          FOOTER_QUERY,
        );
        if (!cancelled && data) setContent(data);
      } catch (err) {
        console.error("Footer Sanity fetch failed:", err);
      }
    };
    void fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  const columns = resolveColumns(content);
  const socials = resolveSocials(content);
  const copyright = resolveCopyright(content);

  return (
    <>
      {/* ── CTA ── */}
      <section className="bg-accent py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-unbounded text-2xl md:text-3xl font-bold text-white mb-3">
            Prêt à protéger votre animal de compagnie ?
          </h2>
          <p className="text-sm text-white mb-6">
            Rejoignez l'aventure Où est Médor !
          </p>
          <Link
            to="/produit/medaille-qr"
            className="inline-flex items-center gap-2 bg-white hover:bg-accent-hover hover:text-white text-accent font-semibold text-sm px-6 py-2.5 rounded transition-all"
          >
            Commander
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
      <footer>
        <div className="max-w-7xl mx-auto px-5 py-8 lg:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-3">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="link-style text-xs text-text-secondary"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-text-muted">{copyright}</span>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className="text-[11px] text-text-muted hover:text-text-secondary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
