import React from "react";

import Header from "../Layout/Header";
import Footer from "../Layout/Header";

const stake = () => {
  return (
    <div className="text-white text-lg ">
      <Header />
      <div className="container bg-hero max-w-full  max-h-full  py-10 px-8 sm:px-14 md:px-4 lg:px-14 ">
        {/* Header  */}
        <div className="mt-12 max-w-screen-2xl mx-auto hero__wrapper md:flex md:flex-row-reverse md:items-center md:px-0">
          {/* Image - desk:right  */}
          <div className="hero__img mb-8 md:flex-auto md:w-2/5 xl:w-1/2">
            <img
              className="w-80 md:w-10/12 lg:w-8/12 mx-auto"
              src={"/logo.svg"}
              alt={"husko hero image"}
            />
          </div>
          {/* Content - desk:left  */}
          <div className="hero__content md:flex-auto md:w-3/5 xl:w-1/2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl">
              Stake to <span className="text-red-600">HUSKO tokens</span>
            </h1>
            <p className="font-bold -mt-4 py-6">Acquire 15% worth returns</p>

            <div className="mb-5 w-full">
              <input
                type="number"
                name="stake"
                className="py-4 px-3 text-black text-3xl w-full outline-red-600"
                placeholder="0"
              />
            </div>

            <div className="button-group mb-5 flex flex-col sm:flex-row gap-4">
              <select
                className="py-3 px-2 flex-1 text-black text-lg outline-red-600"
                name="compoundSelect"
                id=""
              >
                <option default value="0">
                  Compound select
                </option>
                <option className="py-3" value="15">
                  15 days
                </option>
                <option className="py-3" value="20">
                  20 days
                </option>
                <option className="py-3" value="30">
                  30 days
                </option>
              </select>

              <Button
                style={"solid"}
                type={"button"}
                text={"Approve"}
                action={_ => {}}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="flex-1 border py-3 px-3 border-white">
                <p>Total amount staked</p>
                <p className="font-bold text-2xl text-red-600">{"13 Winns"}</p>
              </div>
              <div className="flex-1 border py-3 px-3 border-white">
                <p>Total rewards</p>
                <p className="font-bold text-2xl text-red-600">{"16 Winns"}</p>
              </div>
            </div>

            <div className="flex mb-5">
              <div className="flex-1 border py-3 px-3 border-white">
                <p>Total staked</p>
                <p className="font-bold text-3xl text-red-600">{"16 Winns"}</p>
              </div>
            </div>

            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Button = ({ style, text, action, type }) => {
  return (
    <button
      className={`flex w-full flex-1 flex-row items-center justify-center space-x-1 text-lg 2xl:text-xl py-5 2xl:py-[11px] capitalize duration-300 whitespace-nowrap ${
        style === "solid"
          ? "bg-white text-black hover:bg-slate-100 focus:bg-slate-200"
          : style === "outline"
          ? "border border-white text-white hover:bg-white hover:text-black"
          : "text-sea hover:text-lime"
      }`}
      onClick={action}
      type={type}
    >
      {text && <p>{text}</p>}
    </button>
  );
};

export default stake;