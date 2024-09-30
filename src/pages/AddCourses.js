import React from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileMenu from "../components/profile-menu/ProfileMenu";

function AddCourses() {
  return (
    <div>
      <Navbar rightMenu={<ProfileMenu />} />
      <h1>Add Courses Page</h1>
      {/* Add your home content here */}
    </div>
  );
}

export default AddCourses;
