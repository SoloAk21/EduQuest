import React from "react";
import { assets } from "../../assets/assets.js";

function Companies() {
  return (
    <div className="pt-16">
      <p className="text-base text-gray-500">Trusted by learners from</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
        <img src={assets.ethio_logo} alt="Ethio tel" className="w-20 md:w-28" />
        <img src={assets.chapa_logo} alt="Chapa" className="w-20 md:w-28" />
        <img
          src={assets.ministry_of_edu_logo}
          alt="Ministry of Education"
          className="h-8 md:w-12"
        />
        <img src={assets.adobe_logo} alt="Adobe" className="w-20 md:w-28" />
        <img src={assets.paypal_logo} alt="Paypal" className="w-20 md:w-28" />
      </div>
    </div>
  );
}

export default Companies;
