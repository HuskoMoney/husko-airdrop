import Head from "next/head";
import React, { useRef } from "react";

export default function Header() {
  const menuRef = useRef(null);

  const toggleMenu = _ => {
    if (menuRef.current.classList.contains("hidden")) {
      menuRef.current.classList.remove("hidden");
    } else {
      menuRef.current.classList.add("hidden");
    }
  };

  return (
    <header className="bg-slate-500">
      <Head>
        <title>Stake- HUSKO </title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <nav className="header__nav  flex justify-end sm:justify-center">
        <div
          onClick={toggleMenu}
          className="header__nav--mobile flex items-center sm:hidden mr-6 h-8"
        >
          <h1 className="menu_text mr-2">Menu</h1>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <ul
          ref={menuRef}
          className="hidden sm:flex pr-6 sm:pr-0 space-y-3 sm:space-y-0 sm:space-x-10 font-bold text-white "
        >
          <li>
            <a className="text-red-500" href="/">
              {" "}
              Home
            </a>
          </li>
          <li>
            <a href="/about"> About</a>
          </li>
          <li>
            <a href="/stake"> Stake</a>
          </li>
          <li>
            <a href="/news"> News</a>
          </li>
          <li>
            <a href="/exchange"> Exchanges</a>
          </li>
          <li>
            <a href="dapp"> Dapps</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
