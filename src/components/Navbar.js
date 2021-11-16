import React from 'react'
import { Button } from 'reactstrap';
import { useHistory } from 'react-router';


const Navbar = () => {
    const history = useHistory();
    const createProduct = () => {
        history.push('/create')
    }

    return (
        <div className="container d-flex">
            <h1 className="text-center">Equipments Rental Products</h1>
            <span><Button className='btn myy-4 mx-5 btn-success my-2' onClick={createProduct}>Crea Product</Button></span>
        </div>
    )
}

export default Navbar
