import React from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function Dashboard() {
  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <h1>Dashboard Page</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}

export default Dashboard;
