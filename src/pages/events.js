import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../firebase";
import EventOverview from "../components/EventOverview";

const StyledEvents = styled.div``;

const Events = () => {
  const db = app.firestore();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    db.collection("events")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setEvents([...events, doc.data()]);
        });
      });
  }, []);

  return (
    <StyledEvents>
      <h2>Här hittar du alla events!</h2>
      {events.map(event => (
        <EventOverview key={event.id} event={event} />
      ))}
    </StyledEvents>
  );
};

export default Events;
