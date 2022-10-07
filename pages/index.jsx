import React from "react";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect, disconnect, Approve, Stake, UnStake} from "../global/utils/web3";
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
  const [received, setReceived] = useState(0)
  const connectweb3 = () => {
    if (account) {
      disconnect().then(data => dispatch(updateChain(data)));
    } else {
      connect().then(data => dispatch(updateChain(data)));
    }
  };

  const [compoundValue, setCompoundValue] = useState(3);
  const [amount, SetAmount] = useState(1);
  const [stakingDate, setStakingDate]= useState(0)
  const [stakingEnd, setStakingEnd] = useState(0)
  useEffect(() => {
    if(blocks.account) {
      let web3 = new Web3(blocks.provider);
    //var tarehe = new Date(blocks.stake12.timestampEnd * 1000).toLocaleDateString("en-US")
    var stake6Date = new Date(blocks.stake6.timestamp * 1000).toLocaleDateString("en-UK")
    var stake9Date = new Date(blocks.stake9.timestamp * 1000).toLocaleDateString("en-UK")
    var stake12Date = new Date(blocks.stake12.timestamp * 1000).toLocaleDateString("en-UK")
    var stake15Date = new Date(blocks.stake15.timestamp * 1000).toLocaleDateString("en-UK")
    var stake6endDate = new Date(blocks.stake6.timestampEnd * 1000).toLocaleDateString("en-UK")
    var stake9endDate = new Date(blocks.stake9.timestampEnd * 1000).toLocaleDateString("en-UK")
    var stake12endDate = new Date(blocks.stake12.timestampEnd * 1000).toLocaleDateString("en-UK")
    var stake15endDate = new Date(blocks.stake15.timestampEnd * 1000).toLocaleDateString("en-UK")
    //setStakingDate(hehe)
    if(compoundValue == 3) {
      if(blocks.stake6.timestamp == 0) {
        setStakingDate(0)
        setStakingEnd(0)
        setReceived(web3.utils.fromWei(blocks.stake6.received))
      } else {
        setStakingDate(stake6Date)
        setStakingEnd(stake6endDate)
        setReceived(web3.utils.fromWei(blocks.stake6.received))
      }
      
      
    } else if(compoundValue == 5 ) {
      if(blocks.stake9.timestamp == 0) {
        setStakingDate(0)
        setStakingEnd(0)
        setReceived(web3.utils.fromWei(blocks.stake9.received))
      } else {
        setStakingDate(stake9Date)
        setStakingEnd(stake9endDate)
        setReceived(Math.fround(web3.utils.fromWei(blocks.stake9.received)))
      }
    } else if (compoundValue == 7) {
      if(blocks.stake12.timestamp == 0) {
        setStakingDate(0)
        setStakingEnd(0)
        setReceived(Math.fround(web3.utils.fromWei(blocks.stake12.received)))
      } else {
        setStakingDate(stake12Date)
        setStakingEnd(stake12endDate)
        setReceived(Math.trunc(web3.utils.fromWei(blocks.stake12.received)))
      }
    } else if (compoundValue == 9){
      if(blocks.stake15.timestamp == 0) {
        setStakingDate(0)
        setStakingEnd(0)
        setReceived(web3.utils.fromWei(blocks.stake15.received))
      } else {
        setStakingDate(stake15Date)
        setStakingEnd(stake15endDate)
        setReceived(web3.utils.fromWei(blocks.stake15.received))
      }
    }
    

    
    }
  }, [compoundValue, stakingDate, stakingEnd])

  useEffect(() => {
    if(compoundValue == 3) {
      setTotalStake(blocks.stake6Amount)
      
    } else if(compoundValue == 5) {
      setTotalStake(blocks.stake9Amount)
    } else if (compoundValue == 7) {
      setTotalStake(blocks.stake12Amount) 
    } else if (compoundValue == 9){
      setTotalStake(blocks.stake15Amount)
    }
  },[compoundValue, totalStake]) 

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
            <p className="font-bold -mt-4 py-6">
              Acquire {compoundValue}% worth returns
            </p>

            <form>
              <div className="mb-5 w-full">
                <input
                  type="number"
                  name="stake"
                  className="py-4 px-3 text-black text-3xl w-full outline-red-600"
                  placeholder="0"
                  onChange = {e => {
                    SetAmount(e.target.value)
                  }}
                />
              </div>

              <div className="button-group mb-5 flex flex-col sm:flex-row gap-4">
                <select
                  className="py-3 px-2 flex-1 text-black text-lg outline-red-600"
                  name="compoundSelect"
                  onChange={e => {
                    setCompoundValue(e.target.value);
                  }}
                >
                  <option default disabled>
                    Compound select
                  </option>
                  <option className="py-3" value="3">
                    30 days
                  </option>
                  <option className="py-3" value="5">
                    60 days
                  </option>
                  <option className="py-3" value="7">
                    90 days
                  </option>
                  <option className="py-3" value="9">
                    120 days
                  </option>
                </select>
                {account == null ? (
                  <Button
                    style={"solid"}
                    type={"button"}
                    text={"connect to stake"}
                    action={_ => {
                      connectweb3();
                    }}
                  />
                ) : (
                  <>
                  {blocks.allowance == 0 ? 
                  <>
                  <Button
                    style={"solid"}
                   // type={"button"}
                    text={"Approve"}
                    action={(e) => {
                      e.preventDefault()
                     Approve()
                    }}
                  /> </>:  <><Button
                  style={"solid"}
                  //type={"submit"}
                  text={"Stake"}
                  action={(e) => {
                    e.preventDefault()
                    Stake(compoundValue, amount)
                  }}
                /></>}
                  
                  </>
                )}
              </div>
            </form>
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              
              <div className="flex-1 border py-3 px-3 border-white">
                <p>Staking Start</p>
                <p className="font-bold text-2xl text-red-600">
                  {stakingDate} 
                </p>
                <div className="p-2 mt-2">
                  
                  
                </div>
              </div>
              <div className="flex-1 border py-3 px-3 border-white">
                <p>Staking End</p>
                <p className="font-bold text-2xl text-red-600">
                  {stakingEnd}
                </p>
              </div>
            </div>

            <div className="flex mb-5">
              <div className="flex-1 border py-3 px-3 border-white">
                <p>Total staked</p>
                <p className="font-bold text-3xl text-red-600">
                  {totalStake +" husko"}
                  
                  {totalStake == 0 ? <></> : <><br/><br/><Button
                    style={"solid"}
                    type={"submit"}
                    text={"unstake"}
                    action={_ => {
                      UnStake(compoundValue);
                    }}
                  /> </>}
                </p>
              </div>
            </div>
            <div className="flex-1 border py-3 px-3 border-white">
                <p>Total Received</p>
                <p className="font-bold text-2xl text-red-600">
                  {received}
                </p>
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
