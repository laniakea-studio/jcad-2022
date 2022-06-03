import { useState, useEffect } from "react";

export const useIntersection = (element, rootMargin) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const el = element.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    el && observer.observe(element.current);

    return () => observer.unobserve(el);
  }, []);

  return isVisible;
};
