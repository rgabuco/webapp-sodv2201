import React from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";

function About() {
  return (
    <div>
      <Navbar leftMenu={<HamburgerMenu />} />
      <h1>About Page</h1>
      {/* Add your about content here */}
    </div>
  );
}

export default About;
