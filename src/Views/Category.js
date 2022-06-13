import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridContainer, Grid, Card, Tith1, Styledspan, SpanPrice, CategoryLink, CartImgContainer, CartImg } from "../Components/CategoryElements";
import { getCategoryByTitle, getProductById } from "../Components/ApiCalls";
import { setSelectedCategories, setSelectedProduct, addToCard } from '../Redux/redux-actions/redux_actions';
import { PictureDiv } from '../Components/CartElements';
import cartImg from "../Pictures/EmptyCart.png"
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      products: [],
      showCartButton: ""
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
  addToCart = (e, productId) => {
    e.stopPropagation();
    getProductById(productId).then(
      res => res.json()
    ).then(res => {

      let selectedAtrrs = []
      selectedAtrrs = res.data.product.attributes.map(el => {
        return { name: el.name, value: el.items[0].value }
      })
      let submit = {
        product: res.data.product,
        selectedAtributes: selectedAtrrs,
        count: 1
      }
      this.props.addToCard(submit)


    })
  }

  render = () => (
    <>
      <Tith1 >{this.state.category}</Tith1>
      <GridContainer>

        {this.state.products.map(product => {

          return <Grid key={"category-" + product.name + 1}>
            <Card onMouseEnter={e => {
              this.setState({ showCartButton: product.id });

            }}
              onMouseLeave={e => {
                this.setState({ showCartButton: "" });
              }} >

              <CategoryLink onClick={() => this.onViewProduct(product.id)} to={"/viewproduct"} >

                <PictureDiv outOfStock={product.inStock} img={product.gallery[0]} category >{product.inStock ? "OUT OF STOCK" : null}</PictureDiv>
              </CategoryLink>
              <CartImgContainer show={!product.inStock && this.state.showCartButton === product.id}>
                <CartImg onClick={(e) => this.addToCart(e, product.id)} ><img src={cartImg} /></CartImg>
              </CartImgContainer>

              <Styledspan>{product.brand + " " + product.name}</Styledspan>
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
    setSelectedProduct,
    addToCard,

  }
}
export default connect(mapStateToProps, mapDispatchToProps())(Category)


