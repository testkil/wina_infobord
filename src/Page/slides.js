import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useData from "../Contexts/DataContext";

const EventBoard = styled.div`
  width: 100%;
  height: 75%;
  align-self: flex-end;
`;

const fadeTransition = css`
  transition: opacity 0.5s ease;
`;

const SlideImage = styled.img`
  border-radius: 0 0 0 20px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: #262626;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  ${fadeTransition};
`;

function SlidesComponent() {
  const { data } = useData();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const slidesExist = data && Array.isArray(data.slides);

  useEffect(() => {
    if (slidesExist) {
      const intervalId = setInterval(() => {
        setIsImageVisible(false);
        setTimeout(() => {
          setCurrentSlideIndex((prevIndex) =>
            prevIndex + 1 === data.slides.length ? 0 : prevIndex + 1
          );
          setIsImageVisible(true);
        }, 500);
      }, 20000); // change slide every 20 seconds

      return () => clearInterval(intervalId);
    }
  }, [slidesExist, data.slides?.length]);

  const handleImageError = () => {
    setIsImageVisible(false);
  };

  if (!slidesExist || data.slides.length === 0)
    return <EventBoard></EventBoard>;

  return (
    <EventBoard>
      <SlideImage
        $isVisible={isImageVisible}
        src={data.slides[currentSlideIndex].file}
        onError={handleImageError}
        alt={``}
      />
    </EventBoard>
  );
}

export default SlidesComponent;
