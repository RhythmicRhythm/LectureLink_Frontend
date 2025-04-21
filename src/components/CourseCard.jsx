import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiBookOpenLine,
  RiUserLine,
  RiMoreFill,
  RiBookmarkLine,
  RiBookmarkFill,
} from "react-icons/ri";

export default function CourseCard({
  id,
  code,
  title,
  description,
  professor,
  modules,
  students,
  bookmarked: initialBookmarked,
  status,
  image,
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img
          className="w-full h-40 object-cover"
          src={image || "/course-default.jpg"}
          alt={title}
          onError={(e) => {
            e.target.src = "/course-default.jpg";
          }}
        />
        <button
          onClick={toggleBookmark}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          {bookmarked ? (
            <RiBookmarkFill className="text-indigo-600" size={16} />
          ) : (
            <RiBookmarkLine className="text-gray-400" size={16} />
          )}
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between mb-2">
          <span className="text-indigo-600 font-semibold">{code}</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {status}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {title} {id}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <img 
              className="h-8 w-8 rounded-full object-cover" 
              src={`/professor-${professor.split(' ')[1].toLowerCase()}.jpg`} 
              alt={professor}
              onError={(e) => {
                e.target.src = '/professor-default.jpg';
              }}
            /> */}
            <span className="ml-2 text-sm text-gray-600">{professor} </span>
          </div>

          <div className="flex space-x-2">
            <span className="text-gray-500 text-sm flex items-center">
              <RiBookOpenLine className="mr-1" /> {modules}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <RiUserLine className="mr-1" /> {students}
            </span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Link
            to={`/courses/${id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm flex-1"
          >
            Go to Course
          </Link>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm">
            <RiMoreFill size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
