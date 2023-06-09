import React from "react";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect, disconnect, Claim} from "../global/utils/web3";
import { updateChain } from "../global/features/blockchainSlice";
import Web3 from 'web3'
// React
import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

const stake = () => {
  const account = useSelector(state => state.blockchain.account);
  const blocks = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const [totalStake, setTotalStake] = useState(0)
  const [email, setEmail] = useState('')


  const connectweb3 = () => {
    if (account) {
      disconnect().then(data => dispatch(updateChain(data)));
    } else {
      connect().then(data => dispatch(updateChain(data)));
    }
  };


  


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
              Husko Tokens <span className="text-red-600">Airdrop</span>
            </h1>
           
            <p className="font-bold -mt-4 py-6">
              Claim 200 Husko Tokens for free
            </p>

            <div>
              {account == null ?  <Button style={"solid"} text={" Connect Wallet"} action={_ => {
              connectweb3()
            }}/> : <>
            <form
            //  onSubmit={(e) => {
            //     e.preventDefault();
            //    Claim().then((data) => dispatch(updateChain(data)))
            // }}
            >
              {blocks.claimed == false ? <>
                <div className="mb-5 w-full">
              <input 
              type="Email"
              placeholder="Input your Email"
              className="py-4 px-3 text-black text-3xl w-full outline-red-600"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required/>
              </div>
              <Button style={"solid"} text={"Claim Airdrop"} type={"submit"} action={(e) => {
                e.preventDefault()
                Claim()
              }} /></> : <>
              <p className="font-bold -mt-4 py-6">
                Already ClAIMED !!!</p></>}
              
              
              </form></>}
           
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
