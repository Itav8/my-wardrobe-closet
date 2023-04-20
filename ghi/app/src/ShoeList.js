import { React, useState, useEffect } from 'react'

const ShoeList = ({ dummy }) => {
    const API_URL = "http://localhost:8080/api/shoes"      // for DELETE
    const [shoes, setShoes] = useState([]);

    const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
        try {
            const response = await fetch(url, optionsObj);
            if (!response.ok) throw Error('Please reload the app');
        } catch (err) {
            errMsg = err.message;
        } finally {         // will always execute whether error or not
            return errMsg;
        }
    }

    const handleDelete = async (id) => {
        const newShoes = shoes.filter((shoe) => shoe.id !== id);
        setShoes(newShoes);

        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) {
            console.log(result);
        } else {
            console.log(`else! ${result}`)
        }
    }

    const fetchData = async () => {
        const shoesResponse = await fetch (API_URL);
        if(shoesResponse.ok) {
            const data = await shoesResponse.json();
            setShoes(data.shoes);
        } else {
            throw new Error('Shoes Response not ok!');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    return (
    <div>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Delete?</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map(shoe => {
                    return (
                        <tr key={shoe.model_name}>
                            <td>{ shoe.manufacturer }</td>
                            <td>{ shoe.model_name }</td>
                            <td>
                                <button role="button" onClick={() => handleDelete(shoe.id)}>
                                    { shoe.id }
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default ShoeList
