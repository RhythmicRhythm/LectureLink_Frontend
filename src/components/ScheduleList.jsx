import React from 'react';
import { RiTimeLine } from 'react-icons/ri';

export default function ScheduleList() {
  const scheduleItems = [
    {
      time: '09:00',
      endTime: '10:30',
      title: 'MUS101: Introduction to Music Theory',
      location: 'Room: Music Hall 103 • Dr. Johnson',
      status: 'In 45 min',
      statusColor: 'yellow'
    },
    {
      time: '13:00',
      endTime: '14:30',
      title: 'MUS202: Music History: Baroque to Modern',
      location: 'Room: Music Hall 205 • Prof. Garcia',
      status: 'Later today',
      statusColor: 'gray'
    },
    {
      time: '15:00',
      endTime: '16:30',
      title: 'MUS207: Jazz Improvisation Workshop',
      location: 'Room: Music Hall 112 • Prof. Wilson',
      status: 'Evening',
      statusColor: 'blue'
    }
  ];

  const getStatusColorClasses = (color) => {
    const colors = {
      yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-800'
      },
      gray: {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-700'
      },
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-800'
      }
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View full schedule
        </button>
      </div>
      
      <div className="space-y-3">
        {scheduleItems.map((item, index) => {
          const colorClasses = getStatusColorClasses(item.statusColor);
          
          return (
            <div 
              key={index} 
              className={`flex items-center p-3 ${colorClasses.bg} rounded-lg hover:shadow-sm transition-shadow`}
            >
              <div className="flex-shrink-0 mr-4">
                <RiTimeLine className={`text-xl ${colorClasses.text}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <p className={`font-semibold ${colorClasses.text} mr-2`}>
                    {item.time} - {item.endTime}
                  </p>
                </div>
                <h4 className="font-semibold text-gray-800 truncate">{item.title}</h4>
                <p className="text-gray-600 text-sm truncate">{item.location}</p>
              </div>
              
              <div className="ml-2 flex-shrink-0">
                <span className={`${colorClasses.badge} text-xs px-2 py-1 rounded whitespace-nowrap`}>
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}