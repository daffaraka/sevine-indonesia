import { useEffect } from 'react';
import Lenis from 'lenis';

let activeLenisInstance: Lenis | null = null;

/**
 * Scroll halus ke elemen `#sectionId` atau posisi Y tertentu.
 * Memanfaatkan instance Lenis bila aktif, dengan fallback native smooth scroll.
 */
export function scrollToSmoothTarget(
  target: string | number,
  options?: { offset?: number; duration?: number },
): void {
  const offset = options?.offset ?? -88;
  const duration = options?.duration ?? 1.0;

  if (activeLenisInstance) {
    if (typeof target === 'number') {
      activeLenisInstance.scrollTo(target, { duration });
      return;
    }
    const selector = target.startsWith('#') ? target : `#${target}`;
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      activeLenisInstance.scrollTo(element, { offset, duration });
      return;
    }
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }

  const cleanId = target.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Mengaktifkan inertia smooth scrolling berbasis Lenis untuk halaman publik.
 * Otomatis dinonaktifkan jika pengguna memilih `prefers-reduced-motion: reduce`.
 */
export function useSmoothScroll(enabled = true): void {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      anchors: {
        offset: -88,
      },
    });

    activeLenisInstance = lenis;

    return () => {
      if (activeLenisInstance === lenis) {
        activeLenisInstance = null;
      }
      lenis.destroy();
    };
  }, [enabled]);
}
