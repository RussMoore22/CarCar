import React, {useEffect, useState} from "react";

function TechCreateForm(props){
    const techInit = {
        first_name: '',
        last_name: '',
        employee_id: '',
    };
    const [formData, setFormData] = useState(techInit);

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
        const techUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            body: JSON.stringify(formData),
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(techUrl, fetchConfig);
        if (response.ok){
            setFormData(techInit)
        }
    }


    return (
        <div>
        <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Add a technician</h1>
                  <form onSubmit={handleSubmit} id="create-technician-form">
                  <div className="form-floating mb-3">
                        <input placeholder="first_name" required type="text" name="first_name" value={formData.first_name} onChange={handleFormChange}  id="first_name" className="form-control" />
                        <label htmlFor="first_name">First name...</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input placeholder="last_name" required type="text" name="last_name" value={formData.last_name} onChange={handleFormChange}  id="last_name" className="form-control" />
                        <label htmlFor="last_name">Last name...</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input placeholder="employee_id" required type="text" name="employee_id" value={formData.employee_id} onChange={handleFormChange}  id="employee_id" className="form-control" />
                        <label htmlFor="employee_id">Employee ID...</label>
                      </div>

                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>

            </div>


    );
}
export default TechCreateForm;
