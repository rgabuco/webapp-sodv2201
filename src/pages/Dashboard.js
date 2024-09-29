import React from "react";
import Navbar from "../components/navbar/Navbar";
import HamburgerMenu from "../components/hamburger-menu/HamburgerMenu";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function Dashboard() {
  return (
    <div>
      <Navbar leftMenu={<HamburgerMenu />} rightMenu={<ProfileMenu />} />
      <h1>Dashboard Page</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}

export default Dashboard;
