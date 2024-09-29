import React from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";

function Dashboard() {
  return (
    <div>
      <Navbar leftMenu={<HamburgerMenu />} />
      <h1>Dashboard Page</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}

export default Dashboard;
