import React from "react";
import { assets } from "../../assets/assets"; // Assuming assets is imported

function Footer() {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      {/* Left side with logo and text */}
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60 mx-4"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © SoloAk. All Rights Reserved.
        </p>
      </div>
      <div className="flex gap-4 mt-3 items-center max-md:mt-4">
        <a href="#" className="hover:text-blue-500">
          <img
            src={assets.facebook_icon}
            alt="facebook_icon"
            className="w-6 h-6"
          />
        </a>
        <a href="#" className="hover:text-blue-400">
          <img
            src={assets.twitter_icon}
            alt="twitter_icon"
            className="w-6 h-6"
          />
        </a>
        <a href="#" className="hover:text-pink-500">
          <img
            src={assets.instagram_icon}
            alt="instagram_icon"
            className="w-6 h-6"
          />
        </a>
        {/* <a href="#" className="hover:text-blue-400">
          <img
            src={assets.telegram_icon}
            alt="telegram_icon"
            className="w-6 h-6"
          />
        </a> */}
      </div>
    </footer>
  );
}

export default Footer;
