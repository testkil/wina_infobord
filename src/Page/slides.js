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
  const transitionTimeout = useRef(null);
  const slidesExist = data && Array.isArray(data.slides);

  useEffect(() => {
    if (slidesExist) {
      // Set interval for slide transition
      const startSlideTransition = () => {
        setIsImageVisible(false);
        transitionTimeout.current = setTimeout(() => {
          setCurrentSlideIndex((prevIndex) =>
            prevIndex + 1 === data.slides.length ? 0 : prevIndex + 1
          );
          setIsImageVisible(true);
        }, 500); // 500ms transition delay before showing the next slide
      };

      const interval = setInterval(() => {
        startSlideTransition();
      }, SLIDE_INTERVAL_SECONDS * 1000); // Auto transition based on SLIDE_INTERVAL_SECONDS

      return () => {
        clearInterval(interval);
        clearTimeout(transitionTimeout.current);
      };
    }
  }, [slidesExist, data.slides?.length]);

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
        <SlideCounter>
          {currentSlideIndex + 1} / {data.slides.length}
        </SlideCounter>
      </SlideContainer>
    </EventBoard>
  );
}

export default SlidesComponent;
