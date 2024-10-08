import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import useData from "../Contexts/DataContext";
import { SLIDE_INTERVAL_SECONDS } from "../config";

const EventBoard = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  position: relative;
  align-self: flex-end;
`;

const fadeTransition = css`
  transition: opacity 0.2s ease;
`;

const SlideContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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

const SlideCounter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

function SlidesComponent() {
  const { data } = useData();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const transitionTimeout = useRef(null);
  const slidesExist = data && Array.isArray(data.slides);

  useEffect(() => {
    if (slidesExist) {
      const startSlideTransition = () => {
        setIsImageVisible(false);
        transitionTimeout.current = setTimeout(() => {
          setCurrentSlideIndex((prevIndex) =>
            prevIndex + 1 === data.slides.length ? 0 : prevIndex + 1
          );
          setIsImageLoaded(false);
        }, 200);
      };

      const interval = setInterval(() => {
        startSlideTransition();
      }, SLIDE_INTERVAL_SECONDS * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(transitionTimeout.current);
      };
    }
  }, [slidesExist, data.slides?.length]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsImageVisible(true);
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
          $isVisible={isImageVisible && isImageLoaded}
          src={data.slides[currentSlideIndex].file}
          onLoad={handleImageLoad}
          onError={handleImageError}
          alt=""
        />
        <SlideCounter>
          {currentSlideIndex + 1} / {data.slides.length}
        </SlideCounter>
      </SlideContainer>
    </EventBoard>
  );
}

export default SlidesComponent;
