import { useState, useEffect, CSSProperties, useRef } from "react";
import { Box } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

type SingleTextProps = {
  text: string;
  isShow: boolean;
  delay: number;
  style: CSSProperties;
};

const SingleText = ({ text, isShow, delay, style }: SingleTextProps) => {
  const { transform } = useSpring({
    from: { transform: "rotateX(-90deg)" },
    to: { transform: isShow ? "rotateX(0deg)" : "rotateX(90deg)" },
    config: { duration: 380 },
    delay,
  });

  return (
    <animated.span
      style={{
        display: "inline-block",
        position: "relative",
        float: "left",
        transformOrigin: "50% 50% 25px",
        whiteSpace: "pre-wrap",
        ...style,
        transform,
      }}
    >
      {text}
    </animated.span>
  );
};

type RotatingRowProps = {
  text: string;
  style: CSSProperties;
};

const RotatingRow = ({ text, style }: RotatingRowProps) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShow(false);
    }, 3400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {text.split("").map((char, index) => (
        <SingleText
          key={index}
          text={char}
          isShow={isShow}
          delay={index * 100}
          style={style}
        />
      ))}
    </>
  );
};

type RotatingTextProps = {
  texts: string[];
  style: CSSProperties;
  width: number;
  height: number;
  x?: number;
  y?: number;
};

export const JRotatingText = ({
  texts,
  style,
  width,
  height,
  x = 0,
  y = 0,
}: RotatingTextProps) => {
  const index = useRef(0);
  const [comps, setComps] = useState([texts[0]]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index.current + 1) % texts.length;
      const newComps = [...comps, texts[nextIndex]];
      setComps(newComps.slice(Math.max(0, newComps.length - 3)));
      index.current = nextIndex;
    }, 3400);

    return () => clearInterval(interval);
  }, [comps, texts]);

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      sx={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {comps.map((text) => (
        <Box key={text} position="absolute">
          <RotatingRow text={text} style={style} />
        </Box>
      ))}
    </Box>
  );
};
