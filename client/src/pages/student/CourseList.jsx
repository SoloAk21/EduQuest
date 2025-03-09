import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate
import AppContext from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar"; // Import the SearchBar component
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";

export default function CourseList() {
  const { allCourses } = useContext(AppContext); // Access allCourses from context
  const { input } = useParams(); // Get search input from URL params
  const navigate = useNavigate(); // Use navigate to update the URL
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses

  // Filter courses based on search input
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice(); // Create a copy of allCourses
      if (input) {
        // Filter courses by course title
        setFilteredCourses(
          tempCourses.filter((item) =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        // If no input, show all courses
        setFilteredCourses(tempCourses);
      }
    }
  }, [allCourses, input]);

  // Function to clear the search input
  const clearSearch = () => {
    navigate("/course-list"); // Navigate to the course list without search input
  };

  return (
    <div className="relative md:px-36 px-8 pt-20 text-left">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
          <p className="text-gray-500">
            <Link to="/">
              {" "}
              <span className="text-blue-600 cursor-pointer">Home</span> /{" "}
            </Link>
            <span>Course List</span>
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar data={input} />
      </div>

      {/* Display search term and clear button */}
      {input && (
        <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
          <p>{input}</p>
          <img
            className="cursor-pointer"
            src={assets.cross_icon}
            alt="Clear search"
            onClick={clearSearch} // Clear search on click
          />
        </div>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
}
