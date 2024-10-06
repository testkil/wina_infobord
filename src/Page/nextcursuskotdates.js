import styled from "styled-components";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import useData from "../Contexts/DataContext";

const NextDatesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  width: 100%;
  max-width: 420px;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.8rem;
`;

const PaddedBox = styled.div`
  padding: 27px 0;
  width: 95%;
`;

const ContentText = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2;
`;

const DateAndTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DateText = ({ permanentie }) => {
  const startDate = new Date(permanentie.start);
  const endDate = new Date(permanentie.end);

  // if date end has already passed, don't show it
  if (endDate < new Date()) {
    return null;
  }

  return (
    <DateAndTimeContainer>
      <ContentText>{format(startDate, "PPP", { locale: nl })}</ContentText>
      <ContentText>
        {format(startDate, "HH:mm", { locale: nl })} -{" "}
        {format(endDate, "HH:mm", { locale: nl })}
      </ContentText>
    </DateAndTimeContainer>
  );
};

const NextCursusKotDatesComponent = () => {
  const { data } = useData();
  const permanenties = data?.permanenties;

  if (!permanenties) {
    return null;
  }

  return (
    <NextDatesContainer>
      <Title>PERMANENTIES</Title>
      <PaddedBox>
        {permanenties.map((permanentie, index) => {
          return <DateText key={index} permanentie={permanentie} />;
        })}
      </PaddedBox>
    </NextDatesContainer>
  );
};

export default NextCursusKotDatesComponent;
