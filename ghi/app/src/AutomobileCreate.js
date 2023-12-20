import React, {useEffect, useState} from "react";



function AutomobileCreateForm(props){
    const autoInit = {
        color: '',
        year: '',
        vin: '',
        model_id: '',
    }
    const [formData, setFormData] = useState(autoInit);
    const [models, setModels] = useState([])


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
        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            body: JSON.stringify(formData),
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok){
            setFormData(autoInit)
        }
    }
    const fetchData = async () => {
        const modelUrl = 'http://localhost:8100/api/models/';
        const response = await fetch(modelUrl);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
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
                  <h1>Add an automobile to inventory</h1>
                  <form onSubmit={handleSubmit} id="create-automobile-form">
                      <div className="form-floating mb-3">
                        <input placeholder="color" required type="text" name="color" value={formData.color} onChange={handleFormChange}  id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input placeholder="year" required type="number" name="year" value={formData.year} onChange={handleFormChange}  id="year" className="form-control" />
                        <label htmlFor="year">Year</label>
                      </div>
                  <div className="form-floating mb-3">
                        <input placeholder="vin" required type="text" name="vin" value={formData.vin} onChange={handleFormChange}  id="vin" className="form-control" />
                        <label htmlFor="vin">VIN</label>
                      </div>

                    <div className="mb-3">
                      <select required onChange={handleFormChange} name="model_id" id="model_id" value={formData.model_id} className="form-select">
                        <option value="model_id">Choose a model</option>
                        {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            );
                        })}
                      </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>

            </div>
    );

}

export default AutomobileCreateForm;
