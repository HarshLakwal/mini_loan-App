import React from "react";
import Lottie from "react-lottie";
import animationData from "../../Assests/animations/107043-success.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="inline-block flex items-center justify-center">
      <Lottie options={defaultOptions} width={30} height={30} />
    </div>
  );
};

export default Loader;
