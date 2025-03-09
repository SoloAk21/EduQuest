import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Line } from "rc-progress";
const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 5, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 8 },
    { lectureCompleted: 7, totalLectures: 12 },
    { lectureCompleted: 6, totalLectures: 6 },
    { lectureCompleted: 9, totalLectures: 15 },
    { lectureCompleted: 6, totalLectures: 10 },
    { lectureCompleted: 8, totalLectures: 14 },
    { lectureCompleted: 10, totalLectures: 20 },
    { lectureCompleted: 1, totalLectures: 5 },
  ]);

  return (
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>
      <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
          <tr>
            <th className="px-4 py-3 font-semibold truncate">Course</th>
            <th className="px-4 py-3 font-semibold truncate">Duration</th>
            <th className="px-4 py-3 font-semibold truncate">Completed</th>
            <th className="px-4 py-3 font-semibold truncate">Status</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {enrolledCourses.map((course, index) => (
            <tr key={index} className="border-b border-gray-500/20">
              {console.log("Enrolled courses: ", course)}
              <td className="md: pl-2 md:pl-4  py-3 flex items-center space-x-3">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-14 sm:w-24 md:w-32"
                />
                <div className="flex-1">
                  <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                  <Line
                    strokeWidth={2}
                    percent={
                      progressArray[index].totalLectures > 0
                        ? (progressArray[index].lectureCompleted * 100) /
                          progressArray[index].totalLectures
                        : 0
                    }
                    className="bg-gray-300 rounded-full"
                  />
                </div>
              </td>
              <td className="px-4 py-3 max-sm:hidden">
                {calculateCourseDuration(course)}
              </td>
              <td className="px-4 py-3  max-sm:hidden">
                {`${progressArray[index].lectureCompleted} /
                  ${progressArray[index].totalLectures} `}
                <span>Lectures</span>
              </td>
              <td className="px-4 py-3 max-sm:text-right">
                <button
                  onClick={() => navigate(`/player/${course._id}`)}
                  className={`px-3 sm:px-5 py-2 border max-sm:text-xs ${
                    progressArray[index] &&
                    progressArray[index].lectureCompleted ===
                      progressArray[index].totalLectures
                      ? "bg-green-500 text-white " // Completed (Green)
                      : "  border-gray-500/30" // Ongoing (Yellow)
                  }`}
                >
                  {progressArray[index] &&
                  progressArray[index].lectureCompleted ===
                    progressArray[index].totalLectures
                    ? "Completed"
                    : "Ongoing"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyEnrollments;
