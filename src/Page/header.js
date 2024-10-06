import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import WinaLogo from "../Assets/wina_schild_groot.gif";
import CursusKotStateComponent from "../Components/cursuskotstate";
import useData from "../Contexts/DataContext";

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  margin-top: 20%;
  margin-bottom: 10%;
  width: 169px;
  height: 220px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const DateText = styled.span`
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 1rem;
`;
const TimeText = styled.span`
  font-weight: 900;
  font-size: 8rem;
`;

const HeaderText = styled.span`
  font-weight: 600;
  font-size: 2.8rem;
`;

const HeaderComponent = () => {
  const { data } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const isCursusKotOpen = () => {
      const nextPermanentie = data?.permanenties[0] || {};
      const nextDateStart = new Date(nextPermanentie.start);
      const nextDateEnd = new Date(nextPermanentie.end);

      if (date >= nextDateStart && date <= nextDateEnd) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    if (Object.keys(data).length > 0) {
      isCursusKotOpen();
    }
  }, [date, data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Header>
      <Image src={WinaLogo} alt="Wina Logo" />
      <DateText>{format(date, "EEEE PPP", { locale: nl })}</DateText>
      <TimeText>{format(date, "HH:mm", { locale: nl })}</TimeText>
      <HeaderText>CURSUSKOT</HeaderText>
      <CursusKotStateComponent isOpen={isOpen} />
    </Header>
  );
};

export default HeaderComponent;
