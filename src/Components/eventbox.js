import styled from "styled-components";

const EventBox = styled.div`
  background: #262626;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  &:not(:first-child) {
    margin-left: 1.3rem;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.65rem;
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentText = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
`;

const EventBoxComponent = ({ activiteit }) => {
  return (
    <EventBox>
      <Title>{activiteit.name}</Title>
      <ContentContainer>
        <ContentText>{activiteit.date}</ContentText>
        <ContentText>{activiteit.time}</ContentText>
      </ContentContainer>
    </EventBox>
  );
};

export default EventBoxComponent;
