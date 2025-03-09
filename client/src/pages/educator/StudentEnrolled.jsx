import React, { useState, useEffect } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";

function StudentEnrolled() {
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setEnrolledStudents(dummyStudentEnrolled);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">Enrolled Students</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">#</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Student Name
                </th>
                <th className="px-4 py-3 font-semibold truncate">
                  Course Title
                </th>
                <th className="px-4 py-3 font-semibold truncate">
                  Purchase Date
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {enrolledStudents.map((enrollment, index) => (
                <tr
                  key={enrollment.student._id + index}
                  className="border-b border-gray-500/20"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={enrollment.student.imageUrl}
                      alt="Student Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{enrollment.student.name}</span>
                  </td>
                  <td className="px-4 py-3 truncate">
                    {enrollment.courseTitle}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(enrollment.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentEnrolled;
