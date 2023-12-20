import React, {useEffect, useState} from "react";



function AppointmentCreateForm(props){
    const apptInit = {
        date_time: '',
        reason: '',
        customer: '',
        status: '',
        vin: '',
        technician: '',
    }
    const [formData, setFormData] = useState(apptInit);
    const [techs, setTechs] = useState([])


    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]:value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apptUrl = 'http://localhost:8080/api/appointments/';
        formData.status = "CREATED"
        const fetchConfig = {
            body: JSON.stringify(formData),
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(apptUrl, fetchConfig);
        if (response.ok){
            setFormData(apptInit)
        }
    }
    const fetchData = async () => {
        const techUrl = 'http://localhost:8080/api/technicians/';
        const response = await fetch(techUrl);

        if (response.ok) {
            const data = await response.json();
            setTechs(data.techs)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
        <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a new appointment</h1>
                  <form onSubmit={handleSubmit} id="create-appointment-form">
                  <div className="form-floating mb-3">
                        <input placeholder="vin" required type="text" name="vin" value={formData.vin} onChange={handleFormChange}  id="vin" className="form-control" />
                        <label htmlFor="vin">Automobile VIN</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input placeholder="customer" required type="text" name="customer" value={formData.customer} onChange={handleFormChange}  id="customer" className="form-control" />
                        <label htmlFor="customer">Customer</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input placeholder="date_time" required type="datetime-local" name="date_time" value={formData.date_time} onChange={handleFormChange}  id="date_time" className="form-control" />
                        <label htmlFor="date_time">Date and Time</label>
                      </div>




                    <div className="mb-3">
                      <select required onChange={handleFormChange} name="technician" id="technician" value={formData.technician} className="form-select">
                        <option value="technician">Choose a technician</option>
                        {techs.map(tech => {
                            return (
                                <option key={tech.id} value={tech.id}>
                                    {tech.employee_id}
                                </option>
                            );
                        })}
                      </select>
                      <div className="form-floating mb-3">
                        <input placeholder="reason" required type="text" name="reason" value={formData.reason} onChange={handleFormChange}  id="reason" className="form-control" />
                        <label htmlFor="reason">Reason</label>
                      </div>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>

            </div>
    );

}

export default AppointmentCreateForm;
