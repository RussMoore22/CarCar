import React, {useEffect, useState} from 'react';

function CustomerForm() {
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
    const [address, setAddress] = useState('');
    const handleAddressChange = (event) => {
        const v = event.target.value;
        setAddress(v);
    }
    const [phoneNumber, setPhoneNumber] = useState('');
    const handlePhoneChange = (event) => {
        const v = event.target.value;
        setPhoneNumber(v);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;
        const custUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(custUrl, fetchConfig);
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add Customer</h1>
            <form onSubmit={handleSubmit} id="create-cust-form">
              <div className="form-floating mb-3">
                <input onChange={handleFirstNameChange} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control" value={firstName}/>
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control" value={lastName}/>
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleAddressChange} placeholder="Address" required type="text" id="address" name="address" className="form-control" value={address}/>
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePhoneChange} placeholder="Phone" required type="number" id="phone_number" name="phone_number" className="form-control" value={phoneNumber}/>
                <label htmlFor="phone_number">Phone</label>
              </div>
              <button className="btn btn-primary">Add Customer</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default CustomerForm;
