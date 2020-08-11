import React from "react";
import mapboxgl from "mapbox-gl";

import "./section-map.styles.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGtqYWwxNjA1IiwiYSI6ImNrZGs1a2FyMzBsa2cycXEzbWMwbmdydnkifQ.tVRCi-nSagaGDVW2klTmzQ";

class SectionMap extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      lng: props.locations[0].coordinates[0],
      lat: props.locations[0].coordinates[1],
      zoom: 6,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/light-v10",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.scrollZoom.disable();

    this.props.locations.map((spot) => {
      var marker = new mapboxgl.Marker({ color: "#55c57a" })
        .setLngLat([spot.coordinates[0], spot.coordinates[1]])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML("<h3>Day " + spot.day + ":  " + spot.description + "</h3>")
        )
        .addTo(map);
    });
  }

  render() {
    return (
      <div>
        <div></div>
        <div ref={(el) => (this.mapContainer = el)} className="map-container" />
      </div>
    );
  }
}

export default SectionMap;
