import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import app from "../firebase";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/auth";
import useDebounce from "../hooks/useDebounce";
import Button from "./GlobalComponents/Button";
import Input from "./GlobalComponents/Input";
import CheckBoxInput from "./GlobalComponents/CheckBoxInput";
import ColumnDiv from "./GlobalComponents/ColumnDiv";
import RowDiv from "./GlobalComponents/RowDiv";

const StyledAddEvents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .DateInput,
  select {
    min-height: 40px;
    height: ${({ height }) => height || "40px"};
    min-width: 20em;
    border: solid 1px black;
    border-radius: 5px;
    padding: 10px;
    color: var(--dark-text-color);
    background-color: var(--light-text-color);
    margin: 0 0 1em 0;
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
  background-color: var(--main-accent-color);
  color: var(--light-text-color);
`;

const Predictions = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 40px;
  min-width: 20em;
  border: solid 1px black;
  border-radius: 0 0 5px 5px;
  padding: 10px;
  color: var(--dark-text-color);
  background-color: var(--light-text-color);
  margin: 0;

  button {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: solid 1px black;
    background-color: var(--ligt-text-color);
  }
`;

const StyledSpecialInput = styled.input`
  min-height: 40px;
  height: ${({ height }) => height || "40px"};
  min-width: 20em;
  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  color: var(--dark-text-color);
  background-color: var(--light-text-color);
  margin: 0;
`;

const AddEvents = ({ regions, categories, timeperiods, addNewItem }) => {
  const db = app.firestore();

  // Event data, set by the user
  const [eventName, setEventName] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventRegion, setEventRegion] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLink, setEventLink] = useState("");

  const [eventTags, setEventTags] = useState([]);
  const [autocompletedAddress, setAutocompletedAddress] = useState(null);

  // Temp data
  const [addressPredictions, setAddressPredictions] = useState([]);
  const [displayPredictions, setDisplayPredictions] = useState(false);

  const debouncedAddress = useDebounce(eventAddress, 800);
  const debouncedAutocompleted = useDebounce(autocompletedAddress, 800);

  // Get user if logged in
  const { authUser } = useAuth();

  // Use to reset form after submitting new event
  const resetForm = () => {
    setEventName("");
    setEventCity("");
    setEventAddress("");
    setEventStart("");
    setEventEnd("");
    setEventRegion("");
    setEventDescription("");
    setEventLink("");
    setAutocompletedAddress("");
    setAddressPredictions([]);
    setDisplayPredictions(false);
    setEventTags([]);
  };

  // If any fields are empty disable submit-button
  const isInvalid =
    eventName === "" ||
    eventStart === "" ||
    eventAddress === "" ||
    eventRegion === "" ||
    eventDescription === "" ||
    eventCity === "";

  // Replace Å, Ä, Ö to avoid API-Errors
  const replaceSpecialChars = string => {
    return string
      .replace("å", "a")
      .replace("ä", "a")
      .replace("ö", "o")
      .replace("Å", "A")
      .replace("Ä", "A")
      .replace("Ö", "O");
  };

  // Get address-autocompletes from Google API via netlify functions
  const getAddressSuggestions = () => {
    const tempArray = [];
    fetch(
      `/.netlify/functions/autocomplete?input=${replaceSpecialChars(
        eventAddress
      )}`,
      {
        headers: { accept: "Accept: application/json" }
      }
    )
      .then(response => response.json())
      .then(data => {
        data.msg.predictions.forEach(prediction => {
          tempArray.push(prediction.description);
        });
        setAddressPredictions([...tempArray]);
        setDisplayPredictions(true);
      });
  };

  // NOT DONE
  const getLocation = () => {
    const tempArray = [];
    fetch(
      `/.netlify/functions/location?input=${replaceSpecialChars(
        autocompletedAddress || eventAddress
      )}`,
      {
        headers: { accept: "Accept: application/json" }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // data.msg.predictions.forEach(prediction => {
        //   tempArray.push(prediction.description);
        // });
        setEventLocation([...tempArray]);
      });
  };

  // Add new event to Firebase
  const addNewEvent = e => {
    e.preventDefault();
    if (authUser) {
      // Add data to firebase here, validate and format data in the process
      db.collection("events")
        .doc(eventName + new Date())
        .set({
          name: eventName.charAt(0).toUpperCase() + eventName.slice(1),
          description: eventDescription,
          city: eventCity.charAt(0).toUpperCase() + eventCity.slice(1),
          region: eventRegion,
          address: autocompletedAddress || eventAddress,
          location: eventLocation,
          startDate: new Date(eventStart),
          endDate: new Date(eventEnd),
          link: eventLink,
          addedByUser: authUser.email,
          tags: eventTags
        })
        .then(function() {
          resetForm();
          addNewItem({
            name: eventName.charAt(0).toUpperCase() + eventName.slice(1),
            description: eventDescription,
            city: eventCity.charAt(0).toUpperCase() + eventCity.slice(1),
            region: eventRegion,
            address: autocompletedAddress || eventAddress,
            location: eventLocation,
            startDate: new Date(eventStart),
            endDate: new Date(eventEnd),
            link: eventLink,
            tags: eventTags,
            id: eventName
          });
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  // Run getAddressSuggestions-function when eventAddress is set, after debounce
  useEffect(() => {
    if (debouncedAddress) {
      getAddressSuggestions();
    }
  }, [debouncedAddress]);

  // Run getLocation-function when adress is set
  useEffect(() => {
    if (debouncedAddress) {
      getLocation();
    }
  }, [debouncedAddress, debouncedAutocompleted]);

  const toggleEventTags = (e, tagType) => {
    if (eventTags.indexOf(tagType.name) === -1) {
      setEventTags([...eventTags, e.target.value]);
    } else {
      setEventTags(
        eventTags.filter(item => {
          return tagType.name !== item;
        })
      );
    }
  };

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
        {!autocompletedAddress && (
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="Adress"
            value={eventAddress}
            onChange={e => setEventAddress(e.target.value)}
            margin="0"
          />
        )}
        {displayPredictions && (
          <Predictions>
            {addressPredictions.map(prediction => (
              <button
                type="submit"
                key={prediction}
                onClick={() => {
                  setAutocompletedAddress(prediction);
                  setDisplayPredictions(false);
                }}
              >
                {prediction}
              </button>
            ))}
          </Predictions>
        )}
        {autocompletedAddress && (
          <StyledSpecialInput
            type="text"
            name="address2"
            id="address2"
            value={autocompletedAddress}
            onChange={e => setAutocompletedAddress(e.target.value)}
          />
        )}
        <Input
          type="text"
          name="city"
          id="city"
          placeholder="Stad"
          value={eventCity}
          onChange={e => setEventCity(e.target.value)}
          margin="1em 0 1em 0"
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
        <Input
          type="url"
          name="link"
          id="link"
          placeholder="Länk till webbsida eller facebook-event."
          value={eventLink}
          onChange={e => setEventLink(e.target.value)}
        />
        <RowDiv align="flex-start">
          <ColumnDiv padding=" 0 20px 20px 20px">
            <h3>Kategorier</h3>
            {categories.map(category => (
              <RowDiv key={category.id} padding="5px">
                <CheckBoxInput
                  type="checkbox"
                  name="categories"
                  id="categories"
                  placeholder="Lägg till kategorier"
                  value={category.name}
                  checked={eventTags.indexOf(category.name) !== -1}
                  onChange={e => toggleEventTags(e, category)}
                />
                <label htmlFor="categories">{category.name}</label>
              </RowDiv>
            ))}
          </ColumnDiv>
          <ColumnDiv padding=" 0 20px 20px 20px">
            <h3>Tidsperioder</h3>
            {timeperiods.map(timeperiod => (
              <RowDiv key={timeperiod.id} padding="5px">
                <CheckBoxInput
                  type="checkbox"
                  name="timeperiods"
                  id="timeperiods"
                  placeholder="Lägg till aktuella tidsperioder"
                  value={timeperiod.name}
                  checked={eventTags.indexOf(timeperiod.name) !== -1}
                  onChange={e => toggleEventTags(e, timeperiod)}
                />
                <label htmlFor="timeperiods">{timeperiod.name}</label>
              </RowDiv>
            ))}
          </ColumnDiv>
        </RowDiv>
        <Button
          type="submit"
          onClick={addNewEvent}
          disabled={isInvalid}
          bgColor="var(--bg-color)"
          color="var(--dark-text-color)"
        >
          Lägg till event
        </Button>
      </StyledEventForm>
    </StyledAddEvents>
  );
};

export default AddEvents;
