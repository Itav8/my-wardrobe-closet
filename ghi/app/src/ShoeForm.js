import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ShoeForm = () => {
    const navigate = useNavigate();
    const [bins, setBins] = useState([]);
    const [bin, setBin] = useState([]);
    const [manufacturer, setManufacturer] = useState([]);
    const [modelName, setModelName] = useState([]);
    const [color, setColor] = useState([]);
    const [pictureUrl, setPictureUrl] = useState([]);

    const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value);
    }
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }
    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.bin = bin;
        data.manufacturer = manufacturer;
        data.model_name = modelName;
        data.color = color;
        data.picture_url = pictureUrl;
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
            setBin('');
            setColor('');
            setPictureUrl('');
        }

        navigate("/shoes");
    }

    const fetchData = async () => {
        const binsUrl = "http://localhost:8100/api/bins/";

        const binsResponse = await fetch (binsUrl);
        if(binsResponse.ok) {
            const data = await binsResponse.json();
            setBins(data.bins);
        } else {
            throw new Error('Bins Response not ok!');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);



    return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <p>Please Create a Shoe</p>
            <div className="mb-3">
            <select onChange={handleBinChange} name="bin" id="bin" className='form-select' required>
                <option value="">Choose a Bin</option>
                {bins.map(bin => {
                    return (
                        <option key={bin.id} value={bin.bin_number}>
                            {`${bin.closet_name} - ${bin.bin_number}`}
                        </option>
                    )
                })}
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
            <div className="mb-3">
                <input value={color} onChange={handleColorChange} required placeholder="Color of shoe" type="text" id="color" name="color" className="form-control" />
                <label htmlFor="color">The Shoe Color</label>
            </div>
            <div className="mb-3">
                <input value={pictureUrl} onChange={handlePictureUrlChange} required placeholder="Enter a valid URL" type="url" id="pictureUrl" name="pictureUrl" className="form-control" />
                <label htmlFor="pictureUrl">Enter a valid URL</label>
            </div>
            <button className='btn btn-lg btn-primary'>Create!</button>
        </form>
    </div>
    )
}

export default ShoeForm
