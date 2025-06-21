"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export type RaceCalendarProps = {
  startDate: string;
};

type DateItem = {
  day: number;
  name: string;
  fullDate: Date;
};

type Race = {
  fullDate: Date;
  type: string | string[];
};

const RaceCalendar: React.FC<RaceCalendarProps> = ({ startDate }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

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
    { fullDate: visibleDates[0].fullDate, type: ["regular"] },
    { fullDate: visibleDates[2].fullDate, type: ["regular"] },
    {
      fullDate: visibleDates[4].fullDate,
      type: ["regular", "featured", "special"],
    },
  ];

  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);
  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);

  const currentMonth = visibleDates[0].fullDate.toLocaleString(
    `${locale === "ar" ? "ar-EG" : "en-US"}`,
    { month: "long" }
  );
  const currentYear = visibleDates[0].fullDate.getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-9 sm:grid-cols-8">
        {/* Sidebar*/}
        <div className="col-span-2 sm:col-span-1 flex flex-col justify-between items-center  pb-4 border-l">
          <div className="text-center -mt-7">
            <div className="w-full text-lg md:text-[22px] font-bold text-black">
              {currentYear}
              <span className="block text-2xl md:text-[36px] pb-4 md:pb-8">
                {currentMonth}
              </span>

              <div className="flex gap-2 ">
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
          </div>
          <hr className="block bg-gray-100 h-[2px] w-full -mt-16 sm:-mt-16 md:-mt-4" />

          <h3 className="text-xl font-bold text-primary text-center">
            {trans("eventsTitle")}
          </h3>
        </div>

        {/* Days and events*/}
        {visibleDates.map((date, index) => {
          const raceDay = races.find(
            (r) => r.fullDate.toDateString() === date.fullDate.toDateString()
          );

          const dayTimestamp = date.fullDate.getTime();
          const isDaySelected = openDetailsId?.startsWith(
            dayTimestamp.toString()
          );

          return (
            <div
              key={`${date.fullDate.toISOString()}-${index}`}
              className="border-l border-gray-100 py-3 text-center bg-white"
            >
              <div
                className={`text-2xl md:text-[56px] font-bold border-b border-gray-300 md:border-b-0 pb-10 ${
                  isDaySelected ? "text-yellow-400" : "text-primary"
                }`}
              >
                {date.day}
              </div>
              <div className="text-[21px] text-black md:border-b md:border-gray-300 pb-3 hidden md:block mt-5">
                {date.name}
              </div>

              {raceDay && (
                <div className="mt-4 flex flex-col items-center gap-1.5">
                  {Array.isArray(raceDay.type) ? (
                    raceDay.type.map((type, idx) => {
                      const id = `${date.fullDate.getTime()}-${idx}`;
                      const isOpen = openDetailsId === id;

                      return (
                        <div
                          key={id}
                          onClick={() =>
                            setOpenDetailsId((prev) =>
                              prev === id ? null : id
                            )
                          }
                          className={`w-6 h-6 rounded-full cursor-pointer border-[6px] relative ${
                            isOpen
                              ? "border-yellow-400 bg-white"
                              : "border-[#008062] bg-white"
                          }`}
                        >
                          {isOpen && (
                            <div
                              className="fixed md:absolute z-10 p-4 bg-white border border-gray-100 rounded-lg shadow-sm text-right 
                            w-[320px] start-5 top-1/2 -translate-y-1/2  md:-translate-y-0 md:top-5  md:-start-40 lg:-start-28  xl:start-6"
                            >
                              <div className="absolute end-5 top-1 cursor-pointer text-xl font-bold hover:text-red-600 transition-colors">
                                x
                              </div>

                              <div className="mb-2 text-start">
                                <h4 className="text-[25px] font-bold text-primary">
                                  {trans("raceDetails.title")}
                                </h4>
                                <span className="text-primary text-lg">
                                  {trans("raceDetails.category")}
                                </span>
                              </div>
                              <div className="text-sm text-black space-y-1 mb-3">
                                <div className="flex justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    📅 <span>{trans("raceDetails.date")}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    ⏰ <span>{trans("raceDetails.time")}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-end">
                                  <div className="space-y-1 text-black text-sm text-start">
                                    <div className="flex items-center justify-between">
                                      {trans("raceDetails.distance")}
                                      <span className="text-primary">
                                        {locale === "ar" ? "4 كم" : " 4 km"}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      {trans("raceDetails.type")}
                                      <span className="text-primary">
                                        {" "}
                                        {locale === "ar" ? "رملي" : "Sand"}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      {trans("raceDetails.age")}
                                      <span className="text-primary">
                                        {locale === "ar"
                                          ? "3 سنوات"
                                          : "3 years"}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                      {trans("raceDetails.prize")}
                                      <span className="text-primary">
                                        {locale === "ar"
                                          ? "100,000 ر . س"
                                          : "100,000 SAR"}
                                      </span>
                                    </div>
                                  </div>
                                  <button className="flex items-center gap-2 bg-[#FFBF00] text-xs font-bold py-1 px-3 rounded-full text-black">
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
