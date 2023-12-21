import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function TechList(props) {
  const [techs, setTechs] = useState([])
  async function getData() {
    const response = await fetch('http://localhost:8080/api/technicians/')

    if (!response.ok) {
      console.log('error with technicians list data')
    } else {
      const data = await response.json();
      setTechs(data.techs)
    }
  }


  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.value;
    const deleteUrl = `http://localhost:8080/api/technicians/${id}/`
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
      <h1>Technicians</h1>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {techs && techs.map(tech => {
              return (
                <tr key={tech.id}>
                  <td>{tech.employee_id}</td>
                  <td>{tech.first_name}</td>
                  <td>{tech.last_name}</td>
                  <td><button onClick={handleDelete} className="btn btn-danger" value={tech.id}>Remove</button></td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  )

}
export default TechList;
