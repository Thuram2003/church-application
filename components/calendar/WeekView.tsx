"use client";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  color: string;
}

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  isToday: (date: Date) => boolean;
}

export function WeekView({ currentDate, events, isToday }: WeekViewProps) {
  const getWeekDays = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateStr);
  };

  const weekDays = getWeekDays();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
      {/* Day Headers */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200 bg-gray-50">
        <div className="p-2"></div>
        {weekDays.map((day, index) => {
          const isTodayDate = isToday(day);
          return (
            <div
              key={index}
              className="p-2 text-center border-l border-gray-200"
            >
              <div className="text-xs text-gray-600">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div
                className={`text-xs font-semibold mt-1 ${
                  isTodayDate
                    ? "bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center mx-auto"
                    : "text-gray-900"
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <div className="h-[480px] overflow-y-auto">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-100"
          >
            <div className="p-1.5 text-[10px] text-gray-500 text-right pr-2">
              {hour === 0
                ? "12 AM"
                : hour < 12
                ? `${hour} AM`
                : hour === 12
                ? "12 PM"
                : `${hour - 12} PM`}
            </div>
            {weekDays.map((day, dayIndex) => {
              const dayEvents = getEventsForDate(day).filter((e) => {
                const eventHour = parseInt(e.time.split(":")[0]);
                const isPM = e.time.includes("PM");
                const hour24 =
                  isPM && eventHour !== 12 ? eventHour + 12 : eventHour;
                return hour24 === hour;
              });

              return (
                <div
                  key={dayIndex}
                  className="h-[60px] border-l border-gray-100 p-1 relative"
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`${event.color} px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      <div className="font-semibold truncate">{event.title}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
