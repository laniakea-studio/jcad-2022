import React, { useRef, forwardRef, useEffect } from "react";
import styled from "styled-components";
import { useMousePosition } from "../hooks/useMousePosition";

export const MagneticButton = forwardRef((props, ref) => {
  const { mouseX, mouseY } = useMousePosition();

  useEffect(() => {
    let x = 0;
    let y = 0;

    if (ref) {
      const node = ref.current;

      // New values for the translations
      const rect = node.getBoundingClientRect();
      const distanceToTrigger = rect.width * 0.7;
      const distanceMouseButton = distance(
        mouseX + window.scrollX,
        mouseY + window.scrollY,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      // Handle magnetic effect
      if (distanceMouseButton < distanceToTrigger) {
        // Translate button position on hover
        x = (mouseX + window.scrollX - (rect.left + rect.width / 2)) * 0.2;
        y = (mouseY + window.scrollY - (rect.top + rect.height / 2)) * 0.2;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else {
        // Restore initial position
        node.style.transform = `translate3d(0, 0, 0)`;
      }
    }
  }, [mouseX, mouseY, ref]);

  return (
    <Button ref={ref} href={props.href} className={props.className}>
      Hei
    </Button>
  );
});

const Button = styled.a`
  position: relative;
`;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const distance = (x1, y1, x2, y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.hypot(a, b);
};
