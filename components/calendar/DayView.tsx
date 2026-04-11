"use client";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  color: string;
}

interface DayViewProps {
  currentDate: Date;
  events: Event[];
}

export function DayView({ currentDate, events }: DayViewProps) {
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateStr);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = getEventsForDate(currentDate);

  return (
    <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
      {/* Day Header */}
      <div className="border-b border-gray-200 bg-gray-50 p-2">
        <div className="text-center">
          <div className="text-xs text-gray-600">
            {currentDate.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
          <div className="text-xs font-semibold text-gray-900 mt-1">
            {currentDate.getDate()}
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="h-[480px] overflow-y-auto">
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter((e) => {
            const eventHour = parseInt(e.time.split(":")[0]);
            const isPM = e.time.includes("PM");
            const hour24 = isPM && eventHour !== 12 ? eventHour + 12 : eventHour;
            return hour24 === hour;
          });

          return (
            <div
              key={hour}
              className="grid grid-cols-[80px_1fr] border-b border-gray-100"
            >
              <div className="p-1.5 text-[10px] text-gray-500 text-right pr-3 border-r border-gray-100">
                {hour === 0
                  ? "12:00 AM"
                  : hour < 12
                  ? `${hour}:00 AM`
                  : hour === 12
                  ? "12:00 PM"
                  : `${hour - 12}:00 PM`}
              </div>
              <div className="h-[60px] p-1.5">
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} px-1.5 py-0.5 rounded mb-0.5 cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    <div className="font-semibold text-[10px]">{event.title}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
