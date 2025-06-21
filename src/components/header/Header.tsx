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
      <div className="container flex items-center justify-between gap-8 h-[133px] w-full">
        <div className="flex items-center gap-7">
          {/* Menu button on small screens*/}
          <div className="lg:hidden">
            <MobileMenuToggle />
          </div>

          {/* logo*/}
          <Image
            src="/logo.svg"
            alt="logo-img"
            width={200}
            height={200}
            className="w-[100px] sm:w-[150px] "
          />
        </div>

        <div className="flex flex-1 items-center justify-between">
          {/* Navigation links - large screens only*/}
          <nav className="hidden lg:flex flex-col md:flex-row items-start md:items-center justify-between w-full">
            <ul className="navLinks z-50 flex items-start md:items-center md:flex-row-reverse gap-2 lg:gap-7 ">
              <NavLinks trans={trans} />
            </ul>
          </nav>

          {/* Search and Account*/}
          <div className="flex items-center ms-auto gap-8 ltr:lg:ms-7">
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
              <span className="hidden lg:inline-block text-lg">
                {trans("search")}
              </span>
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
      </div>
    </header>
  );
};

export default Header;
