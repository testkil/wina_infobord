import styled from "styled-components";
import useData from "../Contexts/DataContext";

const StateContainer = styled.div`
  background-color: ${(props) => (props.$isOpen ? "#388E3C" : "#B91C1C")};
  color: #fff;
  padding: 0.225rem 1rem;
  border-radius: 100px;
  display: inline-block;
  margintop: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StateText = styled.div`
  font-weight: 600;
  font-size: 3.5rem;
`;

const ContentText = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2;
`;

const ShiftEndContainer = styled.div`
  height: 100px;
`;

const CursusKotStateComponent = ({ isOpen = false }) => {
  const { data } = useData();

  // Safely handle data and permanenties
  const endTime = data?.permanenties?.[0]?.end
    ? new Date(data.permanenties[0].end)
    : null;

  return (
    <>
      <StateContainer $isOpen={isOpen}>
        <StateText>{isOpen ? "OPEN" : "GESLOTEN"}</StateText>
      </StateContainer>
      <ShiftEndContainer>
        {isOpen && endTime && (
          <ContentText>
            Tot {endTime.toTimeString().substring(0, 5)}
          </ContentText>
        )}
      </ShiftEndContainer>
    </>
  );
};

export default CursusKotStateComponent;
