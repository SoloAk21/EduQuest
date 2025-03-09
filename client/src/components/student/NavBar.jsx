import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import AppContext from "../../context/AppContext.jsx";

function NavBar() {
  const { navigate, isEducator } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 sm:px-10 md:px-14 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate("/educator")}>
            {isEducator ? "Educator Dashboard" : "Become Educator"}
          </button>{" "}
          |<Link to="/my-enrollment">My Enrollments</Link>
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-5 py-2 rounded-full "
            >
              Create Account
            </button>
          )}
        </div>
      </div>
      {/* for phone screens */}
      <div className=" flex md:hidden  gap-3">
        {user && (
          <span className="flex items-center gap-3">
            <button onClick={() => navigate("/educator")}>
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            | <Link to="/my-enrollment">My Enrollments</Link>
          </span>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="md:hidden">
            <img src={assets.user_icon} alt="user" />
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
