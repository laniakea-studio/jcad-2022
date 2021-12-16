import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { Pin } from "./SvgCollection.js";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import GoogleMapReact from "google-map-react";

const Marker = () => (
  <div
    css={`
      .pin {
        height: 30px;
        margin-top: -15px;
        path {
          fill: ${theme.primary};
        }
      }
    `}
  >
    <Pin />
  </div>
);

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    MapTypeId: "499e98cb4e0498dc",
  };
}

export const GoogleMap = ({ data }) => {
  const defaultProps = {
    center: {
      lat: data.latitude,
      lng: data.longitude,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "360px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAWRz4IqJZ8i-2oZF-DfmCcoxCBqP9XwbY" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={createMapOptions}
      >
        <Marker lat={data.latitude} lng={data.longitude} />
      </GoogleMapReact>
    </div>
  );
};
