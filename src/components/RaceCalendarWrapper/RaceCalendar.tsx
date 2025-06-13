"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

// type
export type RaceCalendarProps = {
  startDate: string;
};

type DateItem = {
  day: number;
  name: string;
  fullDate: Date;
};

type Race = {
  day: number;
  type: string | string[];
};

const RaceCalendar: React.FC<RaceCalendarProps> = ({ startDate }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const trans = useTranslations("raceCalendar");
  const locale = useLocale();

  const baseDate = new Date(startDate);
  baseDate.setDate(baseDate.getDate() + weekOffset * 7);

  const generateWeekDates = (start: Date): DateItem[] => {
    const days = [
      trans("days.0"),
      trans("days.1"),
      trans("days.2"),
      trans("days.3"),
      trans("days.4"),
      trans("days.5"),
      trans("days.6"),
    ];
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return {
        day: date.getDate(),
        name: days[date.getDay()],
        fullDate: date,
      };
    });
  };

  const visibleDates = generateWeekDates(baseDate);

  const races: Race[] = [
    { day: visibleDates[0].day, type: "regular" },
    { day: visibleDates[2].day, type: "regular" },
    { day: visibleDates[4].day, type: ["regular", "featured", "special"] },
  ];

  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);
  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);

  const currentMonth = visibleDates[0].fullDate.toLocaleString(
    `${locale === "ar" ? "ar-EG" : "en-US"}`,
    {
      month: "long",
    }
  );
  const currentYear = visibleDates[0].fullDate.getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-9 sm:grid-cols-8">
        {/* Sidebar */}
        <div className="col-span-2 sm:col-span-1 flex flex-col justify-between items-center gap-6 pb-4 border-l border-gray-100">
          <div className="text-center mt-3">
            <div className="w-full text-lg sm:text-[22px] font-bold text-black border-b border-gray-300">
              {currentYear}
              <span className="block text-2xl sm:text-[36px] pb-4 md:pb-8">
                {currentMonth}
              </span>
            </div>
            <div className="flex gap-2 mt-10">
              <button onClick={handlePrevWeek}>
                <Image
                  src="/icons/right-arrow-circle.svg"
                  alt="prev"
                  width={24}
                  height={24}
                  className="w-8 h-8 ltr:rotate-180"
                />
              </button>
              <button onClick={handleNextWeek}>
                <Image
                  src="/icons/right-arrow-circle.svg"
                  alt="next"
                  width={24}
                  height={24}
                  className="w-8 h-8 rotate-180 ltr:rotate-0"
                />
              </button>
            </div>
          </div>
          <h3 className="text-xl font-bold text-primary text-center">
            {trans("eventsTitle")}
          </h3>
        </div>

        {/* Days & Events */}
        {visibleDates.map((date, index) => {
          const raceDay = races.find((r) => r.day === date.day);
          return (
            <div
              key={`${date.day}-${index}`}
              className={`border-l border-gray-100 py-3 text-center ${
                date.day === 28 ? "bg-yellow-50" : "bg-white"
              }`}
            >
              <div className="text-2xl sm:text-5xl font-bold text-primary">
                {date.day}
              </div>
              <div className="text-[21px] text-primary border-b border-gray-300 pb-3 hidden sm:block">
                {date.name}
              </div>

              {raceDay && (
                <div className="mt-4 flex flex-col items-center gap-1.5">
                  {Array.isArray(raceDay.type) ? (
                    raceDay.type.map((type, idx) => {
                      const isFeatured = type === "featured";
                      return (
                        <div
                          key={idx}
                          onClick={() => setShowDetails((prev) => !prev)}
                          className={`w-6 h-6 rounded-full bg-white border-[6px] cursor-pointer ${
                            isFeatured
                              ? "border-[#FFBF00] relative"
                              : "border-[#008062]"
                          }`}
                        >
                          {isFeatured && showDetails && (
                            <div className="absolute z-10 p-4 bg-white border border-gray-100 rounded-lg shadow-sm text-right w-[320px] top-5 ltr:-right-20 rtl:-left-20 ">
                              <Image
                                src="/icons/X.svg"
                                alt="close"
                                width={18}
                                height={18}
                                className="absolute end-5 top-5 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDetails(false);
                                }}
                              />
                              <div className="mb-2 text-start">
                                <h4 className="text-[27px] font-bold text-primary">
                                  {trans("raceDetails.title")}
                                </h4>
                                <span className="text-primary text-lg">
                                  {trans("raceDetails.category")}
                                </span>
                              </div>
                              <div className="text-sm text-gray-700 space-y-1 mb-3">
                                <div className="flex justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    📅 <span>{trans("raceDetails.date")}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    ⏰ <span>{trans("raceDetails.time")}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-end">
                                  <div className="space-y-1 text-primary text-sm text-start">
                                    <div>{trans("raceDetails.distance")}</div>
                                    <div>{trans("raceDetails.type")}</div>
                                    <div>{trans("raceDetails.age")}</div>
                                    <div>{trans("raceDetails.prize")}</div>
                                  </div>
                                  <button className="flex items-center gap-1 bg-[#FFBF00] text-sm font-bold py-1 px-2 rounded-full text-black">
                                    {trans("raceDetails.button")}
                                    <Image
                                      src="/arrowLeftMedium.svg"
                                      alt="next"
                                      width={10}
                                      height={10}
                                      className="ltr:rotate-180 relative mt-1"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white border-[6px] border-[#008062]" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RaceCalendar;
