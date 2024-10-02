import styled from "styled-components";
import useData from "../Contexts/DataContext";
import { formatDate } from "../Util/date";

const NextDatesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
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

const DateText = ({ date }) => {
  return (
    <DateAndTimeContainer>
      <ContentText>{formatDate(new Date(date.day), true)}</ContentText>
      <ContentText>
        {date.start.substring(0, 5)} - {date.end.substring(0, 5)}
      </ContentText>
    </DateAndTimeContainer>
  );
};

const NextCursusKotDatesComponent = () => {
  const { data } = useData();
  const next_dates = data?.future_permanenties;

  if (!next_dates) {
    return;
  }

  return (
    <NextDatesContainer>
      <Title>VOLGENDE PERMANENTIES</Title>
      <PaddedBox>
        {next_dates.map((date, index) => {
          return <DateText key={index} date={date} />;
        })}
      </PaddedBox>
    </NextDatesContainer>
  );
};

export default NextCursusKotDatesComponent;
