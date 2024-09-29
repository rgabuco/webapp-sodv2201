import React from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";

function Contact() {
  return (
    <div>
      <Navbar leftMenu={<HamburgerMenu />} />
      <h1>Contact Page</h1>
      {/* Add your about content here */}
    </div>
  );
}

export default Contact;
