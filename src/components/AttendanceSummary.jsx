import React from 'react';

export default function AttendanceSummary() {
  const attendanceData = [
    { course: 'MUS101', percent: 90, color: 'green' },
    { course: 'MUS202', percent: 100, color: 'green' },
    { course: 'MUS207', percent: 85, color: 'yellow' },
    { course: 'MUS401', percent: 80, color: 'yellow' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Attendance Summary</h2>
      <div className="space-y-3">
        {attendanceData.map((item, index) => (
          <div key={index} className="relative pt-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{item.course}</span>
              <span className="text-sm font-medium text-gray-700">{item.percent}%</span>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${item.percent}%` }} 
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${item.color}-500`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}