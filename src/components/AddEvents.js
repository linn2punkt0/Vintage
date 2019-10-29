import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
// import app from "../firebase";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/auth";

const StyledAddEvents = styled.div``;

const AddEvents = () => {
  //   const db = app.firestore();
  const [eventName, setEventName] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventRegion, setEventRegion] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Get user if logged in
  const { authUser } = useAuth();

  //   const resetForm = () => {
  //     setEventName("");
  //     setEventCity("");
  //     setEventAddress("");
  //     setEventStart("");
  //     setEventEnd("");
  //     setEventRegion("");
  //     setEventDescription("");
  //   };

  // If any fields are empty disable submit-button
  const isInvalid = eventName === "" || eventStart === "";

  const addNewEvent = e => {
    e.preventDefault();

    // Validate and format data here:

    if (authUser) {
      // Add data to firebase here:
      //   db.collection("events")
      //     .doc(eventName + eventStart)
      //     .set({
      //       name: eventName.charAt(0).toUpperCase() + eventName.slice(1),
      //       description: eventDescription,
      //       city: eventCity.charAt(0).toUpperCase() + eventCity.slice(1),
      //       region: eventRegion.charAt(0).toUpperCase() + eventRegion.slice(1),
      //       address: eventAddress,
      //       location: eventAddress,
      //       startDate: new Date(eventStart).getTime(),
      //       endDate: new Date(eventEnd).getTime(),
      //       addedByUser: authUser.email
      //     })
      //     .then(function() {
      //       console.log("Document successfully written!");
      //       resetForm();
      //     })
      //     .catch(function(error) {
      //       console.error("Error writing document: ", error);
      //     });

      console.log(
        eventName.charAt(0).toUpperCase() + eventName.slice(1),
        eventCity,
        eventAddress,
        eventStart,
        eventEnd,
        eventRegion,
        eventDescription
      );
    }
  };

  console.log(new Date(eventStart).getTime());

  return (
    <StyledAddEvents>
      <h2>Lägg till ett nytt event</h2>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="namn på eventet"
        value={eventName}
        onChange={e => setEventName(e.target.value)}
      />
      <input
        type="text"
        name="description"
        id="description"
        placeholder="beskrivning"
        value={eventDescription}
        onChange={e => setEventDescription(e.target.value)}
      />
      <input
        type="text"
        name="address"
        id="address"
        placeholder="adress"
        value={eventAddress}
        onChange={e => setEventAddress(e.target.value)}
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="stad"
        value={eventCity}
        onChange={e => setEventCity(e.target.value)}
      />
      <input
        type="text"
        name="region"
        id="region"
        placeholder="region"
        value={eventRegion}
        onChange={e => setEventRegion(e.target.value)}
      />
      <DatePicker
        selected={eventStart || ""}
        onChange={date => setEventStart(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="d MMM yyyy, HH:mm"
        placeholderText="Fyll i sluttid och datum"
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
      />
      <button type="submit" onClick={addNewEvent} disabled={isInvalid}>
        Lägg till event
      </button>
    </StyledAddEvents>
  );
};

export default AddEvents;
