import React from "react";
import styled from "styled-components";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useData from "../Contexts/DataContext";

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: orange;
  border-radius: 50%;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 24px;
`;

const ConnectionIcon = () => {
  const { isOfflineMode } = useData();

  if (!isOfflineMode) {
    return;
  }

  return (
    <Container>
      <StyledIcon icon={faWifi} />
    </Container>
  );
};

export default ConnectionIcon;
