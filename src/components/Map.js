import React, { useState } from "react";
import styled from "styled-components";
import ReactMapGL, { Marker } from "react-map-gl";

const StyledMap = styled.div`
  width: 100%;
  /* position: relative; */
  /* padding: 10px; */
`;

const MarkerStyle = styled.button`
  width: 30px;
  height: 30px;
  background-color: #c0dce1;
  border-radius: 50%;
  border: solid 1px black;
  z-index: 200;
`;

const EventDisplay = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100%;
  z-index: 500;
  background-color: var(--main-accent-color);
  color: var(--light-text-color);

  & > button {
    color: var(--light-text-color);
    text-decoration: underline;
  }
`;

const Map = ({ events }) => {
  const [displayEvent, setDisplayEvent] = useState("");
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "50vh",
    latitude: 59.804865,
    longitude: 14.394337,
    zoom: 4
  });

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
    <StyledMap>
      <ReactMapGL
        mapStyle="mapbox://styles/linn2punkt0/ck2vn6kea0vug1cqt6bejr3fj"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        width={viewport.width}
        height={viewport.height}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={setViewport}
      >
        {events.map(event => (
          <>
            {displayEvent !== "" && (
              <EventDisplay key={displayEvent.name}>
                <h3>{displayEvent.name}</h3>
                <h4>
                  Startar: {timeConverter(displayEvent.startDate.seconds)}
                </h4>
                <h4>Slutar: {timeConverter(displayEvent.endDate.seconds)}</h4>
                <p>{displayEvent.description}</p>
                <h4>Plats: {displayEvent.address.description}</h4>
                <h4>Stad: {displayEvent.city}</h4>
                {displayEvent.link !== "" && (
                  <h4>
                    Extern länk:{" "}
                    <a href={displayEvent.link}>{displayEvent.link}</a>
                  </h4>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setDisplayEvent("");
                  }}
                >
                  Tillbaka till kartan
                </button>
              </EventDisplay>
            )}
            {event.location !== "" && (
              <Marker
                key={event.id}
                latitude={event.location.lat}
                longitude={event.location.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <MarkerStyle
                  onClick={() => {
                    setDisplayEvent(event);
                  }}
                />
              </Marker>
            )}
          </>
        ))}
      </ReactMapGL>
    </StyledMap>
  );
};

export default Map;
