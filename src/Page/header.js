import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WinaLogo from "../Assets/wina_schild_groot.gif";
import CursusKotStateComponent from "../Components/cursuskotstate";
import useData from "../Contexts/DataContext";
import { formatDate, formatTime } from "../Util/date";

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
  const { data, refreshData, setCursusKotState } = useData();
  const [date, setDate] = useState(new Date());
  const isOpen = data?.cursuskot_open;

  useEffect(() => {
    const isCursusKotOpen = () => {
      const { day, start, end } = data?.future_permanenties[0] || {};
      const nextDateStart = new Date(`${day} ${start}`);
      const nextDateEnd = new Date(`${day} ${end}`);
      const closingTime = data?.cursuskot_closing_time?.split(":").map(Number);
      const closingDate = new Date(date);

      if (closingTime) {
        closingDate.setHours(...closingTime, 0);
      }

      if (
        (date >= nextDateStart && date <= nextDateEnd) ||
        date > closingDate
      ) {
        // in case connection is lost
        if (date > closingDate || date > nextDateEnd) setCursusKotState(false);
        else setCursusKotState(true);

        refreshData();
      }
    };

    if (Object.keys(data).length > 0) {
      isCursusKotOpen();
    }
  }, [date]);

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
      <DateText>{formatDate(date)}</DateText>
      <TimeText>{formatTime(date)}</TimeText>
      <HeaderText>CURSUSKOT</HeaderText>
      <CursusKotStateComponent isOpen={isOpen} />
    </Header>
  );
};
export default HeaderComponent;
