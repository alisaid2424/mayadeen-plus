import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Hero = () => {
  const trans = useTranslations("hero");

  const boxes = trans.raw("boxes") as {
    date: string;
    title: string;
    description: string;
  }[];

  return (
    <main className="relative min-h-[calc(100vh-133px)] overflow-hidden">
      {/* background*/}
      <Image
        src="/home-page/main-img.svg"
        alt="hero background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Content over background*/}
      <div className="relative z-10 container flex flex-col justify-center gap-24 py-14 text-white">
        <div className="flex items-start justify-center flex-col gap-4 h-full">
          <h1 className="text-4xl sm:text-6xl mb-3">{trans("title")}</h1>
          <p className="text-xl sm:text-[35px] mb-[25px] lg:mb-[36px]">
            {trans("subtitle")}
          </p>
          <Link
            href="#"
            className="flex items-center justify-center font-medium min-w-[155px] gap-[10px] bg-[#FFBF00] py-3 px-4 rounded-full text-black text-base mb-10"
          >
            <span className="relative -mt-2">{trans("buttonText")}</span>
            <Image
              src="/icons/left-arrow.svg"
              alt="left-arrow"
              width={15}
              height={15}
              className="rotate-180 rtl:rotate-0"
            />
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boxes.map((item, index) => (
            <div className="bg-primary bg-opacity-55 py-5 px-4" key={index}>
              <span className="block text-sm sm:text-base mb-3 font-medium">
                {item.date}
              </span>
              <h2 className="text-2xl sm:text-[30px] mb-4">{item.title}</h2>
              <p className="text-sm sm:text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Hero;
