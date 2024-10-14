// Initial dummy data for users
export const usersArray = [
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
    courses: ["CS101", "CS102", "CS202"],
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
    courses: [], // Initialize with an empty array
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
    courses: [], // Initialize with an empty array
  },
  {
    id: 4,
    username: "submax",
    password: "submax",
    email: "submax@example.com",
    firstName: "Submax",
    lastName: "Max",
    phone: "+123 456 7890",
    department: "Software Development",
    program: "Software Development - Diploma",
    isAdmin: true,
    courses: [], // Initialize with an empty array
  },
];

export default usersArray;
