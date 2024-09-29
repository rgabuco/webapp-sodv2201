import React from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";

function Courses() {
  return (
    <div>
      <Navbar leftMenu={<HamburgerMenu />} />
      <h1>Courses Page</h1>
      {/* Add your courses content here */}
    </div>
  );
}

export default Courses;
