import { useSpring, animated } from "@react-spring/web";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onAnimationEnd?: () => void;
};
export const JSlideIn = ({ children, onAnimationEnd }: Props) => {
  const spring = useSpring({
    from: { width: "0%", opacity: 0 },
    to: { width: "100%", opacity: 1 },
    config: { duration: 700 },
    onRest: onAnimationEnd,
  });

  return <animated.div style={spring}>{children}</animated.div>;
};
