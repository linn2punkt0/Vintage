import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useAuth } from "../context/auth";
import EventOverview from "../components/EventOverview";
import AddEvents from "../components/AddEvents";

const StyledEvents = styled.div``;

const Events = () => {
  const db = app.firestore();
  const [events, setEvents] = useState([]);

  // Get user if logged in
  const { authUser } = useAuth();

  useEffect(() => {
    const tempArray = [];

    db.collection("events")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempArray.push(doc.data());
        });
        setEvents(tempArray);
      });
  }, []);

  return (
    <StyledEvents>
      <h2>Här hittar du alla events!</h2>
      {events.map(event => (
        <EventOverview key={event} event={event} />
      ))}

      {authUser ? (
        <AddEvents />
      ) : (
        <h4>Logga in för att kunna lägga till nya events.</h4>
      )}
    </StyledEvents>
  );
};

export default Events;
