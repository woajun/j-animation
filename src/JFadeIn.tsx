import React, { useSpring, animated } from "@react-spring/web";
import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
};

export const JFadeIn = ({ children, delay, style }: Props) => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
    config: { duration: 700 },
  });

  return (
    <animated.div style={{ ...style, ...spring }}>{children}</animated.div>
  );
};
