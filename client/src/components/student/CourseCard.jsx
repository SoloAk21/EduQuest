import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const { currency, calculateRating } = useContext(AppContext);

  // Calculate discounted price
  const discountedPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg hover:shadow-md transition-shadow duration-300"
    >
      {/* Course Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full h-48 object-cover"
      />

      {/* Course Details */}
      <div className="p-3 text-left">
        {/* Course Title */}
        <h3 className="text-base font-semibold text-gray-800">
          {course.courseTitle}
        </h3>

        {console.log(course)}
        {/* Educator Name */}
        <p className="text-gray-500 text-sm">
          SoloAk
          {/* {course.educator.name} */}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center   space-x-2">
          {/* Rating */}
          <p className="text-sm font-medium text-gray-800">
            {calculateRating(course)}
          </p>

          {/* Stars */}

          <div className="flex items-center  space-x-1 ">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
                className="w-3.5 h-3.5"
              />
            ))}
          </div>

          {/* Number of Reviews */}
          <p className="text-gray-500 text-sm">
            ({course.courseRatings.length})
          </p>
        </div>

        {/* Price */}
        <p className="text-base font-semibold text-gray-800 ">
          {currency} {discountedPrice}
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
