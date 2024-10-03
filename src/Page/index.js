import React from "react";
import styled from "styled-components";
import HeaderComponent from "./header";
import NextCursusKotDatesComponent from "./nextcursuskotdates";
import SlidesComponent from "./slides";
import UpcomingEventsComponent from "./upcomingevents";
import ConnectionIcon from "./connectionStation";

const PageContainer = styled.div`
  background: linear-gradient(to left, black, #262626);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 100%;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 100%;
`;

const Page = () => {
  const handleClick = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    if (requestFullScreen) {
      requestFullScreen.call(docEl);
    }

    doc.body.style.cursor = "none";
  };
  return (
    <PageContainer onClick={handleClick}>
      <LeftColumn>
        <HeaderComponent />
        <NextCursusKotDatesComponent />
      </LeftColumn>
      <RightColumn>
        <SlidesComponent />
        <UpcomingEventsComponent />
      </RightColumn>
      <ConnectionIcon />
    </PageContainer>
  );
};

export default Page;
