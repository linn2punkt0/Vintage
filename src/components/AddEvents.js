import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import app from "../firebase";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/auth";
import useDebounce from "../hooks/useDebounce";
import Button from "./Button";
import Input from "./Input";

const StyledAddEvents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .DateInput {
    min-height: 40px;
    height: ${({ height }) => height || "40px"};
    min-width: 20em;
    border: solid 1px black;
    border-radius: 5px;
    padding: 10px;
    color: var(--dark-text-color);
    background-color: var(--light-text-color);
  }

  select {
    min-height: 40px;
    height: ${({ height }) => height || "40px"};
    min-width: 20em;
    border: solid 1px black;
    border-radius: 5px;
    padding: 10px;
    color: var(--dark-text-color);
    background-color: var(--light-text-color);
  }
`;

const StyledEventForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2em;
  margin: 2em;
  border: solid 1px black;
  border-radius: 5px;

  input,
  select {
    margin: 0 0 1em 0;
  }
`;

const AddEvents = () => {
  const db = app.firestore();
  const [eventName, setEventName] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventRegion, setEventRegion] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [auto, setAuto] = useState([]);
  const [regions, setRegions] = useState([]);

  const debouncedAddress = useDebounce(eventAddress, 500);

  // Get user if logged in
  const { authUser } = useAuth();

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

  const resetForm = () => {
    setEventName("");
    setEventCity("");
    setEventAddress("");
    setEventStart("");
    setEventEnd("");
    setEventRegion("");
    setEventDescription("");
  };

  // If any fields are empty disable submit-button
  const isInvalid = eventName === "" || eventStart === "";

  const getAddressSuggestions = () => {
    fetch(`/.netlify/functions/autocomplete?input=${eventAddress}`, {
      headers: { accept: "Accept: application/json" }
    })
      .then(response => response.json())
      .then(data =>
        data.msg.predictions.forEach(prediction => {
          setAuto([...auto, prediction.description]);
        })
      );
  };

  auto.forEach(prediction => {
    console.log(`this is auto: ${prediction}`);
  });

  const addNewEvent = e => {
    e.preventDefault();
    if (authUser) {
      // Add data to firebase here, validate and format data in the process
      db.collection("events")
        .doc(eventName + eventStart)
        .set({
          name: eventName.charAt(0).toUpperCase() + eventName.slice(1),
          description: eventDescription,
          city: eventCity.charAt(0).toUpperCase() + eventCity.slice(1),
          region: eventRegion,
          address: eventAddress,
          location: eventAddress,
          startDate: new Date(eventStart).getTime(),
          endDate: new Date(eventEnd).getTime(),
          addedByUser: authUser.email
        })
        .then(function() {
          console.log("Document successfully written!");
          resetForm();
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  useEffect(() => {
    if (debouncedAddress) {
      getAddressSuggestions();
    }
  }, [debouncedAddress]);

  return (
    <StyledAddEvents>
      <StyledEventForm>
        <h2>Lägg till ett nytt event</h2>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Namn på eventet"
          value={eventName}
          onChange={e => setEventName(e.target.value)}
        />
        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Beskrivning"
          value={eventDescription}
          onChange={e => setEventDescription(e.target.value)}
        />
        <Input
          type="text"
          name="address"
          id="address"
          placeholder="Adress"
          value={eventAddress}
          onChange={e => setEventAddress(e.target.value)}
        />
        <Input
          type="text"
          name="city"
          id="city"
          placeholder="Stad"
          value={eventCity}
          onChange={e => setEventCity(e.target.value)}
        />
        <select
          type="text"
          name="region"
          id="region"
          placeholder="Region"
          value={eventRegion}
          onChange={e => setEventRegion(e.target.value)}
        >
          {regions.map(region => (
            <option key={region.id} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
        <DatePicker
          selected={eventStart || ""}
          onChange={date => setEventStart(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="d MMM yyyy, HH:mm"
          placeholderText="Fyll i starttid och datum"
          className="DateInput"
        />
        <DatePicker
          selected={eventEnd || ""}
          onChange={date => setEventEnd(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="d MMM yyyy, HH:mm"
          placeholderText="Fyll i sluttid och datum"
          className="DateInput"
        />
        <Button type="submit" onClick={addNewEvent} disabled={isInvalid}>
          Lägg till event
        </Button>
      </StyledEventForm>
    </StyledAddEvents>
  );
};

export default AddEvents;
