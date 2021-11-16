import React, { useContext } from 'react'
import { Card, Button, CardText, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { MyContext } from '../App';
// import axios from 'axios';

const HomePage = () => {
    const history = useHistory();
    const push = () => {
        history.push('/product')
    }
    const context = useContext(MyContext);

    return (
        <div>
            <div className="container">
                <Row>
                    {
                        context.data.map((product, key) => {
                            //destructuring the products 
                            const { Product_Name, Product_image, Product_Price, Product_time } = product;
                            return (
                                <Col sm="4" key={key} className="py-3 ">
                                    <Card body>
                                        <img src={Product_image} className="card-img-top" alt="..." style={{ height: '200px' }} />
                                        <CardText className="text-center bold">{Product_Name}</CardText>
                                        <CardText className="text-center bold">{Product_Price}<span className="text-bolder"> Rs</span></CardText>
                                        <CardText className="text-center bold">{Product_time} <span className="bolder">hr</span></CardText>
                                        {/* <Button className={"btn my-4 mx-5 btn-success " + (cartItems.find((x) => x.id === product.id) ? "disabled" : "btn-success")} onClick={() => onAdd(product)}>Add to Cart</Button> */}
                                        <Button className='btn myy-4 mx-5 btn-success' onClick={() => {
                                            context.onAdd(product)
                                            push()
                                        }}>Add</Button>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </div>
    )
}

export default HomePage
