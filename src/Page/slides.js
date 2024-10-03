import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import useData from "../Contexts/DataContext";
import { SLIDE_INTERVAL_SECONDS } from "../config";

const EventBoard = styled.div`
  width: 100%;
  height: 75%;
  align-self: flex-end;
  position: relative;
`;

const fadeTransition = css`
  transition: opacity 0.5s ease;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 0 20px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: #262626;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  ${fadeTransition};
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #ffffffc0;
  width: ${({ $progress }) => $progress}%;
  transition: width 0.1s linear;
`;

function SlidesComponent() {
  const { data } = useData();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const slideStartTime = useRef(null);
  const transitionTimeout = useRef(null);
  const progressInterval = useRef(null);
  const slidesExist = data && Array.isArray(data.slides);

  useEffect(() => {
    if (slidesExist) {
      slideStartTime.current = new Date();

      progressInterval.current = setInterval(() => {
        const now = new Date();
        const elapsedTime = (now - slideStartTime.current) / 1000;
        const progressValue = (elapsedTime / SLIDE_INTERVAL_SECONDS) * 100;

        if (progressValue >= 100) {
          setProgress(100);
          clearInterval(progressInterval.current);
          setIsImageVisible(false);

          transitionTimeout.current = setTimeout(() => {
            setCurrentSlideIndex((prevIndex) =>
              prevIndex + 1 === data.slides.length ? 0 : prevIndex + 1
            );
            setIsImageVisible(true);
            slideStartTime.current = new Date();
            setProgress(0);
            startProgress();
          }, 500);
        } else {
          setProgress(progressValue);
        }
      }, 100);

      return () => {
        clearInterval(progressInterval.current);
        clearTimeout(transitionTimeout.current);
      };
    }
  }, [slidesExist, data.slides?.length]);

  const startProgress = () => {
    slideStartTime.current = new Date();
    progressInterval.current = setInterval(() => {
      const now = new Date();
      const elapsedTime = (now - slideStartTime.current) / 1000;
      const progressValue = (elapsedTime / SLIDE_INTERVAL_SECONDS) * 100;

      if (progressValue >= 100) {
        setProgress(100);
        clearInterval(progressInterval.current);
        setIsImageVisible(false);

        transitionTimeout.current = setTimeout(() => {
          setCurrentSlideIndex((prevIndex) =>
            prevIndex + 1 === data.slides.length ? 0 : prevIndex + 1
          );
          setIsImageVisible(true);
          slideStartTime.current = new Date();
          setProgress(0);
          startProgress();
        }, 500);
      } else {
        setProgress(progressValue);
      }
    }, 100);
  };

  const handleImageError = () => {
    setIsImageVisible(false);
  };

  if (!slidesExist || data.slides.length === 0)
    return <EventBoard></EventBoard>;

  return (
    <EventBoard>
      <SlideContainer>
        <SlideImage
          $isVisible={isImageVisible}
          src={data.slides[currentSlideIndex].file}
          onError={handleImageError}
          alt=""
        />
        <ProgressBarContainer>
          <ProgressBar $progress={progress} />
        </ProgressBarContainer>
      </SlideContainer>
    </EventBoard>
  );
}

export default SlidesComponent;
