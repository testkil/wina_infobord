import styled from "styled-components";
import EventBoxComponent from "../Components/eventbox";
import useData from "../Contexts/DataContext";

const UpcomingEventContainer = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpcomingEventRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.5;
`;

const UpcomingEventsComponent = () => {
  const { data } = useData();
  const activiteiten = data?.activiteiten;

  if (!activiteiten) {
    return;
  }

  return (
    <UpcomingEventContainer>
      <Title>AANKOMENDE ACTIVITEITEN</Title>
      <UpcomingEventRow>
        {activiteiten.map((activiteit, index) => {
          return <EventBoxComponent key={index} activiteit={activiteit} />;
        })}
      </UpcomingEventRow>
    </UpcomingEventContainer>
  );
};

export default UpcomingEventsComponent;
