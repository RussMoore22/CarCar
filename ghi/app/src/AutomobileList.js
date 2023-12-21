import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function AutomobileList(props) {
  const [autos, setAutos] = useState([])

  async function getData() {
    const response = await fetch('http://localhost:8100/api/automobiles/')

    if (!response.ok) {
      console.log('error with automobile list data')
    }

    else {
      const data = await response.json();
      setAutos(data.autos)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    const vin = event.target.value;
    const deleteUrl = `http://localhost:8100/api/automobiles/${vin}/`
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
      <div>
        <h1>Automobiles</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">VIN</th>
            <th scope="col">Color</th>
            <th scope="col">Year</th>
            <th scope="col">Model</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Sold</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {autos && autos.map(auto => {
            return (
              <tr key={auto.id}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td>
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
                <td>{auto.sold ? 'Yes' : 'No'}</td>
                <td><button onClick={handleDelete} className="btn btn-danger" value={auto.vin}>Remove</button></td>
              </tr>
            );
          })}

        </tbody>
      </table>

    </div>
  );

}
export default AutomobileList;
