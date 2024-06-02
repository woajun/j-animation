import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated, easings } from "@react-spring/web";

type Props = {
  children: ReactNode;
  onAnimationEnd?: () => void;
  delay?: number;
  style?: CSSProperties;
  direction?: "left" | "right";
};

export const JScrollTranslateSlideIn = ({
  children,
  onAnimationEnd,
  delay,
  style,
  direction = "left",
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const fromX = direction === "left" ? 100 : -100;

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  const spring = useSpring({
    from: { x: fromX, opacity: 0 },
    to: {
      x: isVisible ? 0 : fromX,
      opacity: isVisible ? 1 : 0,
    },
    delay,
    config: {
      mass: 4,
      easing: easings.steps(1),
    },
    onRest: onAnimationEnd,
  });

  return (
    <animated.div ref={ref} style={{ ...style, ...spring }}>
      {children}
    </animated.div>
  );
};
