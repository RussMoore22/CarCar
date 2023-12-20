import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';


function ApptList(props) {
    const [appts, setAppts] = useState([])


    async function getData() {
        const vinResponse = await fetch('http://localhost:8080/api/automobiles/')
        const response = await fetch('http://localhost:8080/api/appointments/')

        if (!vinResponse.ok) {
            console.log('error with vin list data')
        }
        else if (!response.ok) {
            console.log('error with appointments list data')
        }

        else {
            const vinData = await vinResponse.json();
            console.log(vinData.autos)
            let vins = []
            for (const auto of vinData.autos){
                vins.push(auto.vin)
            }
            const data = await response.json();
            const result = data.appointments
            for (const auto of result) {
                if (vins.includes(auto.vin)){
                    auto["isVip"] = "yes"
                }
                else {
                    auto["isVip"] = "no"
                }
            }
            console.log(result)
            setAppts(result)
            }

    }

    const handleFinish = async (id) => {
        const request = await fetch(
            `http://localhost:8080/api/appointments/${id}/finish/`,
            { method: "PUT" }
        );
        const resp = await request.json();
        getData();
    }

    const handleCancel = async (id) => {
        const request = await fetch(
            `http://localhost:8080/api/appointments/${id}/cancel/`,
            { method: "PUT" }
        );
        const resp = await request.json();
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

useEffect(() => {
    getData()

}, []);


return (
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
        <th scope="col">Change Status</th>

    </tr>
    </thead>
    <tbody>

    {appts && appts.map(appt => {
        if (appt.status ==="FINISHED" || appt.status ==="CANCELLED" || appt.status ==="CREATED" )
        {
    return (
        <tr key={appt.id}>
        <td>{ appt.vin }</td>
        <td>{ appt.isVip }</td>
        <td>{ appt.customer }</td>
        <td>{ getDate(appt.date_time) }</td>
        <td>{ getTime(appt.date_time) }</td>
        <td>{ appt.technician.first_name } { appt.technician.last_name }</td>
        <td>{ appt.reason }</td>
        <td>
        <button onClick={() => handleCancel(appt.id)} className="btn btn-danger">Cancel</button>
        <button onClick={() => handleFinish(appt.id)} className="btn btn-success">Finish</button>

        </td>
        </tr>
    );
    }})}

    </tbody>
</table>
</div>
)

}
export default ApptList;
