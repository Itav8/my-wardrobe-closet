import { React, useState, useEffect } from 'react'

const ShoeForm = () => {
    const [manufacturer, setManufacturer] = useState([]);
    const [modelName, setModelName] = useState([]);

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }
    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.manufacturer = manufacturer;
        data.modelName = modelName;
        console.log(data);

        const shoeUrl = "http://localhost:8080/api/shoes/";
        const fetchConfig = {
            method: "post",
            body : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);

            setManufacturer('');
            setModelName('');
        }
    }


  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <p>Please Create a Shoe</p>
            <div className="mb-3">
            <select name="" id="">
                <option value="">Choose a Bin</option>
            </select>
            </div>
            <div className="mb-3">
                <input value={manufacturer} onChange={handleManufacturerChange} required placeholder="Manufacturer" type="text" id="manufacturer" name="manufacturer" className="form-control" />
                <label htmlFor="manufacturer">The Manufacturer</label>
            </div>
            <div className="mb-3">
                <input value={modelName} onChange={handleModelNameChange} required placeholder="Model Name" type="text" id="model_name" name="model_name" className="form-control" />
                <label htmlFor="model_name">The Model Name</label>
            </div>
            <button className='btn btn-lg btn-primary'>Create!</button>
        </form>
    </div>
  )
}

export default ShoeForm
