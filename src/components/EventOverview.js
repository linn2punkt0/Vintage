import React from "react";
import styled from "styled-components";
// import { start } from "repl";

const StyledEventOverview = styled.div`
  border: solid 1px black;
`;

const EventOverview = event => {
  const data = event.event;
  const startTimestamp = data.startDate.seconds;
  const endTimestamp = data.endDate.seconds;

  function timeConverter(timestamp) {
    const a = new Date(timestamp * 1000);
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = `${date}/${month}-${year} ${hour}:${min}`;
    return time;
  }

  return (
    <StyledEventOverview>
      <h3>{data.name}</h3>
      <h4>Startar: {timeConverter(startTimestamp)}</h4>
      <h4>Slutar: {timeConverter(endTimestamp)}</h4>
      <h4>Plats: {data.city}</h4>
      <p>{data.description}</p>
    </StyledEventOverview>
  );
};

export default EventOverview;
