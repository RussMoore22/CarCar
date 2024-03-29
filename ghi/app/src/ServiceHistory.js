import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function ServiceHistory(props) {
  const [appts, setAppts] = useState([])
  const [searchVin, setSearchVin] = useState('')
  const [submittedVinSearch, setSubmittedVinSearch] = useState('')


  async function getData() {
    const vinResponse = await fetch('http://localhost:8080/api/automobiles/')
    const response = await fetch('http://localhost:8080/api/appointments/')

    if (!vinResponse.ok) { console.log('error with vin list data') }
    else if (!response.ok) { console.log('error with appointments list data') }

    else {
      const vinData = await vinResponse.json();
      let vins = []
      for (const auto of vinData.autos) {
        vins.push(auto.vin)
      }
      const data = await response.json();
      const result = data.appointments
      for (const auto of result) {
        if (vins.includes(auto.vin)) { auto["isVip"] = "Yes" }
        else { auto["isVip"] = "No" }
      }
      setAppts(result)
      setSearchVin('')
    }
  }


  const handleSearchChange = async (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setSearchVin(value);
    setSubmittedVinSearch('');
  }


  const handleSearchSubmit = async () => {
    setSubmittedVinSearch(searchVin);
    getData();
  }


  function getDate(utcDate) {
    const event = new Date(utcDate)
    return event.toLocaleDateString()
  }


  function getTime(utcDate) {
    const event = new Date(utcDate)
    return event.toLocaleTimeString()
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.value;
    const deleteUrl = `http://localhost:8080/api/appointments/${id}/`
    const fetchOptions = {
        method: "DELETE"
    }
    const response = await fetch(deleteUrl, fetchOptions)
    if (response.ok) {
        getData();
    }
}

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <h1>Service History</h1>
      <div className='input-group mb-3'>
        <input placeholder="Search by VIN..." required type="text" name="search" value={searchVin} onChange={handleSearchChange} id="search" className="form-control" />
        <div>
          <button onClick={() => handleSearchSubmit()} className="btn btn-outline-secondary" type="button">Search</button>
        </div>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">VIN</th>
              <th scope="col">Is VIP?</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Technician</th>
              <th scope="col">Reason</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {appts && appts.filter((appt) => appt.vin === submittedVinSearch ).map(appt => {
              if (appt.vin === submittedVinSearch || searchVin.length === 0) {
                return (
                  <tr key={appt.id}>
                    <td>{appt.vin}</td>
                    <td>{appt.isVip}</td>
                    <td>{appt.customer}</td>
                    <td>{getDate(appt.date_time)}</td>
                    <td>{getTime(appt.date_time)}</td>
                    <td>{appt.technician.first_name} {appt.technician.last_name}</td>
                    <td>{appt.reason}</td>
                    <td>{appt.status}</td>
                    <td><button onClick={handleDelete} className="btn btn-danger" value={appt.id}>Remove</button></td>
                  </tr>
                );
              }
            })}

          </tbody>
        </table>
      </div>
    </div>
  )

}


export default ServiceHistory;
