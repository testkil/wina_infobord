import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale"; // Import Dutch locale

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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentText = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
`;

const dayNameMap = {
  maandag: "ma",
  dinsdag: "di",
  woensdag: "woe",
  donderdag: "do",
  vrijdag: "vrij",
  zaterdag: "zat",
  zondag: "zon",
};

const EventBoxComponent = ({ activiteit }) => {
  const startDate = parseISO(activiteit.start);
  const endDate = parseISO(activiteit.end);

  const fullDayName = format(startDate, "EEEE", { locale: nl }).toLowerCase();
  const shortDayName = dayNameMap[fullDayName];

  const formattedDate = `${shortDayName} ${format(startDate, "dd/MM/yyyy")}`;
  const formattedStartTime = format(startDate, "HH:mm", { locale: nl });
  const formattedEndTime = format(endDate, "HH:mm", { locale: nl });

  return (
    <EventBox>
      <Title>{activiteit.name}</Title>
      <ContentContainer>
        <ContentText>{formattedDate}</ContentText>
        <ContentText>
          {formattedStartTime} - {formattedEndTime}
        </ContentText>
      </ContentContainer>
    </EventBox>
  );
};

export default EventBoxComponent;
