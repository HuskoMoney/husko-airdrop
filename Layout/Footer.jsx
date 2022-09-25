import React from "react";

export default function Footer() {
  const date = new Date();

  return (
    <footer>
      <div className="footer__wrapper py-6 px-10 lg:flex ">
        <div className="footer__left w-4/8 text-center sm:text-start sm:flex items-center">
          <div className="logo">
            <img src={"/logo.svg"} className="w-20 mx-auto sm:mr-28" alt="" />
          </div>
          <p className="font-light text-base py-6">
            Disclaimer: The content and links provided on this page are for
            informational purposes only.{" "}
            <span className="text-slate-400 font-light">
              HSKO Money does not provide legal, financial or investment advice
              or recommendations, nor is it a substitute for individual due
              diligence.
            </span>
          </p>
        </div>
        <div className="footer__right mx-auto text-center lg:text-start pt-4 pl-5 w-4/6">
          <h6 className="uppercase">follow us</h6>
          <ul className="social__media flex justify-center lg:justify-start  space-x-8 mt-6">
            <li>
              <a href="http://#">
                <img src="/icons/SVG/twitter.svg" className="w-5" alt="" />
              </a>
            </li>
            <li>
              <a href="http://#">
                <img src="/icons/SVG/github.svg" className="w-5" alt="" />
              </a>
            </li>
            <li>
              <a href="http://#">
                <img
                  src="/icons/SVG/git.svg"
                  className="w-5"
                  alt="telegram icon"
                />
              </a>
            </li>
            <li>
              <a href="http://#">
                <img src="/icons/SVG/mail.svg" className="w-5" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright text-center pb-6">
        <p className="font-bold text-sm">
          Copyright &copy; {date.getFullYear()}{" "}
          <span className="text-red-500"> Husko Money </span>
          {/* <span className="text-red-500">Hyphen</span> */}
        </p>
      </div>
    </footer>
  );
}
