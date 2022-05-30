import React, { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './Views/Category';
import Products from "./Components/Products";
import Cart from './Components/Cart';
import { getProducts } from "./Components/ApiCalls";

import { connect } from "react-redux";
import { setCategories } from './Redux/redux-actions/redux_actions';

class App extends Component {
  componentDidMount() {
    getProducts(this.props.setCategories)
  }
  render = () => (

    <Router>
      <Navbar />
      <Routes>
        {this.props.categories.map(route => {
          //we are mapping categories to display in app bar
          return <Route key={"router-" + route.name} path={route.name} element={<Category />} />
        })}
        <Route path="viewproduct" element={<Products />} />
        <Route path="shopcard" element={<Cart />} />

      </Routes>
    </Router>

  );
}
const mapStateToProps = (state) => {
  return {
    categories: state.ProductsReducer.categories
  }
}
const mapDispatchToProps = () => {
  return {
    setCategories
  }
}
export default connect(mapStateToProps, mapDispatchToProps())(App)


