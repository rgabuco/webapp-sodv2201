import React from "react";

// Initial dummy data for users
const usersArray = [
  {
    id: 1,
    username: "jdoe",
    password: "123456",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+123 456 7890",
    department: "Software Development",
    program: "Software Development - Diploma",
    isAdmin: false,
  },
  {
    id: 2,
    username: "asmith",
    password: "password",
    email: "allan.smith@example.com",
    firstName: "Allan",
    lastName: "Smith",
    phone: "+123 456 7890",
    department: "Software Development",
    program: "Software Development - Post Diploma",
    isAdmin: false,
  },
  {
    id: 3,
    username: "admin",
    password: "admin",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    phone: "+123 456 7890",
    department: "Software Development",
    program: "Software Development - Diploma",
    isAdmin: true,
  },
];

export default usersArray;
