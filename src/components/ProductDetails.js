import React, { useContext, useState } from 'react'
import { MyContext } from '../App';
import { Card, Button, CardText, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';



const ProductDetails = () => {
    const context = useContext(MyContext);

    const { onRemove } = context





    const [buy, setbuy] = useState({
        Product_name: '',
        Product_price: '',
        User_name: '',
        User_email: '',
        User_number: ''
    })

    const buyProduct = (e) => {

        const name = e.target.id;
        setbuy({ ...buy, [name]: e.target.value });

    }

    const history = useHistory();

    const remove = () => {
        history.push('/')
    }

    const buy_Product = async (e) => {
        e.preventDefault();
        try {
            const url = `https://hackathon2-back.herokuapp.com/buyProduct`;
            const d = await axios.post(url, buy);

            setbuy(d.data)
        } catch {
            console.log('error')
        }

    }



    return (
        <div>

            <div className="container">

                <Row>
                    {
                        context.cartItems.map((item, key) => {
                            //destructuring the products 
                            console.log({ message: item.Product_Name })
                            const { Product_Name, Product_image, Product_Price, Product_time } = item;
                            return (
                                <div className="d-flex">
                                    <Col sm="4" key={key} className="py-3 ">
                                        <Card body>
                                            <img src={Product_image} className="card-img-top" alt="..." style={{ height: '200px' }} />
                                            <CardText className="text-center bold">{Product_Name}</CardText>
                                            <CardText className="text-center bold">{Product_Price}<span className="text-bolder"> Rs</span></CardText>
                                            <CardText className="text-center bold">{Product_time} <span className="bolder">hr</span></CardText>
                                            {/* <Button className={"btn my-4 mx-5 btn-success " + (cartItems.find((x) => x.id === product.id) ? "disabled" : "btn-success")} onClick={() => onAdd(product)}>Add to Cart</Button> */}
                                            <Button className='btn my-4 mx-5 btn-success' onClick={() => {
                                                onRemove(item)
                                                remove()
                                            }}>Remove</Button>

                                        </Card>
                                    </Col>
                                    <Col sm="4" className="py-3 mx-5">
                                        <h2>Buy Product</h2>
                                        <Form inline>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="examplePassword" className="mr-sm-2">product Name</Label>
                                                <Input type="text" id="Product_name" placeholder={Product_Name} value={item.Product_name} onChange={buyProduct} disabled />
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="examplePassword" className="mr-sm-2">product price</Label>
                                                <Input type="text" id="Product_price" placeholder={Product_Price} value={buy.Product_price} onChange={buyProduct} disabled />
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="exampleEmail" className="mr-sm-2">Name</Label>
                                                <Input type="text" id="User_name" placeholder="enter your name" value={buy.User_name} onChange={buyProduct} />
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                                <Input type="email" id="User_email" placeholder="enter your email" value={buy.User_email} onChange={buyProduct} />
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="exampleEmail" className="mr-sm-2">Phone Number</Label>
                                                <Input type="text" id="User_number" placeholder="enter your phone number" value={buy.User_number} onChange={buyProduct} />
                                            </FormGroup>

                                            <Button className='btn my-2 mx-5 btn-success' onClick={buy_Product}>Buy</Button>
                                        </Form >
                                    </Col>
                                </div>
                            )
                        })

                    }
                </Row>
            </div>



        </div>
    )
}

export default ProductDetails
    // < Form inline >
    //             <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    //                 <Label for="exampleEmail" className="mr-sm-2">Email</Label>
    //                 <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
    //             </FormGroup>
    //             <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    //                 <Label for="examplePassword" className="mr-sm-2">Password</Label>
    //                 <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
    //             </FormGroup>
    //             <Button>Submit</Button>
    //         </Form >