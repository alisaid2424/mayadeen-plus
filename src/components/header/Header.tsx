import Image from "next/image";
import { Link } from "@/i18n/navigation";
import MobileMenuToggle from "./MobileMenuToggle";
import NavLinks from "./NavLinks";
import { useTranslations } from "next-intl";
import BtnChangeLanguage from "./BtnChangeLanguage";

const Header = () => {
  const trans = useTranslations("header");
  return (
    <header className="bg-primary text-white relative">
      <div className="container flex items-center justify-between gap-5 h-[133px] w-full">
        <div className="flex items-center gap-7">
          {/* Menu button on small screens*/}
          <div className="lg:hidden">
            <MobileMenuToggle />
          </div>

          {/* logo*/}
          <Image
            src="/logo.svg"
            alt="logo-img"
            width={193}
            height={58}
            className="w-[100px] sm:w-[200px]"
          />
        </div>

        {/* Navigation links - large screens only*/}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-between">
          <nav className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
            <ul className="navLinks z-50 flex items-start md:items-center flex-col md:flex-row gap-2 lg:gap-5 xl:gap-7 md:me-auto ">
              <NavLinks trans={trans} />
            </ul>
          </nav>
        </div>

        {/* Search and Account*/}
        <div className="flex items-center gap-7 md:gap-8">
          <BtnChangeLanguage />

          <Link
            href="#"
            className="flex items-center gap-2 text-base lg:whitespace-nowrap"
          >
            <Image
              src="/icons/search.svg"
              alt="search-icon"
              width={20}
              height={20}
              className="w-6 h-6 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
            />
            <span className="hidden lg:inline-block">{trans("search")}</span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 text-base lg:whitespace-nowrap"
          >
            <Image
              src="/icons/account.svg"
              alt="account-img"
              width={20}
              height={20}
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-5 lg:h-5"
            />
            <span className="hidden lg:inline-block">{trans("account")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
