/* eslint-disable */
//TEMPORARY DISABLE
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const StyledMap = styled.div`
  padding: 10px;
`;

const styles = {
  width: "100%",
  height: "50vh"
};

const Map = ({ events }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  console.log(events);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/linn2punkt0/ck2vn6kea0vug1cqt6bejr3fj",
        // Long, Lat
        center: [14.394337, 59.804865],
        zoom: 4
      });

      map.on("load", () => {
        setMap(map);
        map.resize();

        map.addSource("allEvents", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: events.map(event => {
              console.log(event);
              return {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [event.location.lng, event.location.lat]
                }
              };
            })
          }
        });

        map.addLayer({
          id: "addEvents",
          type: "circle",
          source: "allEvents",
          layout: {
            visibility: "none"
          },
          paint: {
            "circle-radius": 3,
            "circle-color": "#B42222"
          }
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <StyledMap>
      <div ref={el => (mapContainer.current = el)} style={styles} />
    </StyledMap>
  );
};

export default Map;
