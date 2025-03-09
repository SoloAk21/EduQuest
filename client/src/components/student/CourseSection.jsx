import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard.jsx";
import AppContext from "../../context/AppContext.jsx";

function CourseSection() {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      {/* Section Title */}
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      {/* Section Description */}
      <p className="md:text-base text-sm text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {/* Show All Courses Button */}
      <div className="flex justify-center">
        <Link
          to="/course-list"
          className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
}

export default CourseSection;
