import React, { useState, useEffect } from "react";  // Import useState and useEffect
import Navbar from "../components/navbar/Navbar";
import '../designs/Programs.css';

// just an initial display array of programs
const initPrograms = [
  {
    code: 'ABCD-2024',
    name: 'Software Development - Diploma',
    description: ' comprehensive two-year software development diploma program designed to equip students...',
    term: 'winter',
    startDate: 'January 10, 2024',
    endDate: 'May 15, 2026',
    fees: '$9,254 domestic / $27,735 international',
    category: 'Technology',
  },
  {
    code: 'BIZ-MGMT-2024',
    name: 'Business Management - Diploma',
    description: 'A two-year program to develop core business management skills.',
    term: 'Fall',
    startDate: 'September 5, 2024',
    endDate: 'June 15, 2026',
    fees: '$8,500 domestic / $25,000 international',
    category: 'Business',
  },
  {
    code: 'HLTH-NUR-2024',
    name: 'Nursing - Certificate',
    description: 'A one-year certificate program in nursing fundamentals.',
    term: 'Spring',
    startDate: 'March 5, 2024',
    endDate: 'March 5, 2025',
    fees: '$6,000 domestic / $18,000 international',
    category: 'Health',
  },
  {
    code: 'ABCD-2024',
    name: 'Information Technology - Diploma',
    description: 'A comprehensive two-year software development diploma program designed to equip students...',
    term: 'winter',
    startDate: 'January 10, 2024',
    endDate: 'May 15, 2026',
    fees: '$7,254 domestic / $20,735 international',
    category: 'Technology',
  },
];

const Programs = () => {
 
  // openPrograms keeps track of which programs are open showing details
  // the original or default state is an empty object. setOpenPrograms is used to update the state.
  const [programs, setPrograms] = useState(initPrograms);
  const [openPrograms, setOpenPrograms] = useState({}); 
  
  // useEffect is used to get additional programs added by the admin from localStorage 
  useEffect(() => {
  // retrieve saved programs from localStorage or use an empty array if nothing is found
    const savedPrograms = JSON.parse(localStorage.getItem('programs')) || [];
  // setPrograms updates the state by combining the initial programs with the saved ones
    setPrograms(prevPrograms => [...prevPrograms, ...savedPrograms]); 
  }, []); 

  // toggleProgram is a function that toggles whether the details of a specific program is visible or not
  // takes category and index as parameters to identify each program
  const toggleProgram = (category, index) => {
    const uniqueKey = `${category}-${index}`; // Creates a unique key for each program
  // updates the openPrograms state. If the program is open, close it but if it's closed, open it.
    setOpenPrograms((prevState) => ({
      ...prevState,
      [uniqueKey]: !prevState[uniqueKey],
    }));
  };

  // Group programs by category
  // reduce is used to group programs by their category
  // The acc object holds the categories, and programs are pushed into the category arrays
  const categorizedPrograms = programs.reduce((acc, program) => {
    if (!acc[program.category]) {
      acc[program.category] = [];
    }
    acc[program.category].push(program);
    return acc;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="programs-container">
        {Object.keys(categorizedPrograms).map((category) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="Program-cards">
              {categorizedPrograms[category].map((program, index) => {
                const uniqueKey = `${category}-${index}`; // Create a unique key for each program
                return (
                  <div
                    key={uniqueKey}
                    className={`program-card ${openPrograms[uniqueKey] ? "active" : ""}`}
                    onClick={() => toggleProgram(category, index)}
                  >
                    <div className="program-header">
                      <h3>{program.name}</h3>
                      <span className="toggle-icon">
                        {openPrograms[uniqueKey] ? '-' : '+'}
                      </span>
                    </div>
                    {openPrograms[uniqueKey] && (
                      <div className="program-details">
                        <p>{program.description}</p>
                        <p><strong>Term:</strong> {program.term}</p>
                        <p><strong>Start Date:</strong> {program.startDate}</p>
                        <p><strong>End Date:</strong> {program.endDate}</p>
                        <p><strong>Fees:</strong> {program.fees}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
