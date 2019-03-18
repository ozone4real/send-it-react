import React from "react";
import SlidingCarousel from "./SlidingCarousel";
import HowItWorks from "../HowItWorks";
import InfoTiles from "./InfoTiles";

const HomePage = () => {
  return (
    <React.Fragment>
      <SlidingCarousel />
      <InfoTiles />
      <HowItWorks />
    </React.Fragment>
  );
};

export default HomePage;
