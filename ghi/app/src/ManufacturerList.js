import React, {useState, useEffect} from "react";

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const id = event.target.value;
        const deleteUrl = `http://localhost:8100/api/manufacturers/${id}/`
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
        <div>
            <h1>Manufacturers</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Manufacturers</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map((m) => {
                    return (
                        <tr key={m.id}>
                            <td>{ m.name }</td>
                            <td><button onClick={handleDelete} className="btn btn-danger" value={m.id}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    </div>
    )

}

export default ManufacturerList;
