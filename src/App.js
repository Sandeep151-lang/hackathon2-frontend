
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreaProduct from './components/CreaProduct';
// import data from './components/data';
import axios from 'axios';
import { useHistory } from 'react-router';
import ProductDetails from './components/ProductDetails';
export const MyContext = React.createContext();

function App() {
  const history = useHistory();
  const [data, setdata] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    setCartItems([...cartItems, product])


  }

  const url = `http://localhost:5000/getProduct`;
  const userdata = async () => {
    try {
      const d = await axios.get(url);
      console.log(d.data.item)
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
