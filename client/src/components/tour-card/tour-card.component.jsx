import React from "react";

import "./tour-card.styles.scss";

import { Link } from "react-router-dom";

import { ReactComponent as Pin } from "../../icons/pin.svg";
import { ReactComponent as Calender } from "../../icons/calendar.svg";
import { ReactComponent as Flag } from "../../icons/flag.svg";
import { ReactComponent as People } from "../../icons/user.svg";

import CustomButton from "../custom-button/custom-button.component";

const TourCard = ({ tour }) => {
  const dateArray = new Date(tour.startDates[0]).toString().split(" ");
  return (
    <div className="tour-card">
      <div className="tour-card__img-container">
        <img
          src={`/img/tours/${tour.imageCover}`}
          className="tour-card__img-container--image"
        />
      </div>
      <div className="tour-card__heading">
        <span className="tour-card__heading-span">{tour.name}</span>
      </div>
      <div className="tour-card__details">
        <h5 className="tour-card__details--uppertext">{`${tour.difficulty} ${tour.duration}-day Tour`}</h5>
        <h5 className="tour-card__details--lowertext">{`${tour.summary}`}</h5>
        <div className="tour-card__details--grid">
          <div className="tour-card__about">
            <Pin className="tour-card__about--icon" />
            <h5 className="tour-card__about--text">
              {tour.startLocation.description}
            </h5>
          </div>
          <div className="tour-card__about">
            <Calender className="tour-card__about--icon" />
            <h5 className="tour-card__about--text">{`${dateArray[1]}  ${dateArray[3]}`}</h5>
          </div>
          <div className="tour-card__about">
            <Flag className="tour-card__about--icon" />
            <h5 className="tour-card__about--text">
              {`${tour.locations.length} Stops`}{" "}
            </h5>
          </div>
          <div className="tour-card__about">
            <People className="tour-card__about--icon" />
            <h5 className="tour-card__about--text">{`${tour.maxGroupSize} People`}</h5>
          </div>
        </div>
      </div>
      <div className="tour-card__bottom">
        <div className="tour-card__bottom--details">
          <h5 className="tour-card__about--text text">
            <span className="special">{`$${tour.price}`}</span> per person
          </h5>
          <h5 className="tour-card__about--text text">
            <span className="special">{tour.ratingsAverage}</span>
            {` rating (${tour.ratingsQuantity})`}
          </h5>
        </div>
        <Link to={`/all-tours/${tour.id}`}>
          <CustomButton content="DETAILS" btnClass="btn_details" />
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
