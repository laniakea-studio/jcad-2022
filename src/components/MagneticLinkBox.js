import { Link } from "gatsby";
import React, { useRef, forwardRef, useEffect } from "react";
import styled from "styled-components";
import { useMousePosition } from "../hooks/useMousePosition";
// Author: Magnetic button https://codesandbox.io/s/tgowd?file=/src/components/Button.js

export const MagneticLinkBox = forwardRef((props, ref) => {
  const { mouseX, mouseY } = useMousePosition();

  const handleClick = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let x = 0;
    let y = 0;

    if (ref) {
      const node = ref.current;

      // New values for the translations
      const rect = node.getBoundingClientRect();
      const distanceToTrigger = rect.width * 0.35;
      const distanceMouseButton = distance(
        mouseX + window.scrollX,
        mouseY + window.scrollY,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      // Handle magnetic effect
      if (distanceMouseButton < distanceToTrigger) {
        // Translate button position on hover
        x = (mouseX + window.scrollX - (rect.left + rect.width / 2)) * 0.09;
        y = (mouseY + window.scrollY - (rect.top + rect.height / 2)) * 0.09;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else {
        // Restore initial position
        node.style.transform = `translate3d(0, 0, 0)`;
      }
    }
  }, [mouseX, mouseY, ref]);

  return (
    <Link
      ref={ref}
      to={props.path}
      css={`
        position: relative;
        display: flex;
        user-select: none;
        cursor: pointer;
        overflow: hidden;
        width: 100%;
        z-index: 1;
        transition: all 0.85s cubic-bezier(0.075, 0.82, 0.165, 1);
        .Link {
          width: 100%;
        }
      `}
    >
      {props.children}
    </Link>
  );
});

const distance = (x1, y1, x2, y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.hypot(a, b);
};
