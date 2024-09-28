import React from "react";
import Navbar from "../components/navbar/Navbar";

function Login() {
  return (
    <div>
      <Navbar showLoginButton={false} />
      <h1>Login Page</h1>
      {/* Add your login form here */}
    </div>
  );
}

export default Login;
