"use client";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  color: string;
}

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  isToday: (date: Date) => boolean;
}

export function MonthView({ currentDate, events, isToday }: MonthViewProps) {
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateStr);
  };

  const days = getCalendarDays();

  return (
    <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-xs font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isTodayDate = isToday(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <div
              key={index}
              className={`h-[80px] border-r border-b border-gray-100 p-1.5 ${
                !isCurrentMonth ? "bg-gray-50/50" : "bg-white"
              } ${index % 7 === 6 ? "border-r-0" : ""} ${
                index >= 35 ? "border-b-0" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs ${
                    isTodayDate
                      ? "bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center font-semibold"
                      : isCurrentMonth
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {day.getDate()}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} px-1.5 py-0.5 rounded text-[10px] font-medium truncate cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[9px] text-gray-500 px-1.5">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
