import React from 'react';
import { RiBookOpenLine } from 'react-icons/ri';

export default function AssignmentsList() {
  const assignments = [
    { 
      title: 'Harmony Analysis', 
      course: 'MUS101', 
      dueDate: 'Apr 22', 
      daysLeft: '2d', 
      color: 'red' 
    },
    { 
      title: 'Mozart Essay', 
      course: 'MUS202', 
      dueDate: 'Apr 25', 
      daysLeft: '5d', 
      color: 'orange' 
    },
    { 
      title: 'Jazz Performance', 
      course: 'MUS207', 
      dueDate: 'Apr 30', 
      daysLeft: '10d', 
      color: 'green' 
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Assignments</h2>
      <div className="space-y-3">
        {assignments.map((assignment, index) => (
          <div key={index} className="flex items-center">
            <div className={`h-10 w-10 rounded-lg bg-${assignment.color}-100 flex items-center justify-center text-${assignment.color}-500 mr-3`}>
              <RiBookOpenLine size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{assignment.title}</h4>
              <p className="text-gray-500 text-sm">
                {assignment.course} • Due {assignment.dueDate}
              </p>
            </div>
            <div>
              <span className={`bg-${assignment.color}-100 text-${assignment.color}-700 text-xs px-2 py-1 rounded`}>
                {assignment.daysLeft} left
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View all assignments
        </a>
      </div>
    </div>
  );
}