import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import app from "../firebase";
import {
  // getAllEvents,
  // getAllRegions,
  // getAllTimeperiods,
  // getAllCategories,
  getAllStartData,
  getFilteredEvents
} from "../firebaseFunctions";
import { useAuth } from "../context/auth";
import EventOverview from "../components/EventOverview";
import AddEvents from "../components/AddEvents";
import ColumnDiv from "../components/GlobalComponents/ColumnDiv";
import RowDiv from "../components/GlobalComponents/RowDiv";
import CheckBoxInput from "../components/GlobalComponents/CheckBoxInput";

const StyledEvents = styled.div``;

const FilterBlock = styled.div``;

const Events = () => {
  // const db = app.firestore();
  // fetch andset once
  const [regions, setRegions] = useState([]);
  const [timeperiods, setTimeperiods] = useState([]);
  const [categories, setCategories] = useState([]);

  // Update many times
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [dateOrder, setDateOrder] = useState("asc");
  const [regionFilter, setRegionFilter] = useState("");
  const [timeperiodFilter, setTimeperiodFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);

  // Get user if logged in
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAllStartData("events");
      setEvents(response);
    };
    const fetchRegions = async () => {
      const response = await getAllStartData("regions");
      setRegions(response);
    };
    const fetchTimeperiods = async () => {
      const response = await getAllStartData("timeperiods");
      setTimeperiods(response);
    };
    const fetchCategories = async () => {
      const response = await getAllStartData("eventCategories");
      setCategories(response);
    };
    fetchEvents();
    fetchRegions();
    fetchTimeperiods();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filterEvents = async () => {
      const response = await getFilteredEvents(
        dateOrder,
        regionFilter,
        timeperiodFilter,
        categoriesFilter
      );
      setFilteredEvents(response);
      console.log(response);
    };
    filterEvents();
  }, [dateOrder, regionFilter, timeperiodFilter, categoriesFilter]);

  filteredEvents.forEach(e => {
    console.log(`resultat: ${e.name}`);
  });
  console.log(`filter: ${filteredEvents}`);

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
          {regions &&
            regions.map(region => (
              <option key={region.id} value={region.name}>
                {region.name}
              </option>
            ))}
        </select>
        <RowDiv align="flex-start">
          <ColumnDiv padding=" 0 20px 20px 20px">
            <h3>Kategorier</h3>
            {categories &&
              categories.map(category => (
                <RowDiv key={category.id} padding="5px">
                  <CheckBoxInput
                    type="checkbox"
                    name="categories"
                    id="categories"
                    placeholder="Lägg till kategorier"
                    value={category.name}
                    onChange={e =>
                      setCategoriesFilter([...categoriesFilter, e.target.value])
                    }
                  />
                  <label htmlFor="categories">{category.name}</label>
                </RowDiv>
              ))}
          </ColumnDiv>
          <ColumnDiv padding=" 0 20px 20px 20px">
            <h3>Tidsperioder</h3>
            {timeperiods &&
              timeperiods.map(timeperiod => (
                <RowDiv key={timeperiod.id} padding="5px">
                  <CheckBoxInput
                    type="checkbox"
                    name="timeperiods"
                    id="timeperiods"
                    placeholder="Lägg till aktuella tidsperioder"
                    value={timeperiod.name}
                    onChange={e =>
                      setTimeperiodFilter([...timeperiodFilter, e.target.value])
                    }
                  />
                  <label htmlFor="timeperiods">{timeperiod.name}</label>
                </RowDiv>
              ))}
          </ColumnDiv>
        </RowDiv>
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
