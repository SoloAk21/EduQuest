import React, { useState } from "react";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";

function SearchBar({ data }) {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/course-list/${input}`); // Update URL with search input
    } else {
      navigate("/course-list"); // If input is empty, navigate to the course list without search
    }
  };

  return (
    <div>
      <form
        onSubmit={onSearchHandler}
        className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
      >
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="md:w-auto w-10 px-3"
        />
        <input
          type="text"
          placeholder="Search for courses"
          className="w-full md:min-w-64 lg:min-w-96 outline-none text-gray-500/80"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
