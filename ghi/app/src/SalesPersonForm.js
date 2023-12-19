import React, {useEffect, useState} from 'react';

function SalesPersonForm() {
    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        const v = event.target.value;
        setFirstName(v);
    }
    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        const v = event.target.value;
        setLastName(v);
    }
    const [employeeId, setEmployeeId] = useState('');
    const handleEmployeeIdChange = (event) => {
        const v = event.target.value;
        setEmployeeId(v);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;
        const spUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(spUrl, fetchConfig);
        if (response.ok) {
            const newSP = await response.json();
            console.log(newSP);
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a salesperson</h1>
            <form onSubmit={handleSubmit} id="create-sp-form">
              <div className="form-floating mb-3">
                <input onChange={handleFirstNameChange} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control" value={firstName}/>
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control" value={lastName}/>
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmployeeIdChange} placeholder="Emp ID" required type="text" id="employee_id" name="employee_id" className="form-control" value={employeeId}/>
                <label htmlFor="employee_id">Employee ID</label>
              </div>
              <button className="btn btn-primary">Add Employee</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default SalesPersonForm;
