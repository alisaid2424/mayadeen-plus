"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "en", label: "English (UK)" },
  { code: "ar", label: "العربية (AR)" },
];

const BtnChangeLanguage = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1];
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

  const toggleMenu = () => setOpen(!open);

  const changeLanguage = (lng: string) => {
    if (lng !== currentLocale) {
      router.push(`/${lng}${pathWithoutLocale || "/"}`);
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden sm:block shrink-0" ref={menuRef}>
      <div className="relative z-50">
        <button
          onClick={toggleMenu}
          className="flex size-9 items-center justify-center rounded-full hover:bg-primary/15 hover:shadow-md transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white text-2xl"
          >
            <path d="m5 8 6 6" />
            <path d="m4 14 6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="m22 22-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
        </button>

        {open && (
          <div className="absolute mt-2 left-0 w-36 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`flex w-full px-4 py-2 text-sm items-center justify-end transition-colors duration-150 rtl:flex-row-reverse ${
                  currentLocale === code
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {currentLocale === code && (
                  <span className="bg-primary ms-2 size-2 rounded-full shadow shadow-primary/50"></span>
                )}
                <span className="ms-4">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BtnChangeLanguage;
