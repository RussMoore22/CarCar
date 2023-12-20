import React, {useState, useEffect} from "react";

function SaleList() {
    const [sales, setSales] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const id = event.target.value;
        const deleteUrl = `http://localhost:8090/api/sales/${id}/`
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
            <h1>Sales</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Employee ID</th>
                        <th>Customer</th>
                        <th>Vehicle VIN</th>
                        <th>Sale Price</th>
                        <th>Erase Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((s) => {
                        return (
                            <tr key={s.id}>
                                <td>{ `${s.salesperson.first_name} ${s.salesperson.last_name}` }</td>
                                <td>{ s.salesperson.employee_id }</td>
                                <td>{ `${s.customer.first_name} ${s.customer.last_name}`}</td>
                                <td>{ s.automobile.vin }</td>
                                <td>{ s.price }</td>
                                <td><button onClick={handleDelete} className="btn btn-danger" value={s.id}>Remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )

}

export default SaleList;
