import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { assets } from "../../assets/assets";
import YouTube from "react-youtube";
import Rating from "../../components/student/Rating";

function Player() {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const foundCourse = enrolledCourses.find(
      (course) => course._id === courseId
    );

    setCourseData(foundCourse || null);
  }, [enrolledCourses, courseId]);

  const toggleSection = (sectionId) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
  };

  const handleRatingChange = (newRating) => {
    console.log("New rating for the course:", newRating); // Handle rating change here (e.g., send it to an API)
  };

  if (!courseData) {
    return <div className="text-center py-10">Loading course data...</div>;
  }

  // Improved Video ID Extraction (Supports Various YouTube URL Formats)
  const getVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const {
    courseTitle = "Untitled Course",
    courseThumbnail = "",
    courseContent = [],
  } = courseData || {};

  return (
    <div>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* Left Column - Course Structure */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {courseContent.length > 0 ? (
              courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((content, idx) => (
                        <li key={idx} className="flex items-start gap-2 py-1">
                          <img
                            src={
                              content.isCompleted
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{content.lectureTitle}</p>
                            <div className="flex gap-2">
                              {content.lectureUrl && (
                                <div
                                  onClick={() => {
                                    const videoId = getVideoId(
                                      content.lectureUrl
                                    );
                                    if (videoId) {
                                      setPlayerData({ videoId, content });
                                    } else {
                                      console.error("Invalid YouTube URL");
                                    }
                                  }}
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Watch
                                </div>
                              )}
                              <p>
                                {humanizeDuration(
                                  (content.lectureDuration || 0) * 60 * 1000,
                                  {
                                    units: ["h", "m"],
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No content available for this course.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 py-3 mt-10">
            <h1 className="text-xl font-bold ">Rate this course: </h1>
            <Rating initialRating={1} onRating={handleRatingChange} />
          </div>
        </div>

        {/* Right Column - Video Player */}
        <div>
          {playerData ? (
            <div className="md:mt-10">
              <YouTube
                videoId={playerData.videoId}
                opts={{
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                iframeClassName="w-full aspect-video"
              />

              <div className="flex justify-between items-center mt-1">
                {/* Display chapterOrder properly */}
                <p>
                  {courseContent.length > 0 &&
                  playerData.content?.lectureOrder ? (
                    <>
                      {
                        courseContent.find((chapter) =>
                          chapter.chapterContent.some(
                            (content) =>
                              content.lectureId === playerData.content.lectureId
                          )
                        )?.chapterOrder
                      }
                      .{playerData.content?.lectureOrder} -{" "}
                      {playerData.content.lectureTitle}
                    </>
                  ) : (
                    "No lecture data available"
                  )}
                </p>
                <button className="text-blue-600">
                  {playerData.content?.isPreviewFree
                    ? "Completed"
                    : "Mark as completed"}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseThumbnail} alt="Course Thumbnail" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Player;
