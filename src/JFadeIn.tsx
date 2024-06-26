import { useSpring, animated } from "@react-spring/web";
import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  isShow?: boolean;
};

export const JFadeIn = ({ children, delay, style, isShow = true }: Props) => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: isShow ? 1 : 0 },
    delay,
    config: { duration: 700 },
  });

  return (
    <animated.div style={{ ...style, ...spring }}>{children}</animated.div>
  );
};
