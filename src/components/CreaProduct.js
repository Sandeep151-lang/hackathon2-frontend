import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios';

const CreaProduct = () => {


    const [buy, setbuy] = useState({
        Product_Name: '',
        Product_Price: '',
        Product_time: '',
        Product_image: '',
    })

    const buyProduct = (e) => {

        const name = e.target.id;
        setbuy({ ...buy, [name]: e.target.value });

    }


    const buy_Product = async (e) => {
        e.preventDefault();
        try {
            const url = `https://hackathon2-back.herokuapp.com/createProduct`;
            const d = await axios.post(url, buy);
            setbuy(d.data)
        } catch {
            console.log('error')
        }

    }
    return (
        <div className="container">
            <h2>Creat Product</h2>
            <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">product Name</Label>
                    <Input type="text" id="Product_Name" placeholder='product name' value={buy.Product_Name} onChange={buyProduct} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">product price</Label>
                    <Input type="text" id="Product_Price" placeholder="product price" value={buy.Product_Price} onChange={buyProduct} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Product_time</Label>
                    <Input type="number" id="Product_time" placeholder="enter product time for hiring" value={buy.Product_time} onChange={buyProduct} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Product_image</Label>
                    <Input type="text" id="Product_image" placeholder="enter image link" value={buy.Product_image} onChange={buyProduct} />
                </FormGroup>

                <Button className='btn my-2  btn-success' onClick={buy_Product}>Create</Button>
            </Form >
        </div>
    )
}

export default CreaProduct
