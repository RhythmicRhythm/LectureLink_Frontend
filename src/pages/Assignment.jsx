import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useNavigate, useParams } from "react-router-dom";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { ImSpinner10 } from "react-icons/im";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../services/authService";

const initialState = {
  title: "",
  deadline: "",
};

const Assignment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;

  const [isLoading, setIsLoading] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [formData, setformData] = useState(initialState);

  const { title, deadline } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    // setIsDescEmpty(value.trim() === "");
  };

  const handleFileChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const newpost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title", title);
    postData.append("deadline", deadline);

    postData.append("image", postImage);

    console.log(...postData);
    console.log("clicked");

    console.log(postData);

    setIsLoading(true);
    axios
      .post(`${BACKEND_URL}/course/addassignment/${courseId}`, postData)
      .then(({ data }) => {
       
        navigate(`/courses/${courseId}`);
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
                              Title
                            </label>
                            <input
                              placeholder="Title"
                              value={title}
                              onChange={handleInputChange}
                              type="text"
                              id="title"
                              name="title"
                              className={`w-full px-8 py-4 rounded-lg mb-2 font-medium bg-gray-100 border-2 placeholder-gray-500
                           text-sm focus:border-green-500 border-gray-200 focus:bg-white `}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <label className="font-semibold text-gray-600 py-2">
                            Deadline
                          </label>
                          <input
                            placeholder="Deadline"
                            value={deadline}
                            onChange={handleInputChange}
                            type="date"
                            id="deadline"
                            name="deadline"
                            className={`w-full px-8 py-4 rounded-lg mb-2 font-medium bg-gray-100 border-2 placeholder-gray-500
                           text-sm focus:border-green-500 border-gray-200 focus:bg-white `}
                            required
                          />
                        </div>
                      

                        <div className="flex-auto w-full mb-1 text-xs space-y-2">
                          <label className="font-semibold text-gray-600 py-2">
                            Select an File
                          </label>
                          <input
                            name="assignment"
                            type="file"
                            id="assignment"
                            onChange={handleFileChange}
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
                          <button
                            disabled={isLoading}
                            type="submit"
                            className="cursor-pointer flex gap-1 items-center justify-center
                      px-8 py-4 bg-green-300 text-green-700 border-2 hover:border-green-500 
                       rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md text-sm sm:text-lg"
                          >
                            {isLoading ? (
                              <>
                                {" "}
                                <ImSpinner10 className="animate-spin" />
                                <span>loading...</span>
                              </>
                            ) : (
                              <>
                                <BsFileEarmarkPlusFill />
                                <span>Add Assignment</span>
                              </>
                            )}
                          </button>
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

export default Assignment;
