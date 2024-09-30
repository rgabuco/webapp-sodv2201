import React from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function AdmCourses() {
  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <h1>Adm Courses Page</h1>
      {/* Add your home content here */}
    </div>
  );
}

export default AdmCourses;
