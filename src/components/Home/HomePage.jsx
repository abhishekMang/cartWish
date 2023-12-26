import React from "react";
import HeroSection from "./HeroSection";

import iphone from "../../assets/iphone-14-pro.png";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/product/65797d51fced557b0384ba70"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and color-matched Magic accessories to your bag after configure your Mac Mini."
        link="/product/65797d51fced557b0384ba78"
        image={mac}
      />{" "}
    </div>
  );
};

export default HomePage;
