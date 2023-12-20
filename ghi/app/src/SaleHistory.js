import React, {useState, useEffect} from "react";

function SaleHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const handleSPChange = async (event) => {
        const id = event.target.value;
        setSalesperson(id);
        getSales(id)
    }

    const [sales, setSales] = useState([]);
    const fetchData = async () => {

        const sUrl = "http://localhost:8090/api/salespeople/";
        const sResponse = await fetch(sUrl);
        if (sResponse.ok) {
            const sData = await sResponse.json();
            setSalespeople(sData.salespeople);
        }
    }
    const getSales = async (sp) => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const results = data.sales;
            const filtered = [];
            for (const r of results) {
                if (r.salesperson.id == sp) {
                    filtered.push(r);
                }
            }

            setSales(filtered);
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
            getSales(salesperson);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>Sale Records</h1>
            <form id="select-sp">
            <div className="mb-3">
                <select  onChange={handleSPChange} required id="salespeople" name="salespeople" className="form-select" value={salesperson}>
                <option value="">Select Salesperson</option>
                {salespeople.map(p => {
                    return (
                        <option key={p.id} value={p.id}>
                            {`${p.first_name} ${p.last_name}`}
                        </option>
                    )
                })}
                </select>
            </div>
            </form>
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

export default SaleHistory;
