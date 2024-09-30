import React from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function AdmAddCourses() {
  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <h1>Adm Add Courses Page</h1>
      {/* Add your home content here */}
    </div>
  );
}

export default AdmAddCourses;
