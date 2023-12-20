import React, {useEffect, useState} from "react";
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
useEffect(() => {
    getData()
}, []);

const handleDelete = async (id) => {
    const request = await fetch(
        `http://localhost:8080/api/technicians/${id}/`,
        { method: "DELETE"}
    );
    const resp = await request.json();
    getData();
}
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
    </tr>
    </thead>
    <tbody>

    {techs && techs.map(tech => {
    return (
        <tr key={tech.id}>
        <td>{ tech.employee_id }</td>
        <td>{ tech.first_name }</td>
        <td>{ tech.last_name }</td>

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
