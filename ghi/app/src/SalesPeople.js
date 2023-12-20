import React, {useState, useEffect} from "react";

function SalesPeople() {
    const [people, setPeople] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setPeople(data.salespeople);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const id = event.target.value;
        const deleteUrl = `http://localhost:8090/api/salespeople/${id}/`
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
            <h1>Salespeople</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {people.map((p) => {
                    return (
                        <tr key={p.id}>
                            <td>{ p.first_name }</td>
                            <td>{ p.last_name }</td>
                            <td>{ p.employee_id }</td>
                            <td><button onClick={handleDelete} className="bton btn-danger" value={p.id}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    </div>
    )

}

export default SalesPeople;
