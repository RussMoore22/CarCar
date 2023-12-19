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
                    auto["isVip"] = "true"
                }
                else {
                    auto["isVip"] = "false"
                }
            }
            console.log(result)
            setAppts(result)
            }

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
    return (
        <tr key={appt.id}>
        <td>{ appt.vin }</td>
        <td>{ appt.isVip }</td>
        <td>{ appt.customer }</td>
        <td>{ appt.date_time }</td>
        <td>{ appt.date_time }</td>
        <td>{ appt.technician.first_name } { appt.technician.last_name }</td>
        <td>{ appt.reason }</td>
        <td> cancel finish </td>
        </tr>
    );
    })}

    </tbody>
</table>
    <div>
        <Link to='/appointments/create' className="btn btn-info" >Create a new appointment</Link>
    </div>
</div>
)

}
export default ApptList;
