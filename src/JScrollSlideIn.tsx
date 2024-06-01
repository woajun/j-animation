import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  children: ReactNode;
  onAnimationEnd?: () => void;
  delay?: number;
  style?: CSSProperties;
};

export const JScrollSlideIn = ({
  children,
  onAnimationEnd,
  delay,
  style,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  const spring = useSpring({
    from: { width: "0%", opacity: 0 },
    to: { width: isVisible ? "100%" : "0%", opacity: isVisible ? 1 : 0 },
    delay,
    config: { duration: 700 },
    onRest: onAnimationEnd,
  });

  return (
    <animated.div ref={ref} style={{ ...style, ...spring }}>
      {children}
    </animated.div>
  );
};
