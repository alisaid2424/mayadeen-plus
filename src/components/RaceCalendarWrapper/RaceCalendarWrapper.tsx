import { useTranslations } from "next-intl";
import RaceCalendar from "./RaceCalendar";

const RaceCalendarWrapper = () => {
  const trans = useTranslations("raceCalendar");
  const today = new Date();

  return (
    <div className="container pt-14">
      <h1 className="text-4xl sm:text-[61px] mb-8 text-primary font-bold w-fit flex items-center gap-2 group">
        {trans("title")}
        <span className="mb-6">
          <svg
            className="size-5 mt-2 group-hover:translate-y-6 transition-all duration-300 rtl:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </h1>

      <RaceCalendar startDate={today.toISOString()} />
    </div>
  );
};

export default RaceCalendarWrapper;
