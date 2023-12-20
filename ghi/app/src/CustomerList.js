import React, {useState, useEffect} from "react";

function CustomerList() {
    const [people, setPeople] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setPeople(data.customers);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const id = event.target.value;
        const deleteUrl = `http://localhost:8090/api/customers/${id}/`
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
            <h1>Customers</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {people.map((p) => {
                    return (
                        <tr key={p.id}>
                            <td>{ p.first_name }</td>
                            <td>{ p.last_name }</td>
                            <td>{ p.address }</td>
                            <td>{ p.phone_number }</td>
                            <td><button onClick={handleDelete} className="btn btn-danger" value={p.id}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    </div>
    )

}

export default CustomerList;
