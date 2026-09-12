import { useEffect, useState } from "react";
import { Fragment } from "react";

import { useInView } from "../hooks/useInView";

const milestones = [
  {
    year: "2020",
    title: "L'idée",
    text: "Max, le golden retriever de notre fondateur, s'échappe. Après 6 heures d'angoisse, une évidence : il faut un moyen plus simple de réunir propriétaires et animaux.",
  },
  {
    year: "2021",
    title: "Prototype",
    text: "8 mois de R&D. 12 prototypes. Le rêve prend forme dans l'imprimante 3D artisanale.",
  },
  {
    year: "2022",
    title: "Lancement",
    text: "Les premières médailles voient le jour. Le site est en ligne. Les premiers témoignages de retrouvailles arrivent.",
  },
  {
    year: "2023",
    title: "1000 animaux",
    text: "Le cap des 1000 animaux protégés est franchi. Bouches-à-oreilles, vétérinaires, presse locale.",
  },
  {
    year: "2024",
    title: "App mobile",
    text: "Notification instantanée, gestion de profil, partage de localisation avec les vétérinaires.",
  },
  {
    year: "2025",
    title: "Nouvelle gamme",
    text: "Nouvelles couleurs, tailles XXS pour chats, éditions limitées, colliers connectés.",
  },
  {
    year: "2026",
    title: "2500 animaux",
    text: "98% de retrouvailles. Partenariats refuges, expansion internationale.",
  },
];

const TimelineRow = ({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) => {
  const { ref, isInView } = useInView(0.15);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      <div className="md:hidden relative pl-8 py-6">
        <div className="absolute left-4 -translate-x-1/2 top-7">
          <div
            className={`w-2 h-2 rounded-full bg-accent ${isInView ? "animate-scale-in" : "opacity-0"}`}
          />
        </div>
        <span
          className={`text-xs font-unbounded font-bold text-accent ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {milestone.year}
        </span>
        <h3
          className={`font-unbounded text-sm font-bold text-text-primary mt-1 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          {milestone.title}
        </h3>
        <p
          className={`text-xs text-text-secondary leading-relaxed mt-1 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {milestone.text}
        </p>
      </div>

      <div className="hidden md:block relative py-10">
        <div className="flex items-center">
          <div className="w-1/2">
            {isLeft ? (
              <div
                className={`flex items-center justify-end ${isInView ? "animate-fade-in-left" : "opacity-0"}`}
              >
                <span className="font-unbounded text-3xl font-bold text-accent whitespace-nowrap">
                  {milestone.year}
                </span>
                <div className="w-10 h-px bg-border mx-3" />
              </div>
            ) : (
              <div
                className={`text-right pr-8 ${isInView ? "animate-fade-in-right" : "opacity-0"}`}
              >
                <h3 className="font-unbounded text-xl font-bold text-accent">
                  {milestone.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mt-2">
                  {milestone.text}
                </p>
              </div>
            )}
          </div>

          <div className="shrink-0 z-10">
            <div
              className={`w-3 h-3 rounded-full bg-accent ${isInView ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: "0.15s" }}
            />
          </div>

          <div className="w-1/2">
            {isLeft ? (
              <div
                className={`pl-8 ${isInView ? "animate-fade-in-right" : "opacity-0"}`}
              >
                <h3 className="font-unbounded text-xl font-bold text-accent">
                  {milestone.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mt-2">
                  {milestone.text}
                </p>
              </div>
            ) : (
              <div
                className={`flex items-center pl-6 ${isInView ? "animate-fade-in-left" : "opacity-0"}`}
              >
                <div className="w-10 h-px bg-border mx-3" />
                <span className="font-unbounded text-3xl font-bold text-accent whitespace-nowrap">
                  {milestone.year}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotreHistoire = () => {
  const [linePct, setLinePct] = useState(20);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? (scrollTop / maxScroll) * 80 + 20 : 20;
      setLinePct(Math.round(Math.min(100, Math.max(20, pct))));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto px-5 py-4">
        <h2 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-3">
          Notre histoire
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-20">
        <div className="relative">
          <div
            className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 w-px bg-border"
            style={{ height: "100%" }}
          />
          <div
            className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 w-[3px] rounded-full bg-accent transition-[height] duration-200"
            style={{ height: `${linePct}%` }}
          />
          <div
            className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 z-30 w-[35px] h-[35px] rounded-full bg-accent transition-[top] duration-200"
            style={{ top: `${linePct}%` }}
          >
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 48.839 48.839" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fill: 'white' }}>
                <path d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414S48.455,16.861,45.727,15.602z" />
                </svg>
          </div>

          {milestones.map((m, i) => (
              <Fragment key={m.year}>
              <TimelineRow milestone={m} index={i} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
