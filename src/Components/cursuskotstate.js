import styled from "styled-components";

const StateContainer = styled.div`
  background-color: ${(props) => (props.$isOpen ? "#388E3C" : "#B91C1C")};
  color: #fff;
  padding: 0.225rem 1rem;
  border-radius: 100px;
  display: inline-block;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StateText = styled.div`
  font-weight: 600;
  font-size: 3.5rem;
`;

const CursusKotStateComponent = ({ isOpen = false }) => {
  return (
    <StateContainer $isOpen={isOpen}>
      <StateText>{isOpen ? "OPEN" : "GESLOTEN"}</StateText>
    </StateContainer>
  );
};

export default CursusKotStateComponent;
