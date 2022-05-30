import React, { Component } from 'react';
import { cartProductCount, cartProductChangeAtr, checkOut } from '../Redux/redux-actions/redux_actions'

import {
    CounterButtons,
    CartSpan,
    ApolloDiv,
    RunningShortDiv,
    PriceDiv,
    CardDiv,
    IncCardDiv,
    SummaryDiv,
    SumSpan,
    PictureDiv,
    PictureImg,
    OthersBtns,
    SizeH33,
    TotalDiv,
    ResultDiv
} from './CartElements';
import {

    BagLink,
    CheckButton,

} from "../Components/Navbar/NavbarElements";

import { connect } from "react-redux";


class MiniCarD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            quantity: 0,
            tax: 0,
            galleryImgs: []
        };
    }
    componentDidMount() {
        this.calculateTotal()
        let gallery = []
        for (let index = 0; index < this.props.cartProdutcts.length; index++) {

            gallery.push({
                selected: 0
            })
        }
        this.setState({ galleryImgs: gallery });
    }
    componentDidUpdate(prevProps, prevState) {

        if (this.props.cartProdutcts !== prevProps.cartProdutcts || this.props.currency !== prevProps.currency) {

            this.calculateTotal()

        }

    }
    calculateTotal = () => {
        let total = 0
        this.props.cartProdutcts.filter(product => {

            product.product.prices.filter(curr => {

                if (curr.currency.symbol === this.props.currency) {

                    total = total + curr.amount * product.count

                }
            })

        })
        this.setState({ total: total });
        let quantity = this.props.cartProdutcts.reduce((partialSum, a) => partialSum + a.count, 0)
        this.setState({ quantity: quantity });

        let tax = (total / 100) * 21;
        this.setState({ tax: tax });
    }
    handleCount = (newCount, id) => {


        if (newCount === 0) {
            alert("cant be lower than 1")
        } else {
            let payload = {
                count: newCount,
                id: id
            }
            this.props.cartProductCount(payload)
        }
    };
    onChangeAttribute = (currentAttribute, title, nextAttribute, id) => {

        let attribut = this.props.cartProdutcts[currentAttribute].selectedAtributes.find(x => x.name == title);
        attribut.value = nextAttribute.value

        let payload = {
            attribut: attribut,
            id: id
        }
        this.props.cartProductChangeAtr(payload)


    };
    onCheckOut = (e) => {
        e.preventDefault()
        this.props.checkOut()
    }
    render = () => (
        <>
            <div style={{
                marginTop: "20px",
                marginBottom: "20px",

            }} >
                <CartSpan mini>My Bag: {this.props.cartProdutcts.length} items</CartSpan>
            </div>


            {this.props.cartProdutcts.map((product, index) => {


                return <>

                    <div key={"mini-card-id" + index} >
                        <CardDiv mini >

                            <ApolloDiv mini>{product.product.brand}</ApolloDiv>

                            <RunningShortDiv mini>{product.product.name}</RunningShortDiv>
                            <PriceDiv mini >{product.product.prices.map(curr => {

                                if (curr.currency.symbol === this.props.currency) {
                                    return curr.currency.symbol + curr.amount
                                }
                            })}
                            </PriceDiv>
                            <div  >
                                {product.product.attributes.map((attribute) => {


                                    return <div key={attribute.id}><SizeH33 mini >{attribute.name}</SizeH33>
                                        <div style={{ display: "flex" }} >
                                            {attribute.items.map(item => {
                                                let active = true
                                                let exists = product.selectedAtributes.find(x => x.value == item.value)
                                                if (exists) {
                                                    active = false
                                                }
                                                let color = product.selectedAtributes[0].name

                                                return <OthersBtns color={attribute.name == "Color" ? item.value : null} mini isActive={active}
                                                    onClick={(e) => this.onChangeAttribute(index, attribute.name, item, product.product.id)}
                                                    value={item.value} key={item.id} >{attribute.name == "Color" ? null : item.value}</OthersBtns>

                                            })}

                                        </div>

                                    </div >
                                })}



                            </div>

                        </CardDiv >
                        <IncCardDiv mini >

                            <CounterButtons mini onClick={() => this.handleCount(product.count + 1, product.product.id)} >+</CounterButtons>
                            <SummaryDiv mini><SumSpan mini>{product.count}</SumSpan></SummaryDiv>
                            <CounterButtons mini onClick={() => this.handleCount(product.count - 1, product.product.id)}>-</CounterButtons>
                        </IncCardDiv>
                        <PictureDiv>
                            <PictureImg mini
                                src={product.product.gallery[this.state.galleryImgs.length > 0 ? this.state.galleryImgs[index].selected : 0]}
                                alt="fireSpot" />
                        </PictureDiv>






                    </div>

                </>
            })}



            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}><TotalDiv mini>Total:</TotalDiv><ResultDiv mini>{this.state.total}</ResultDiv></div>
            <div style={{ display: "flex", justifyContent: "space-around" }}><BagLink
                to={"/shopcard"}

            >
                View Bag
            </BagLink><CheckButton onClick={this.onCheckOut}>Check out</CheckButton>
            </div>
        </>
    );
}
const mapStateToProps = (state) => {

    return {
        cartProdutcts: state.ProductsReducer.cart,
        currency: state.ProductsReducer.currency,

    }
}
const mapDispatchToProps = () => {
    return {
        cartProductCount,
        cartProductChangeAtr,
        checkOut

    }
}
export default connect(mapStateToProps, mapDispatchToProps())(MiniCarD)

