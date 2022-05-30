import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridContainer, Grid, Card, Tith1, Styledspan, SpanPrice } from "../Components/WomanElements";
import { getCategoryByTitle } from "../Components/ApiCalls";
import { setSelectedCategories, setSelectedProduct } from '../Redux/redux-actions/redux_actions'
import {
  NavLink

} from "../Components/Navbar/NavbarElements";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      products: []
    };
  }
  componentDidMount() {
    getCategoryByTitle(this.props.selectedCategory).then(
      res => res.json()
    ).then(res => {
      this.setState({ category: res.data.category.name });
      this.setState({ products: res.data.category.products });
    })
  }
  componentDidUpdate(prevProps, prevState) {

    if (this.props.selectedCategory !== prevProps.selectedCategory) {

      getCategoryByTitle(this.props.selectedCategory).then(
        res => res.json()
      ).then(res => {
        this.setState({ category: res.data.category.name });
        this.setState({ products: res.data.category.products });
      })

    }

  }
  onViewProduct = (productId) => {

    this.props.setSelectedProduct(productId)
  }
  render = () => (
    <>
      <Tith1 >{this.state.category}</Tith1>
      <GridContainer>

        {this.state.products.map(product => {

          return <Grid key={"category-" + product.name + 1}>
            <Card >
              <NavLink onClick={() => this.onViewProduct(product.id)} to={"/viewproduct"} >


                <img style={{ width: "354px", height: "330px" }} src={product.gallery[0]} alt="fireSpot" />
              </NavLink>
              <Styledspan>{product.name}</Styledspan>
              <SpanPrice>{product.prices[0].currency.symbol + product.prices[0].amount}</SpanPrice>

            </Card>

          </Grid>
        })}

      </GridContainer>
    </>
  );
}
const mapStateToProps = (state) => {

  return {
    selectedCategory: state.ProductsReducer.selectedCategory
  }
}
const mapDispatchToProps = () => {
  return {
    setSelectedCategories,
    setSelectedProduct
  }
}
export default connect(mapStateToProps, mapDispatchToProps())(Category)


