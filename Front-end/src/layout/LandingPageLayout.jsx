import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { FaArrowUp } from "react-icons/fa";

export default function LandingPageLayout() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <>
      <Header />

      <div>
        <Outlet />
      </div>

      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <a href="#top">
          <div
            style={{
              backgroundColor: "black",
              width: "50px",
              height: "50px",
              position: "fixed",
              bottom: "0",
              right: "0",
              margin: "15px",
              opacity: isHover ? "0.5" : "0.25",
            }}
          ></div>
          <div
            style={{
              position: "fixed",
              color: "black",
              fontSize: "25px",
              bottom: "0",
              right: "0",
              margin: "0px 28px 24px 0px",
              opacity: isHover ? "0.75" : "0.5",
            }}
          >
            <FaArrowUp />
          </div>
        </a>
      </div>
      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
