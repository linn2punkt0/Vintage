import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useAuth } from "../context/auth";
import EventOverview from "../components/EventOverview";
import AddEvents from "../components/AddEvents";

const StyledEvents = styled.div``;

const FilterBlock = styled.div``;

const Events = () => {
  const db = app.firestore();
  // fetch andset once
  const [regions, setRegions] = useState([]);

  // Update many times
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");
  const [dateOrder, setDateOrder] = useState("");

  // Get user if logged in
  const { authUser } = useAuth();

  // Get all events, sort by date
  useEffect(() => {
    const tempArray = [];
    const order = dateOrder || "asc";

    db.collection("events")
      .orderBy("startDate", order)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempArray.push({ id: doc.id, ...doc.data() });
        });
        setEvents(tempArray);
      });
  }, [dateOrder]);

  // get all regions
  useEffect(() => {
    const tempArray = [];

    db.collection("regions")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempArray.push({ id: doc.id, ...doc.data() });
        });
        setRegions(tempArray);
      });
  }, []);

  // get events by timeperiod ------ WORK IN PROGRESS
  // useEffect(() => {
  //   const tempArray = [];

  //   db.collection("events")
  //     .where("timeperiods", "array-contains", "50-tal")
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         tempArray.push({ id: doc.id, ...doc.data() });
  //       });
  //       setEvents(tempArray);
  //     });
  // }, []);

  // useEffect(() => {
  //   const tempArray = [];

  //   db.collection("events")
  //     .where("timeperiod", "array-contains", "50-tal")
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         tempArray.push({ id: doc.id, ...doc.data() });
  //       });
  //       setFilteredEvents(tempArray);
  //     });
  // }, []);

  // get all events where region == regionFilter
  useEffect(() => {
    const tempArray = [];

    db.collection("events")
      .where("region", "==", regionFilter)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempArray.push({ id: doc.id, ...doc.data() });
        });
        setFilteredEvents(tempArray);
      });
  }, [regionFilter]);

  console.log(`filter: ${regionFilter}`);

  filteredEvents.forEach(e => {
    console.log(`resultat: ${e.name}`);
  });

  return (
    <StyledEvents>
      <h2>Här hittar du alla event!</h2>
      <FilterBlock>
        <select
          type="text"
          name="dateOrder"
          id="dateOrder"
          placeholder="Sortera datum"
          // value={dateOrder}
          onChange={e => setDateOrder(e.target.value)}
        >
          <option value="asc">Sortera efter datum</option>
          <option value="desc">Fallande</option>
          <option value="asc">Stigande</option>
        </select>
        <select
          type="text"
          name="region"
          id="region"
          placeholder="Region"
          value={regionFilter}
          onChange={e => setRegionFilter(e.target.value)}
        >
          {regions.map(region => (
            <option key={region.id} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </FilterBlock>
      {filteredEvents.length > 0
        ? filteredEvents.map(event => (
            <EventOverview key={event.id} event={event} />
          ))
        : events.map(event => <EventOverview key={event.id} event={event} />)}

      {authUser ? (
        <AddEvents regions={regions} />
      ) : (
        <h4>Logga in för att kunna lägga till nya events.</h4>
      )}
    </StyledEvents>
  );
};

export default Events;
