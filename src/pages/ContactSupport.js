import React from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function ContactSupport() {
  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <h1>Contact Support Page</h1>
      {/* Add your home content here */}
    </div>
  );
}

export default ContactSupport;
