import React, {useEffect, useState} from "react";



function VehicleModelCreateForm(props){
    const modelInit = {
        picture_url: '',
        name: '',
        manufacturer_id: '',
    }
    const [formData, setFormData] = useState(modelInit);
    const [manufacturers, setManufacturers] = useState([])


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
        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            body: JSON.stringify(formData),
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok){
            setFormData(modelInit)
        }
    }
    const fetchData = async () => {
        const ManufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(ManufacturerUrl);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
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
                  <h1>Create a new vehicle model</h1>
                  <form onSubmit={handleSubmit} id="create-vehicle-model-form">

                  <div className="form-floating mb-3">
                        <input placeholder="name" required type="text" name="name" value={formData.name} onChange={handleFormChange}  id="name" className="form-control" />
                        <label htmlFor="name">Model Name</label>
                  </div>
                      <div className="form-floating mb-3">
                        <input placeholder="picture_url" required type="text" name="picture_url" value={formData.picture_url} onChange={handleFormChange}  id="picture_url" className="form-control" />
                        <label htmlFor="picture_url">Picture Url</label>
                      </div>

                    <div className="mb-3">
                      <select required onChange={handleFormChange} name="manufacturer_id" id="manufacturer_id" value={formData.manufacturer_id} className="form-select">
                        <option value="manufacturer_id">Choose a manufacturer</option>
                        {manufacturers.map(manufacturer => {
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
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

export default VehicleModelCreateForm;
