import { a, useSpring, useChain } from "react-spring";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import "./styles.css";

const color = "#add8e6";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled(a.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const LoadingText = styled(a.span)`
  font-size: 6.6em;
  position: absolute;
  text-align: center;
`;

const SVG = styled(a.svg)`
  transform: translateY(-60px);
`;

const Circle = styled(a.circle)``;

const radius = 30;

const interpolBackground = (width) =>
  `radial-gradient(circle at 50% calc(50% - 60px), ${color} 0%, ${color} ${width}%, #FFFFFF ${width}%, #FFFFFF 100%)`;

export default function App() {
  const circleRef = useRef();
  const offset = 2 * Math.PI * radius;

  const springRef = useRef();
  const springRef2 = useRef();
  const springRef3 = useRef();
  const springRefText = useRef();
  const springRefText2 = useRef();
  const springRefEndText = useRef();

  const propsText = useSpring({
    ref: springRefText,
    delay: 500,
    from: {
      opacity: 0,
      y: -10
    },
    to: [
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: 10
      }
    ]
  });

  const propsText2 = useSpring({
    ref: springRefText2,
    from: {
      opacity: 0,
      y: -10
    },
    to: [
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: 10
      }
    ]
  });

  const propsEndText = useSpring({
    ref: springRefEndText,
    from: {
      opacity: 0,
      y: -10
    },
    to: [
      {
        opacity: 1,
        y: 0
      }
    ]
  });

  const props = useSpring({
    delay: 200,
    ref: springRef,
    from: {
      length: offset
    },
    to: [
      {
        length: 0
      }
    ]
  });

  const { width } = useSpring({
    ref: springRef2,
    from: {
      width: 0
    },
    to: {
      width: 60
    }
  });

  const { size } = useSpring({
    ref: springRef3,
    from: {
      size: 80
    },
    to: {
      size: 0
    },
    onRest: () => {
      console.log("ended");
    }
  });

  useChain([
    springRefText,
    springRefText2,
    springRefEndText,
    springRef,
    springRef2,
    springRef3
  ]);

  return (
    <div className="App">
      <MainContainer>
        <LoaderContainer
          style={{
            background: width.to(interpolBackground),
            clipPath: size.to((s) => `circle(${s}% at 50% calc(50% - 60px))`)
          }}
        >
          <SVG
            width="100"
            height="100"
            id="svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Circle
              strokeDashoffset={props.length}
              strokeDasharray={offset}
              ref={circleRef}
              id="path"
              cx="50%"
              cy="50%"
              r={radius}
              stroke={color}
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
            ></Circle>
          </SVG>
          <LoadingText style={propsText}>Hello <a style={{color:'#bd2300'}}>Stranger</a> !</LoadingText>
          <LoadingText style={propsText2}>Welcome To Our <a style={{color:'#bd2300'}}>Gamification  Website</a></LoadingText>
          <LoadingText style={propsEndText}>Come on in !</LoadingText>
        </LoaderContainer>
      </MainContainer>
    </div>
  );
}
