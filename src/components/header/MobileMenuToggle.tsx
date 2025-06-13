"use client";

import { useState } from "react";
import NavLinks from "./NavLinks";
import { useTranslations } from "next-intl";

const MobileMenuToggle = () => {
  const [toggle, setToggle] = useState(false);
  const trans = useTranslations("header");

  return (
    <>
      <button
        onClick={() => setToggle(!toggle)}
        className="p-2 hover:bg-white/20 rounded transition"
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              toggle
                ? "M6 18L18 6M6 6l12 12"
                : "M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
            }
          />
        </svg>
      </button>

      {toggle && (
        <div className="absolute top-full left-0 w-full bg-[#007057] px-5 py-6 z-50">
          <ul className="container flex flex-col items-start gap-5">
            <NavLinks onClick={() => setToggle(false)} trans={trans} />
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileMenuToggle;
