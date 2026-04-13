import { useEffect, useRef, useState } from "react";
import Hero from "../sections/Hero";
import ServicesGridSection from "../sections/ServicesGridSection";
import AboutInnotechSection from "../sections/AboutInnotechSection";
import UseCasesSection from "../sections/UseCasesSection";
import ContactSection from "../sections/ContactSection";
import ClientRecommendationsSection from "../sections/ClientRecommendationsSection";

const STAGE_HEIGHT_VH = 220;
const MOBILE_MAX_WIDTH = 767;
const SNAP_GESTURE_THRESHOLD = 40;
const SNAP_LOCK_DURATION_MS = 520;
const SNAP_TOLERANCE_PX = 24;

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

  useEffect(() => {
    let touchStartY = 0;
    let isSnapLocked = false;
    let lockTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const isMobileViewport = () => window.innerWidth <= MOBILE_MAX_WIDTH;

    const lockSnap = () => {
      isSnapLocked = true;
      if (lockTimeoutId) {
        clearTimeout(lockTimeoutId);
      }
      lockTimeoutId = setTimeout(() => {
        isSnapLocked = false;
      }, SNAP_LOCK_DURATION_MS);
    };

    const handleSnap = (deltaY: number) => {
      if (!isMobileViewport() || isSnapLocked || Math.abs(deltaY) < SNAP_GESTURE_THRESHOLD) {
        return;
      }

      const stageElement = stageRef.current;
      if (!stageElement) {
        return;
      }

      const stageTop = stageElement.offsetTop;
      const stageScrollableDistance = stageElement.offsetHeight - window.innerHeight;
      if (stageScrollableDistance <= 0) {
        return;
      }

      const heroTop = stageTop;
      const servicesTop = stageTop + stageScrollableDistance;
      const currentScrollY = window.scrollY;
      const isInsideStage =
        currentScrollY >= heroTop - SNAP_TOLERANCE_PX && currentScrollY <= servicesTop + SNAP_TOLERANCE_PX;

      if (!isInsideStage) {
        return;
      }

      // Gesto hacia abajo en Hero (o tramo inicial) -> salta al inicio de Services.
      if (deltaY > 0 && currentScrollY <= heroTop + stageScrollableDistance * 0.38) {
        window.scrollTo({ top: servicesTop, behavior: "smooth" });
        lockSnap();
        return;
      }

      // Gesto hacia arriba al llegar al inicio de Services -> vuelve a Hero completo.
      if (deltaY < 0 && Math.abs(currentScrollY - servicesTop) <= SNAP_TOLERANCE_PX * 3) {
        window.scrollTo({ top: heroTop, behavior: "smooth" });
        lockSnap();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.changedTouches[0]?.clientY ?? 0;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - touchEndY;
      handleSnap(deltaY);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (lockTimeoutId) {
        clearTimeout(lockTimeoutId);
      }
    };
  }, []);

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
            className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,transparent_0%,var(--bg-muted)_40%,var(--bg-muted)_100%)]"
            style={{ willChange: "transform", transform: `translateY(${servicesTranslateY}%)` }}>
            <ServicesGridSection />
          </div>
        </div>
      </section>

      <AboutInnotechSection />
      <UseCasesSection />
      <ContactSection />
      <ClientRecommendationsSection />
    </>
  );
}

export default HomePage;
