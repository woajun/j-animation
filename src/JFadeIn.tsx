import React, { useSpring, animated } from "@react-spring/web";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
};

export const JFadeIn = ({ children, delay }: Props) => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
    config: { duration: 700 },
  });

  return <animated.div style={spring}>{children}</animated.div>;
};
