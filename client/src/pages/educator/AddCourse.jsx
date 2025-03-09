import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import { assets } from "../../assets/assets";

function AddCourse() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    courseTitle: "",
    coursePrice: 0,
    discount: 0,
    image: null,
    chapters: [],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  const [error, setError] = useState(""); // State to manage error messages

  // Initialize Quill editor
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // Auto-dismiss after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error on input change
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // Add a new chapter
  const addChapter = () => {
    if (
      formData.chapters.length > 0 &&
      formData.chapters[formData.chapters.length - 1].chapterContent.length ===
        0
    ) {
      setError("Please add at least one lecture to the previous chapter.");
      return;
    }

    const newChapter = {
      chapterId: `chapter-${formData.chapters.length + 1}`,
      chapterTitle: `Chapter ${formData.chapters.length + 1}`,
      chapterContent: [],
      collapsed: false,
    };
    setFormData({ ...formData, chapters: [...formData.chapters, newChapter] });
    setError(""); // Clear error after adding chapter
  };

  // Toggle chapter collapse
  const toggleChapterCollapse = (chapterId) => {
    setFormData({
      ...formData,
      chapters: formData.chapters.map((chapter) =>
        chapter.chapterId === chapterId
          ? { ...chapter, collapsed: !chapter.collapsed }
          : chapter
      ),
    });
  };

  // Delete a chapter
  const deleteChapter = (chapterId) => {
    setConfirmationAction(() => () => {
      setFormData({
        ...formData,
        chapters: formData.chapters.filter(
          (chapter) => chapter.chapterId !== chapterId
        ),
      });
      setShowConfirmation(false);
    });
    setConfirmationData({ chapterId });
    setShowConfirmation(true);
  };

  // Add a lecture to a chapter
  const addLecture = (chapterId) => {
    setCurrentChapterId(chapterId);
    setShowPopup(true);
  };

  // Delete a lecture
  const deleteLecture = (chapterId, lectureIndex) => {
    setConfirmationAction(() => () => {
      const updatedChapters = formData.chapters.map((chapter) =>
        chapter.chapterId === chapterId
          ? {
              ...chapter,
              chapterContent: chapter.chapterContent.filter(
                (_, index) => index !== lectureIndex
              ),
            }
          : chapter
      );
      setFormData({ ...formData, chapters: updatedChapters });
      setShowConfirmation(false);
    });
    setConfirmationData({ chapterId, lectureIndex });
    setShowConfirmation(true);
  };

  // Handle lecture submission
  const handleLectureSubmit = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration) {
      setError("Please fill in all lecture details.");
      return;
    }

    const updatedChapters = formData.chapters.map((chapter) =>
      chapter.chapterId === currentChapterId
        ? {
            ...chapter,
            chapterContent: [...chapter.chapterContent, lectureDetails],
          }
        : chapter
    );

    setFormData({ ...formData, chapters: updatedChapters });
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setError(""); // Clear error after successful submission
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courseTitle || !formData.coursePrice || !formData.image) {
      setError("Please fill in all required fields.");
      return;
    }
    console.log("Form Data:", formData);
    setError(""); // Clear error after successful submission
    alert("Course added successfully!");
  };

  return (
    <div className="h-screen overflow-y-auto flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0 bg-gray-50">
      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <div className="animate-slide-in-right bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-lg flex items-center">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        {/* Course Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            placeholder="Enter course title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Course Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Description
          </label>
          <div
            ref={editorRef}
            className="w-full min-h-[200px] border border-gray-300 rounded-md bg-white"
          ></div>
        </div>

        {/* Course Price and Thumbnail */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Price ($)
            </label>
            <input
              type="number"
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Thumbnail
            </label>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="p-3 bg-blue-500 rounded-md">
                <img
                  src={assets.file_upload_icon}
                  alt="Upload"
                  className="w-6"
                />
              </div>
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Thumbnail Preview"
                  className="max-h-10 rounded-md"
                />
              ) : (
                <span className="text-gray-500">Upload Image</span>
              )}
            </label>
            <input
              type="file"
              id="thumbnailImage"
              onChange={handleImageUpload}
              accept="image/*"
              hidden
            />
          </div>
        </div>

        {/* Discount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            placeholder="0"
            min={0}
            max={100}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Chapters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Chapters</h2>
          {formData.chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.chapterId}
              className="bg-white border rounded-lg mb-4 shadow-sm"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    alt="Toggle"
                    className={`mr-2 cursor-pointer transition-transform ${
                      chapter.collapsed ? "-rotate-90" : ""
                    }`}
                    onClick={() => toggleChapterCollapse(chapter.chapterId)}
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  alt="Delete"
                  className="cursor-pointer"
                  onClick={() => deleteChapter(chapter.chapterId)}
                />
              </div>

              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt="Delete"
                        className="cursor-pointer"
                        onClick={() =>
                          deleteLecture(chapter.chapterId, lectureIndex)
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addLecture(chapter.chapterId)}
                    className="w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-md mt-2 hover:bg-blue-200"
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addChapter}
            className="w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-200"
          >
            + Add Chapter
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          ADD COURSE
        </button>
      </form>

      {/* Lecture Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecture Title
                </label>
                <input
                  type="text"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecture Duration (mins)
                </label>
                <input
                  type="number"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecture URL
                </label>
                <input
                  type="url"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Free Preview</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLectureSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-6">
              This action cannot be undone. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmationAction}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
