import React, { useState } from "react";
import styled from "styled-components";
// import { start } from "repl";

const StyledEventOverview = styled.div`
  border: solid 1px black;
`;

const EventOverview = event => {
  const data = event.event;
  const startTimestamp = data.startDate.seconds;
  const endTimestamp = data.endDate.seconds;
  const [expanded, setExpanded] = useState(false);

  function timeConverter(timestamp) {
    const a = new Date(timestamp * 1000);
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const hour = a.getHours();
    const min = `0${a.getMinutes()}`.slice(-2);
    const eventDate = `${date}/${month}-${year}`;
    const time = `${hour}:${min}`;
    return `${eventDate} Klockan: ${time}`;
  }

  return (
    <StyledEventOverview>
      {!expanded ? (
        <div>
          <h3>{data.name}</h3>
          <h4>{timeConverter(startTimestamp)}</h4>
          <h4>Stad: {data.city}</h4>
          <button type="button" onClick={() => setExpanded(true)}>
            Visa mer
          </button>
        </div>
      ) : (
        <div>
          <h3>{data.name}</h3>
          <h4>Startar: {timeConverter(startTimestamp)}</h4>
          <h4>Slutar: {timeConverter(endTimestamp)}</h4>
          <h4>Plats: {data.address.description}</h4>
          <h4>Stad: {data.city}</h4>
          <p>{data.description}</p>
          <h4>
            Extern länk: <a href={data.link}>{data.link}</a>
          </h4>
          <button type="button" onClick={() => setExpanded(false)}>
            Visa mindre
          </button>
        </div>
      )}
    </StyledEventOverview>
  );
};

export default EventOverview;
