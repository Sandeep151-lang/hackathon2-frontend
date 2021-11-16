
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreaProduct from './components/CreaProduct';
import axios from 'axios';

import ProductDetails from './components/ProductDetails';
export const MyContext = React.createContext();

function App() {

  const [data, setdata] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    setCartItems([...cartItems, product])


  }

  const url = `https://hackathon2-back.herokuapp.com/getProduct`;
  const userdata = async () => {
    try {
      const d = await axios.get(url);
      setdata(d.data.item);

    } catch (err) {
      console.log(err, "errr");
    }
  }

  const onRemove = (product) => {
    setCartItems(cartItems.filter((x) => x.id !== product.id))
  }

  useEffect(() => {
    userdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    <Router>
      <MyContext.Provider value={{ data, onAdd, onRemove, cartItems }}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/product' component={ProductDetails} />
          <Route path='/create' component={CreaProduct} />
          <Redirect to="/" />
        </Switch>
      </MyContext.Provider>
    </Router>
  </>;
}

export default App;
