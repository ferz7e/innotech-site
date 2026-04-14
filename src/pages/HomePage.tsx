import { useEffect, useRef, useState } from "react";
import Hero from "../sections/Hero";
import ServicesGridSection from "../sections/ServicesGridSection";
import AboutInnotechSection from "../sections/AboutInnotechSection";
import UseCasesSection from "../sections/UseCasesSection";
import ContactSection from "../sections/ContactSection";
import ClientRecommendationsSection from "../sections/ClientRecommendationsSection";

const STAGE_HEIGHT_VH = 220;
const MOBILE_MAX_WIDTH = 767;
const SNAP_LOCK_DURATION_MS = 520;
const SNAP_TOLERANCE_PX = 24;
const SNAP_GESTURE_DELTA_PX = 1;
// Punto visual solicitado por el usuario para anclar Services en mobile.
const MOBILE_SERVICES_SNAP_PROGRESS = 0.8562;

type StagePositions = {
  heroTop: number;
  servicesTop: number;
  servicesAnchorTop: number;
};

function HomePage() {
  const stageRef = useRef<HTMLElement | null>(null);
  const servicesScrollRef = useRef<HTMLElement | null>(null);
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
      setScrollProgress(Math.min(1, Math.max(0, rawProgress)));
    };

    const scheduleUpdate = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
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
    let touchStartScrollY = 0;
    let didHandleCurrentGesture = false;
    let didSnapCurrentGesture = false;
    let isSnapLocked = false;
    let lockTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const isMobileViewport = () => window.innerWidth <= MOBILE_MAX_WIDTH;

    const getStagePositions = (): StagePositions | null => {
      const stageElement = stageRef.current;
      if (!stageElement) {
        return null;
      }

      const heroTop = stageElement.offsetTop;
      const stageScrollableDistance = stageElement.offsetHeight - window.innerHeight;
      if (stageScrollableDistance <= 0) {
        return null;
      }

      const servicesTop = heroTop + stageScrollableDistance;
      const servicesAnchorTop = heroTop + stageScrollableDistance * MOBILE_SERVICES_SNAP_PROGRESS;
      return { heroTop, servicesTop, servicesAnchorTop };
    };

    const lockSnap = () => {
      isSnapLocked = true;
      if (lockTimeoutId) {
        clearTimeout(lockTimeoutId);
      }
      lockTimeoutId = setTimeout(() => {
        isSnapLocked = false;
      }, SNAP_LOCK_DURATION_MS);
    };

    const resetServicesInternalScroll = () => {
      const servicesContainer = servicesScrollRef.current;
      if (!servicesContainer) {
        return;
      }
      servicesContainer.scrollTo({ top: 0, behavior: "auto" });
    };

    const snapWindowTo = (top: number) => {
      window.scrollTo({ top, behavior: "auto" });
    };

    const trySnapDownFromHero = (gestureStartScrollY: number) => {
      if (!isMobileViewport() || isSnapLocked) {
        return false;
      }

      const positions = getStagePositions();
      if (!positions) {
        return false;
      }

      const { heroTop, servicesTop, servicesAnchorTop } = positions;
      const startedFromHeroZone =
        gestureStartScrollY >= heroTop - SNAP_TOLERANCE_PX && gestureStartScrollY < servicesTop - SNAP_TOLERANCE_PX;

      if (!startedFromHeroZone) {
        return false;
      }

      resetServicesInternalScroll();
      snapWindowTo(servicesAnchorTop);
      lockSnap();
      return true;
    };

    const trySnapUpToHero = (gestureStartScrollY: number) => {
      if (!isMobileViewport() || isSnapLocked) {
        return false;
      }

      const positions = getStagePositions();
      if (!positions) {
        return false;
      }

      const { heroTop, servicesAnchorTop } = positions;
      const startedNearServicesAnchor = Math.abs(gestureStartScrollY - servicesAnchorTop) <= SNAP_TOLERANCE_PX * 3;
      if (!startedNearServicesAnchor) {
        return false;
      }

      snapWindowTo(heroTop);
      lockSnap();
      return true;
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.changedTouches[0]?.clientY ?? 0;
      touchStartScrollY = window.scrollY;
      didHandleCurrentGesture = false;
      didSnapCurrentGesture = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isMobileViewport()) {
        return;
      }

      // Tras el snap inicial, se bloquea cualquier desplazamiento restante del mismo gesto.
      if (didSnapCurrentGesture) {
        event.preventDefault();
        return;
      }

      if (isSnapLocked || didHandleCurrentGesture) {
        return;
      }

      const currentY = event.changedTouches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - currentY;
      if (Math.abs(deltaY) < SNAP_GESTURE_DELTA_PX) {
        return;
      }

      if (deltaY > 0 && trySnapDownFromHero(touchStartScrollY)) {
        event.preventDefault();
        didHandleCurrentGesture = true;
        didSnapCurrentGesture = true;
        return;
      }

      if (deltaY < 0 && trySnapUpToHero(touchStartScrollY)) {
        event.preventDefault();
        didHandleCurrentGesture = true;
        didSnapCurrentGesture = true;
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      // Si el snap ya ocurrió en touchmove, no hacemos nada más.
      if (didSnapCurrentGesture || didHandleCurrentGesture) {
        didSnapCurrentGesture = false;
        return;
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) < SNAP_GESTURE_DELTA_PX) {
        return;
      }

      if (deltaY > 0) {
        trySnapDownFromHero(touchStartScrollY);
        return;
      }

      trySnapUpToHero(touchStartScrollY);
    };

    const handleTouchCancel = () => {
      didHandleCurrentGesture = false;
      didSnapCurrentGesture = false;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
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
            <ServicesGridSection scrollContainerRef={servicesScrollRef} />
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
