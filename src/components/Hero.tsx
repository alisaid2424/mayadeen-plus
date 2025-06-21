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
    <main className="bg-cover bg-[url('/home-page/main-img.svg')] bg-center text-white">
      <div className="container flex flex-col justify-between min-h-[calc(100vh-133px)] gap-20 sm:gap-0">
        {/* Content over background*/}
        <div className="flex flex-col justify-center items-center sm:items-start pt-[125px]">
          <h1 className="text-4xl sm:text-6xl mb-3">{trans("title")}</h1>
          <p className="text-xl sm:text-[36px] leading-[2] mb-8">
            {trans("subtitle")}
          </p>
          <Link
            href="#"
            className="flex items-center font-medium w-fit gap-[10px] bg-[#FFBF00] py-2 px-4 rounded-full text-black text-base mb-20"
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

        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pb-9">
          {boxes.map((item, index) => (
            <li className="bg-primary bg-opacity-55 py-3 px-4" key={index}>
              <span className="block text-sm mb-2 font-medium">
                {item.date}
              </span>
              <h2 className="text-2xl sm:text-2xl mb-3">{item.title}</h2>
              <p className="text-sm sm:text-base">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Hero;
