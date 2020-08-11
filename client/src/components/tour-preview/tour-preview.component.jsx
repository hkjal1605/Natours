import React from "react";

import "./tour-preview.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectTourForPreview,
  selectTourErrorMessage,
} from "../../redux/tour/tour.selector";

import { ReactComponent as Clock } from "../../icons/clock.svg";
import { ReactComponent as Pin } from "../../icons/pin.svg";
import { ReactComponent as Calendar } from "../../icons/calendar.svg";
import { ReactComponent as Difficulty } from "../../icons/up-arrow.svg";
import { ReactComponent as User } from "../../icons/user.svg";
import { ReactComponent as Star } from "../../icons/star.svg";

import SectionMap from "../../components/section-map/section-map.component";
import ErrorDisplay from "../../components/404-error/404-error.component";
import BookinButton from "../../components/booking-button/booking-button.component";

const TourPreview = ({ tour, error }) => {
  const star = [1, 2, 3, 4, 5];
  const dateArray = tour
    ? new Date(tour.startDates[0]).toString().split(" ")
    : undefined;
  if (error) {
    return (
      <div>
        <ErrorDisplay error={error} />
      </div>
    );
  }
  return (
    <section className="tour-preview">
      {tour ? (
        <div>
          <div className="tour-preview__header">
            <img
              src={`/img/tours/${tour.imageCover}`}
              className="tour-preview__header--image"
            />
            <div className="tour-preview__header--heading">
              <span className="tour-preview__header--heading-span">
                {`${tour.name} Tour`}
              </span>
              <div className="tour-preview__header--bottom">
                <div className="tour-preview__header--duration">
                  <Clock className="tour-preview__header--icon" />
                  <span className="tour-preview__header--subtext">{`${tour.duration} Days`}</span>
                </div>
                <div className="tour-preview__header--duration">
                  <Pin className="tour-preview__header--icon" />
                  <span className="tour-preview__header--subtext">{`${tour.startLocation.description}`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tour-preview-description">
            <div className="tour-preview-description__left">
              <div className="tour-preview-description__left--quick-facts">
                <h3 className="tour-preview-description__left--heading">
                  QUICK FACTS
                </h3>
                <div className="tour-preview-description__left--list">
                  <div className="description__list-item">
                    <Calendar className="description__list-item--icon" />
                    <h5 className="description__list-item--title">NEXT DATE</h5>
                    <span className="description__list-item--text">{`${dateArray[1]} ${dateArray[3]}`}</span>
                  </div>
                  <div className="description__list-item">
                    <Difficulty className="description__list-item--icon" />
                    <h5 className="description__list-item--title">
                      DIFFICULTY
                    </h5>
                    <span className="description__list-item--text">{`${tour.difficulty}`}</span>
                  </div>
                  <div className="description__list-item">
                    <User className="description__list-item--icon" />
                    <h5 className="description__list-item--title">
                      PARTICIPANTS
                    </h5>
                    <span className="description__list-item--text">{`${tour.maxGroupSize} People`}</span>
                  </div>
                  <div className="description__list-item">
                    <Star className="description__list-item--icon" />
                    <h5 className="description__list-item--title">RATING</h5>
                    <span className="description__list-item--text">{`${tour.ratingsAverage} / 5`}</span>
                  </div>
                </div>
              </div>
              <div className="tour-preview-description__left--guides">
                <h3 className="tour-preview-description__left--heading">
                  YOUR TOUR GUIDES
                </h3>
                <div className="tour-preview-description__left--list">
                  {tour.guides.map((guide) => (
                    <div key={guide._id} className="description__list-item">
                      <img
                        src={`/img/users/${guide.photo}`}
                        className="description__list-item--photo"
                      />
                      <h5 className="description__list-item--title">
                        {guide.role === "lead-guide"
                          ? "LEAD GUIDE"
                          : "TOUR GUIDE"}
                      </h5>
                      <span className="description__list-item--text">{`${guide.name}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="tour-preview-description__right">
              <h3 className="tour-preview-description__left--heading">{`ABOUT ${tour.name} TOUR`}</h3>
              <p className="tour-preview-description__right--paragraph">
                {tour.description}
              </p>
            </div>
          </div>
          <div className="tour-preview-gallery">
            {tour.images.map((img) => (
              <img
                key={img}
                src={`/img/tours/${img}`}
                className="tour-preview-gallery__images"
              />
            ))}
          </div>
          <div className="tour-preview-map">
            <SectionMap locations={tour.locations} />
          </div>
          <div className="tour-preview-reviews">
            <div className="tour-preview-reviews__container">
              {tour.reviews.map((review) => (
                <div key={review._id} className="review__container">
                  <div className="review__user-details">
                    <img
                      src={`/img/users/${review.user.photo}`}
                      className="review__user-details--photo"
                    />
                    <h3 className="review__user-details--name">
                      {review.user.name}
                    </h3>
                  </div>
                  <div className="review__content">
                    <p className="review__content--text">{review.review}</p>
                  </div>
                  <div className="review__stars">
                    {star.map((num) => (
                      <Star
                        key={num}
                        className={
                          num <= review.rating
                            ? "review__stars--star green"
                            : "review__stars--star grey"
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="tour-preview__booking">
            <BookinButton tour={tour} />
          </div>
        </div>
      ) : null}
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  tour: selectTourForPreview,
  error: selectTourErrorMessage,
});

export default connect(mapStateToProps)(TourPreview);
