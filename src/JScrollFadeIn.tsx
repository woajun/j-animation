import React, { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  children: ReactNode;
  delay?: number;
};

export const JScrollFadeIn = ({ children, delay }: Props) => {
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
    from: { opacity: 0 },
    to: { opacity: isVisible ? 1 : 0 },
    delay,
    config: { duration: 700 },
  });

  return (
    <animated.div ref={ref} style={spring}>
      {children}
    </animated.div>
  );
};
