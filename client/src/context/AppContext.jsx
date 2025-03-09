import { createContext, useState, useContext, useEffect } from "react";
import { dummyCourses, dummyTestimonial } from "../assets/assets";
import humanizeDuration from "humanize-duration";
// Create Context
const AppContext = createContext();

// Custom Hook for using Context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    fetchCourses();
    fetchTestimonials();
    fetchUserEnrolledCourse();
  }, []);

  const fetchCourses = async () => {
    setAllCourses(dummyCourses);
  };
  const fetchTestimonials = async () => {
    setAllTestimonials(dummyTestimonial);
  };

  const calculateRating = (course) => {
    if (!course || !course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = course.courseRatings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );
    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
    return humanizeDuration(time * 60 * 100, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) => {
      time += calculateChapterTime(chapter);
    });
    return humanizeDuration(time * 60 * 100, { units: ["h", "m"] });
  };

  const calculateNumberOfLectures = (course) => {
    let lectures = 0;
    course.courseContent.forEach((chapter) => {
      lectures += chapter.chapterContent.length;
    });
    return lectures;
  };

  const fetchUserEnrolledCourse = (course) => {
    // implement logic to fetch user enrolled course\
    setEnrolledCourses(dummyCourses);
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    allCourses,
    allTestimonials,
    currency,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNumberOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,
    setEnrolledCourses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
