import React from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";

function Home() {
  return (
    <div>
      <Navbar leftMenu={<HamburgerMenu />} />
      <h1>Home Page</h1>
      {/* Add your about content here */}
    </div>
  );
}

export default Home;
