const Home = () => {
  return (
    <div className="bg-hero w-screen h-full xl:h-screen container mx-auto">
      <div className="w-full flex flex-col items-center justify-center">
        <span className="w-full flex flex-row items-center justify-between">
          {/* Left */}
          <span className="flex flex-col space-y-4">
            <h1 className="font-bold text-xl">
              HSKO donates <br /> <span>0.5% of every transaction</span> <br />{" "}
              to charity.
            </h1>
            <p className="text-white font-bold">
              HSKO is a p2p community-driven, cryptocurrency on the Polygon
              blockchain (MATIC).{" "}
              <span className="text-slate-500 font-light">
                HSKO will have a maximum supply of 1 billion tokens, with a 1%
                txn fee used for development, marketing and charities.
              </span>
            </p>
            <span className="flex flex-row space-x-4 justify-start">
              <Button
                style={"solid"}
                text={"buy now"}
                action={() => {
                  console.log("buying");
                }}
                type={"button"}
              />
              <Button
                style={"outline"}
                text={"learn more"}
                action={() => {
                  console.log("learning more");
                }}
                type={"button"}
              />
            </span>
          </span>
          {/* Right */}
          <span>
            <img src={"/logo.svg"} alt={"husko hero image"} />
          </span>
        </span>
      </div>
    </div>
  );
};

const Button = ({ style, text, action, type }) => {
  return (
    <button
      className={`flex w-full h-full flex-row items-center justify-center space-x-1 text-base 2xl:text-xl py-[7px] 2xl:py-[11px] capitalize duration-300 whitespace-nowrap ${
        style === "solid"
          ? "bg-white text-black hover:bg-slate-100 focus:bg-slate-200"
          : style === "outline"
          ? "border border-white text-white hover:bg-white hover:text-black"
          : "text-sea hover:text-lime"
      }`}
      onClick={action}
      type={type}
    >
      {text && <span>{text}</span>}
    </button>
  );
};

export default Home;
