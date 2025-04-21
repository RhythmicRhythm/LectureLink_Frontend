import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getsinglecourse } from "../redux/Slices/coursesSlice";
import art from "../images/Artwork.png";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { MdDelete } from "react-icons/md";
import empty from "../images/emptyimg.png";
import { FaUpload, FaDownload, FaRegShareSquare } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import moment from "moment";
import { useGetCourseByIdQuery } from "../redux/apis/courseApi";

const Course = () => {
  useRedirectLoggedOutUser("/signin");
  const params = useParams();
  const courseId = params.id;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { data: course, isLoading: loading } = useGetCourseByIdQuery(courseId);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getsinglecourse(courseId));
  }, []);

  const deleteBlogPost = () => {
    // Implement delete functionality
    setShowModal(false);
  };

  // Early return if loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-b-transparent border-r-transparent border-l-teal-500"></div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Loading course details...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="bg-gray-50">
          {/* Delete Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="relative mx-auto my-6 w-auto max-w-sm">
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                  <div className="flex items-start justify-between rounded-t border-b border-solid border-gray-200 p-5">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Confirm Deletion
                    </h3>
                    <button
                      className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-gray-400 outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="relative flex-auto p-6">
                    <p className="my-4 text-lg leading-relaxed text-gray-600">
                      Are you sure you want to delete this course?
                    </p>
                  </div>
                  <div className="flex items-center justify-end rounded-b border-t border-solid border-gray-200 p-6">
                    <button
                      className="mr-3 rounded-lg px-6 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-red-600"
                      type="button"
                      onClick={deleteBlogPost}
                    >
                      Delete Course
                    </button>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </div>
          )}

          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-8">
                {/* Admin Actions */}
                {user.isAdmin && (
                  <div className="mb-4 flex justify-end">
                    <button
                      className="flex items-center rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-red-600"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      <MdDelete className="mr-2" />
                      Delete Course
                    </button>
                  </div>
                )}

                {/* Course Image */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-80"
                    src={course?.image}
                    alt={course?.course_title}
                  />
                </div>

                {/* Course Header */}
                <div className="mt-6 flex flex-col justify-between border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <div className="mb-1 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">
                      {course?.course_code}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {course?.course_title}
                    </h1>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Lecturer(s):</span>{" "}
                      {course?.lecturers.length === 0 ? (
                        <span className="italic">
                          Lecturer will be assigned
                        </span>
                      ) : (
                        course?.lecturers.map((lecturer, index) => (
                          <span key={lecturer._id}>
                            {lecturer.fullname}
                            {index < course.lecturers.length - 1 ? ", " : ""}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  <button className="flex items-center rounded-lg border border-teal-300 bg-white px-4 py-2 text-sm font-medium text-teal-600 transition-all hover:bg-teal-50 hover:text-teal-700">
                    <FaRegShareSquare className="mr-2" />
                    Share Course
                  </button>
                </div>

                {/* Tabs Navigation */}
                <div className="mt-6">
                  <div className="mb-6 flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`relative mr-6 py-3 text-sm font-medium sm:text-base ${
                        activeTab === "overview"
                          ? "text-teal-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-teal-500"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("materials")}
                      className={`relative mr-6 py-3 text-sm font-medium sm:text-base ${
                        activeTab === "materials"
                          ? "text-teal-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-teal-500"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Materials
                    </button>
                    <button
                      onClick={() => setActiveTab("assignment")}
                      className={`relative py-3 text-sm font-medium sm:text-base ${
                        activeTab === "assignment"
                          ? "text-teal-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-teal-500"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Assignments
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === "overview" && (
                    <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                      <p className="whitespace-pre-wrap text-gray-600">
                        {course?.course_description.replace(
                          /<br\s*\/?>/gi,
                          "\n"
                        )}
                      </p>
                    </div>
                  )}

                  {activeTab === "materials" && (
                    <div className="pt-2">
                      {user.role === "lecturer" && (
                        <div className="mb-6 flex justify-end">
                          <Link
                            to={`/uploadfile/${course?._id}`}
                            className="flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-700"
                          >
                            <FaUpload className="mr-2" />
                            Upload Material
                          </Link>
                        </div>
                      )}

                      {course?.course_files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-10">
                          <img
                            src={empty}
                            alt="No files"
                            className="mb-4 w-48 opacity-80"
                          />
                          <p className="max-w-md text-center text-gray-500">
                            {user.role === "student"
                              ? "No materials have been assigned for this course yet."
                              : user.role === "lecturer"
                              ? "You haven't added any course materials yet. Please proceed to upload materials."
                              : ""}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {course?.course_files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-teal-200 hover:shadow-md"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                                  <img className="h-8 w-8" src={art} alt="" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">
                                    {file.file_name}
                                  </h3>
                                  <p className="text-xs text-gray-500">
                                    Added {moment(file.createdAt).fromNow()}
                                  </p>
                                </div>
                              </div>
                              <Link
                                to={file.file}
                                className="flex items-center rounded-lg bg-teal-100 px-3 py-2 text-xs font-medium text-teal-700 transition-all hover:bg-teal-200"
                              >
                                <FaDownload className="mr-1" />
                                Download
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "assignment" && (
                    <div className="pt-2">
                      {user.role === "student" && (
                        <div className="mb-6 flex justify-end">
                          <Link
                            to={`/assignment/${course?._id}`}
                            className="flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-700"
                          >
                            <CiCirclePlus className="mr-2 text-lg" />
                            Submit Assignment
                          </Link>
                        </div>
                      )}

                      {course?.assignments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-10">
                          <img
                            src={empty}
                            alt="No assignments"
                            className="mb-4 w-48 opacity-80"
                          />
                          <p className="max-w-md text-center text-gray-500">
                            {user.role === "student"
                              ? "No assignments have been assigned for this course yet."
                              : user.role === "lecturer"
                              ? "You haven't added any assignments yet. Please proceed to upload assignments."
                              : ""}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {course?.assignments.map((assignment, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-teal-200 hover:shadow-md"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                                  <img className="h-8 w-8" src={art} alt="" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">
                                    {assignment.title}
                                  </h3>
                                  <p className="text-xs text-gray-500">
                                    Due:{" "}
                                    {moment(assignment.deadline).format(
                                      "MMMM Do, YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                              <Link
                                to={assignment.file}
                                className="flex items-center rounded-lg bg-teal-100 px-3 py-2 text-xs font-medium text-teal-700 transition-all hover:bg-teal-200"
                              >
                                <FaDownload className="mr-1" />
                                Download
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar - could be used for course details, announcements, etc. */}
              <div className="lg:col-span-4 ">
                <div className="rounded-xl bg-white p-6 shadow-md sticky">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Course Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <span className="text-sm font-medium text-gray-500">
                        Course Code
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {course?.course_code}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <span className="text-sm font-medium text-gray-500">
                        Department
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {course?.department || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <span className="text-sm font-medium text-gray-500">
                        Credit Hours
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {course?.credit_hours || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-sm font-medium text-gray-500">
                        Semester
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {course?.semester || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Course;
