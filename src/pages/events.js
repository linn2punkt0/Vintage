import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { Helmet } from "react-helmet";
import { getAllStartData, getFilteredEvents } from "../firebaseFunctions";
import { useAuth } from "../context/auth";
import EventOverview from "../components/EventOverview";
import AddEvents from "../components/AddEvents";
import ColumnDiv from "../components/GlobalComponents/ColumnDiv";
import RowDiv from "../components/GlobalComponents/RowDiv";
import CheckBoxInput from "../components/GlobalComponents/CheckBoxInput";
import Button from "../components/GlobalComponents/Button";
import SEO from "../components/GlobalComponents/SEO";
// import Map from "../components/Map";

const StyledEvents = styled.div``;

const FilterBlock = styled.div`
  border: solid 1px black;
  border-radius: 5px;

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
  margin: 20px;
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

  const [openFilter, setOpenFilter] = useState(false);

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

  const filterEvents = async () => {
    const response = await getFilteredEvents(
      dateOrder,
      regionFilter,
      tagsFilter
    );
    setFilteredEvents(response);
  };

  const clearFilters = () => {
    setRegionFilter("");
    setDateOrder("asc");
    setTagsFilter([]);
    setFilteredEvents(events);
  };

  const reloadEvents = async () => {
    const response = await getAllStartData("events");
    setEvents(response);
  };

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

  // tagsFilter.forEach(tag => {
  //   console.log(`Tags: ${tag}`);
  // });

  // console.log(events);
  // console.log(filteredEvents);
  return (
    <StyledEvents>
      {/* <Helmet> */}
      <SEO
        title="Vintage Sverige: Event & Mässor"
        description="Här hittar du vintage-mässor och event. TEST SEO COMPONENT"
        url="http://vintagesverige.se/event-och-massor"
      />
      {/* <title>Vintage Sverige: Event & Mässor</title>
        {/* Facebook meta */}
      {/* <meta property="og:title" content="Vintage Sverige: Event & Mässor" />
        <meta
          property="og:description"
          content="Här hittar du vintage-mässor och event."
        />
        <meta property="og:image" content="/images/logoTest4.png" />
        <meta
          property="og:url"
          content="http://vintagesverige.se/event-och-massor"
        /> */}
      {/* Twitter meta */}
      {/* <meta name="twitter:title" content="Vintage Sverige: Event & Mässor" />
        <meta
          name="twitter:description"
          content="Här hittar du vintage-mässor och event."
        />
        <meta
          name="twitter:url"
          content="http://vintagesverige.se/event-och-massor"
        />
        <meta name="twitter:image" content="/images/logoTest4.png" /> */}
      {/* standard meta */}
      {/* <meta property="title" content="Vintage Sverige: Event & Mässor" />
        <meta
          name="description"
          content="Här hittar du vintage-mässor och event."
        /> */}

      {/* </Helmet> */}
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
          </FilterBlock>
        </>
      )}
      {/* <Map events={events} /> */}
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
        <h4>Logga in för att kunna lägga till nya events.</h4>
      )}
    </StyledEvents>
  );
};

export default Events;
