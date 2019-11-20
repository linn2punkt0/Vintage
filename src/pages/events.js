import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { getAllStartData, getFilteredEvents } from "../firebaseFunctions";
import { useAuth } from "../context/auth";
import EventOverview from "../components/EventOverview";
import AddEvents from "../components/AddEvents";
import ColumnDiv from "../components/GlobalComponents/ColumnDiv";
import RowDiv from "../components/GlobalComponents/RowDiv";
import CheckBoxInput from "../components/GlobalComponents/CheckBoxInput";
import Button from "../components/GlobalComponents/Button";
import SEO from "../components/GlobalComponents/SEO";
import Map from "../components/Map";
import ErrorContainer from "../components/GlobalComponents/ErrorContainer";
import LogInBlock from "../components/GlobalComponents/LogInBlock";

const StyledEvents = styled.div`
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 800px) {
    width: 60vw;
  }

  & > button {
    margin-bottom: 0.5em;
  }
`;

const FilterBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
  border-radius: 5px;
  margin-bottom: 10px;

  div > select {
    min-height: 40px;
    height: ${({ height }) => height || "40px"};
    min-width: 6em;
    border: solid 1px black;
    border-radius: 5px;
    padding: 10px;
    color: var(--dark-text-color);
    background-color: var(--light-text-color);
    margin: 1em 0.5em 1em 0.5em;
  }
`;

const EventContainer = styled.div`
  /* margin: 20px; */
  width: 100%;
  max-height: 60vh;
  overflow: scroll;
  border: solid 1px black;
  border-radius: 5px;
`;

const Events = () => {
  // fetch and set once
  const [regions, setRegions] = useState([]);
  const [timeperiods, setTimeperiods] = useState([]);
  const [categories, setCategories] = useState([]);

  // Update many times
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [dateOrder, setDateOrder] = useState("asc");
  const [regionFilter, setRegionFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);
  const [userError, setUserError] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  // Get user if logged in
  const { authUser } = useAuth();

  // Fetch all start data
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

  // Add error if user checks more than 10 tags
  useEffect(() => {
    const countTags = () => {
      if (tagsFilter.length > 1) {
        setUserError(
          "Du får max bocka i 10 rutor. (Kategorier och Tidsperioder)"
        );
      } else {
        setUserError("");
      }
    };
    countTags();
  }, [tagsFilter]);

  // Sort and filter events by date, region and tags
  const filterEvents = async () => {
    const response = await getFilteredEvents(
      dateOrder,
      regionFilter,
      tagsFilter
    );
    setFilteredEvents(response);
  };

  // Reset all filters
  const clearFilters = () => {
    setRegionFilter("");
    setDateOrder("asc");
    setTagsFilter([]);
    setFilteredEvents(events);
  };

  // Fetch all events again, used after submitting new event
  const reloadEvents = async () => {
    const response = await getAllStartData("events");
    setEvents(response);
  };

  // Toggle checkboxes onClick
  const toggleTags = (e, tagType) => {
    if (tagsFilter.indexOf(tagType.name) === -1) {
      setTagsFilter([...tagsFilter, e.target.value]);
    } else {
      setTagsFilter(
        tagsFilter.filter(item => {
          return tagType.name !== item;
        })
      );
    }
  };

  return (
    <StyledEvents>
      <SEO
        title="Vintage Sverige: Event & Mässor"
        description="Här hittar du vintage-mässor och event."
        url="http://vintagesverige.se/event-och-massor"
      />
      <h2>Här hittar du alla event!</h2>
      {!openFilter ? (
        <button type="button" onClick={() => setOpenFilter(true)}>
          Filtrera event
        </button>
      ) : (
        <>
          <button type="button" onClick={() => setOpenFilter(false)}>
            Stäng filter
          </button>
          <FilterBlock>
            {userError !== "" && (
              <ErrorContainer>
                <p>{userError}</p>
              </ErrorContainer>
            )}
            <RowDiv>
              <select
                type="text"
                name="dateOrder"
                id="dateOrder"
                placeholder="Sortera datum"
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
                <option value="">Välj en region</option>
                <option value="">Alla regioner</option>
                {regions &&
                  regions.map(region => (
                    <option key={region.id} value={region.name}>
                      {region.name}
                    </option>
                  ))}
              </select>
            </RowDiv>
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
                        checked={tagsFilter.indexOf(category.name) !== -1}
                        onChange={e => toggleTags(e, category)}
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
                        checked={tagsFilter.indexOf(timeperiod.name) !== -1}
                        onChange={e => toggleTags(e, timeperiod)}
                      />
                      <label htmlFor="timeperiods">{timeperiod.name}</label>
                    </RowDiv>
                  ))}
              </ColumnDiv>
            </RowDiv>
            <RowDiv justify="center">
              <Button
                type="button"
                margin=" 0 0.5em 1em 0"
                onClick={() => filterEvents()}
              >
                Filtrera
              </Button>
              <Button
                type="button"
                margin=" 0 0 1em 0.5em"
                onClick={() => clearFilters()}
              >
                Rensa filter
              </Button>
            </RowDiv>
          </FilterBlock>
        </>
      )}
      <Map events={events} />
      <EventContainer>
        {filteredEvents.length > 0
          ? filteredEvents.map(event => (
              <EventOverview key={event.id} event={event} />
            ))
          : events.map(event => <EventOverview key={event.id} event={event} />)}
      </EventContainer>
      {authUser &&
      regions.length > 0 &&
      categories.length > 0 &&
      timeperiods.length > 0 ? (
        <AddEvents
          regions={regions}
          categories={categories}
          timeperiods={timeperiods}
          reloadEvents={reloadEvents}
        />
      ) : (
        <LogInBlock>
          <NavLink to="/logga-in">
            <h4>Logga in för att kunna lägga till nya events.</h4>
          </NavLink>
        </LogInBlock>
      )}
    </StyledEvents>
  );
};

export default Events;
