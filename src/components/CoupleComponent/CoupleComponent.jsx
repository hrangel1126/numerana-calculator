import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoupleComponent.css';

function CoupleComponent() {
  const [person1, setPerson1] = useState({ name: '', salary: '' });
  const [person2, setPerson2] = useState({ name: '', salary: '' });
  const [totalSalary, setTotalSalary] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotalSalary();
  }, [person1.salary, person2.salary]);

  const handleNameChange = (person, value) => {
    if (person === 1) {
      setPerson1({ ...person1, name: value });
    } else {
      setPerson2({ ...person2, name: value });
    }
  };

  const handleSalaryChange = (person, value) => {
    // Allow only numbers
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      if (person === 1) {
        setPerson1({ ...person1, salary: value });
      } else {
        setPerson2({ ...person2, salary: value });
      }
    }
  };

  const calculateTotalSalary = () => {
    const salary1 = person1.salary ? parseInt(person1.salary, 10) : 0;
    const salary2 = person2.salary ? parseInt(person2.salary, 10) : 0;
    setTotalSalary(salary1 + salary2);
  };

  const printResults = () => {
    window.print();
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="couple-calculator-container">
      <h1>Couple Salary Calculator</h1>
      
      <div className="couple-form">
        <div className="person-info">
          <h2>Person 1</h2>
          <div className="input-group">
            <label htmlFor="person1-name">Name</label>
            <input
              id="person1-name"
              type="text"
              value={person1.name}
              onChange={(e) => handleNameChange(1, e.target.value)}
              placeholder="Enter name"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="person1-salary">Salary</label>
            <input
              id="person1-salary"
              type="text"
              value={person1.salary}
              onChange={(e) => handleSalaryChange(1, e.target.value)}
              placeholder="Enter salary"
            />
          </div>
        </div>

        <div className="person-info">
          <h2>Person 2</h2>
          <div className="input-group">
            <label htmlFor="person2-name">Name</label>
            <input
              id="person2-name"
              type="text"
              value={person2.name}
              onChange={(e) => handleNameChange(2, e.target.value)}
              placeholder="Enter name"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="person2-salary">Salary</label>
            <input
              id="person2-salary"
              type="text"
              value={person2.salary}
              onChange={(e) => handleSalaryChange(2, e.target.value)}
              placeholder="Enter salary"
            />
          </div>
        </div>
      </div>

      <div className="results">
        <h2>Total Couple Salary: ${totalSalary}</h2>
      </div>

      <div className="actions">
        <button className="print-button" onClick={printResults}>Print Results</button>
        <button className="back-button" onClick={goBack}>Back to Home</button>
      </div>
    </div>
  );
}

export default CoupleComponent; 