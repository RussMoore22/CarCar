import React, {useState, useEffect} from "react";

function VehicleList() {
    const [vehicles, setVehicles] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setVehicles(data.models);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const id = event.target.value;
        const deleteUrl = `http://localhost:8100/api/models/${id}/`
        const fetchOptions = {
            method: "DELETE"
        }
        const response = await fetch(deleteUrl, fetchOptions)
        if (response.ok) {
            fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Picture</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map((v) => {
                    return (
                        <tr key={v.id}>
                            <td>{ v.manufacturer.name }</td>
                            <td>{ v.name }</td>
                            <td><img src={v.picture_url} width={120} /></td>
                            <td><button onClick={handleDelete} className="btn btn-danger" value={v.id}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    )

}

export default VehicleList;
