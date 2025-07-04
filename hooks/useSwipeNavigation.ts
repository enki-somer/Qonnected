import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SwipeConfig {
  minSwipeDistance: number;
  routes: string[];
}

export const useSwipeNavigation = ({ minSwipeDistance = 50, routes }: SwipeConfig) => {
  const router = useRouter();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reset swipe distance on route change
  useEffect(() => {
    setTouchStart(null);
    setTouchEnd(null);
  }, [router]);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Find current route index
    const currentIndex = routes.findIndex(route => 
      window.location.pathname.startsWith(route)
    );

    if (isLeftSwipe && currentIndex < routes.length - 1) {
      // Navigate to next route
      router.push(routes[currentIndex + 1]);
    }

    if (isRightSwipe && currentIndex > 0) {
      // Navigate to previous route
      router.push(routes[currentIndex - 1]);
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStart, touchEnd]);

  return null;
}; 