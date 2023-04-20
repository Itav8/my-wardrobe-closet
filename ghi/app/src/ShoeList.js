import React from 'react'

const ShoeList = ({ shoes }) => {
  return (
    <div>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map(shoe => {
                    return (
                        <tr key={shoe.model_name}>
                            <td>{ shoe.manufacturer }</td>
                            <td>{ shoe.model_name }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ShoeList
