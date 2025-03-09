import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets"; // Use the dummy data to test
import Loading from "../../components/student/Loading";

function StatCard({ icon, value, label }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-lg  border border-blue-500/20 hover:border-blue-500 transition-all duration-300">
      {/* Icon */}
      <div className="p-3 bg-blue-100 rounded-full">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>

      {/* Content */}
      <div>
        <p className="text-3xl font-semibold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 p-6 md:p-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Enrolments */}
        <StatCard
          icon={assets.patients_icon}
          value={dashboardData.enrolledStudentsData.length}
          label="Total Enrolments"
        />

        {/* Total Courses */}
        <StatCard
          icon={assets.patients_icon}
          value={dashboardData.totalCourses}
          label="Total Courses"
        />

        {/* Total Earnings */}
        <StatCard
          icon={assets.patients_icon}
          value={`${currency} ${dashboardData.totalEarnings.toFixed(2)}`}
          label="Total Earnings"
        />
      </div>

      {/* Latest Enrolments Table */}
      <div className="w-full bg-white p-4 rounded-lg  border border-gray-200">
        <h2 className="pb-4 text-2xl font-medium text-gray-800">
          Latest Enrolments
        </h2>
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full table-auto text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold text-left hidden sm:table-cell">
                  #
                </th>
                <th className="px-4 py-3 font-semibold text-left">
                  Student Name
                </th>
                <th className="px-4 py-3 font-semibold text-left">
                  Course Title
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {index + 1}
                  </td>
                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    <img
                      src={item.student.imageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="truncate">{item.student.name}</span>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
