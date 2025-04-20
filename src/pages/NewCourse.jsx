import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../services/authService";

const initialState = {
  course_title: "",
  course_code: "",
  course_description: "",
};

const NewCourse = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [formData, setformData] = useState(initialState);

  const { course_title, course_code, course_description } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    // setIsDescEmpty(value.trim() === "");
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const newpost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("course_title", course_title);
    postData.append("course_code", course_code);
    postData.append("course_description", course_description);
    postData.append("image", postImage);

    console.log(...postData);
    console.log("clicked");

    console.log(postData);

    setIsLoading(true);
    axios
      .post(`${BACKEND_URL}/course/newcourse`, postData)
      .then(({ data }) => {
        navigate(`/courses`);
        console.log(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
        console.log(response.data.message);

        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="grid grid-cols-12 gap-2">
                <div className="px-[10px] sm:px-[100px] col-span-full xl:col-span-8  dark:bg-slate-800 rounded-lg  dark:border-slate-700">
                  <form onSubmit={newpost}>
                    <div className="mt-5">
                      <div className="form">
                        <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                          <div className="mb-3 space-y-2 w-full text-xs">
                            <label className="font-semibold text-gray-600 py-2">
                              Course Title
                            </label>
                            <input
                              placeholder="Course Title"
                              value={course_title}
                              onChange={handleInputChange}
                              type="text"
                              id="course_title"
                              name="course_title"
                              className={`w-full px-8 py-4 rounded-lg mb-2 font-medium bg-gray-100 border-2 placeholder-gray-500
                           text-sm focus:border-green-500 border-gray-200 focus:bg-white `}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <label className="font-semibold text-gray-600 py-2">
                            Course Code
                          </label>
                          <input
                            placeholder="Course Title"
                            value={course_code}
                            onChange={handleInputChange}
                            type="text"
                            id="course_code"
                            name="course_code"
                            className={`w-full px-8 py-4 rounded-lg mb-2 font-medium bg-gray-100 border-2 placeholder-gray-500
                           text-sm focus:border-green-500 border-gray-200 focus:border-gray-200 focus:bg-white `}
                            required
                          />
                        </div>
                        <div className="flex-auto w-full mb-1 text-xs space-y-2">
                          <label className="font-semibold text-gray-600 py-2">
                            Course Description
                          </label>
                          <textarea
                            value={course_description}
                            onChange={handleInputChange}
                            placeholder="Enter Post Content"
                            type="text"
                            name="course_description"
                            id="course_description"
                            className={`w-full px-8 py-4 rounded-lg mb-2 font-medium bg-gray-100 border-2 placeholder-gray-500
                        text-sm focus:border-green-500 border-gray-200 focus:border-gray-200 focus:bg-white `}
                            required
                          />
                        </div>

                        <div className="flex-auto w-full mb-1 text-xs space-y-2">
                          <label className="font-semibold text-gray-600 py-2">
                            Select an Image
                          </label>
                          <input
                            name="image"
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            className="w-full text-grey-500 text-sm
                    file:mr-5 file:rounded-full file:border-0
                    file:bg-green-50 file:py-2
                    file:px-6 file:text-sm
                    file:font-medium file:text-green-700
                    hover:file:cursor-pointer hover:file:bg-amber-50
                    hover:file:text-amber-400"
                            required
                          />
                        </div>

                        <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                          {/* SUBMIT BUTTON */}
                          {isLoading ? (
                            <button
                              disabled
                              className="mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            >
                              <svg
                                className="w-6 h-6 -ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                id="loading"
                              >
                                <path d="M6.804 15a1 1 0 0 0-1.366-.366l-1.732 1a1 1 0 0 0 1 1.732l1.732-1A1 1 0 0 0 6.804 15ZM3.706 8.366l1.732 1a1 1 0 1 0 1-1.732l-1.732-1a1 1 0 0 0-1 1.732ZM6 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm11.196-3a1 1 0 0 0 1.366.366l1.732-1a1 1 0 1 0-1-1.732l-1.732 1A1 1 0 0 0 17.196 9ZM15 6.804a1 1 0 0 0 1.366-.366l1-1.732a1 1 0 1 0-1.732-1l-1 1.732A1 1 0 0 0 15 6.804Zm5.294 8.83-1.732-1a1 1 0 1 0-1 1.732l1.732 1a1 1 0 0 0 1-1.732Zm-3.928 1.928a1 1 0 1 0-1.732 1l1 1.732a1 1 0 1 0 1.732-1ZM21 11h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm-9 7a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-3-.804a1 1 0 0 0-1.366.366l-1 1.732a1 1 0 0 0 1.732 1l1-1.732A1 1 0 0 0 9 17.196ZM12 2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path>
                              </svg>
                              <span className="ml-3">Post is Submiting </span>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="mt-5 tracking-wide font-semibold bg-green-600 text-gray-100 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            >
                              <span className="ml-3">Add New Course</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default NewCourse;
