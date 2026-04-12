import { useEffect, useRef, useState } from "react";
import AboutInnotechSection from "../sections/AboutInnotechSection";
import ClientRecommendationsSection from "../sections/ClientRecommendationsSection";
import Hero from "../sections/Hero";
import ServicesGridSection from "../sections/ServicesGridSection";
import UseCasesSection from "../sections/UseCasesSection";

const STAGE_HEIGHT_VH = 220;

function HomePage() {
  const stageRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const stageElement = stageRef.current;
      if (!stageElement) {
        return;
      }

      const rect = stageElement.getBoundingClientRect();
      const totalScrollableDistance = stageElement.offsetHeight - window.innerHeight;

      if (totalScrollableDistance <= 0) {
        setScrollProgress(1);
        return;
      }

      const rawProgress = -rect.top / totalScrollableDistance;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      setScrollProgress(clampedProgress);
    };

    const requestUpdate = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const fadeProgress = Math.min(1, scrollProgress * 1.25);
  const heroOpacity = 1 - fadeProgress * 0.22;
  const heroTranslateY = -scrollProgress * 5;
  const heroScale = 1 - fadeProgress * 0.28;
  const blurStartAt = 0.25;
  const blurProgress = Math.min(1, Math.max(0, (scrollProgress - blurStartAt) / (1 - blurStartAt)));
  const heroBlur = blurProgress * 4;
  const servicesTranslateY = (1 - scrollProgress) * 105;

  return (
    <>
      <section ref={stageRef} className="relative" style={{ height: `${STAGE_HEIGHT_VH}dvh` }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <div className="absolute inset-0 z-10 flex justify-center">
            <Hero
              contentStyle={{
                willChange: "transform, opacity, filter",
                opacity: heroOpacity,
                filter: `blur(${heroBlur}px)`,
                transform: `translateY(${heroTranslateY}vh) scale(${heroScale})`,
              }}
            />
          </div>

          <div
            className="absolute inset-0 z-20"
            style={{ willChange: "transform", transform: `translateY(${servicesTranslateY}%)` }}>
            <ServicesGridSection />
          </div>
        </div>
      </section>

      <AboutInnotechSection />
      <UseCasesSection />
      <ClientRecommendationsSection />
    </>
  );
}

export default HomePage;
