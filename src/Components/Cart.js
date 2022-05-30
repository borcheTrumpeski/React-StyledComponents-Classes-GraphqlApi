import React, { Component } from 'react';
import { cartProductCount, cartProductChangeAtr } from '../Redux/redux-actions/redux_actions';

import {
    CounterButtons,
    CartSpan,
    ApolloDiv,
    LineHr,
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
    ResultDiv,
    TaxDiv
} from './CartElements';
import { connect } from "react-redux";


class Cart extends Component {

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
    handleGallery = (selected, index, max) => {

        if (selected != max && selected >= 0) {
            let gallery = this.state.galleryImgs
            gallery[index].selected = selected
            this.setState({ galleryImgs: gallery });
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

    render = () => (
        <>
            <div style={{
                marginTop: "50px",
                marginBottom: "50px"
            }} >
                <CartSpan>CART</CartSpan>
            </div>


            {this.props.cartProdutcts.map((product, index) => {


                return <React.Fragment key={"cart-" + index}>
                    <LineHr></LineHr>
                    <div  >
                        <CardDiv>

                            <ApolloDiv>{product.product.brand}</ApolloDiv>

                            <RunningShortDiv>{product.product.name}</RunningShortDiv>
                            <PriceDiv >{product.product.prices.map(curr => {

                                if (curr.currency.symbol === this.props.currency) {
                                    return curr.currency.symbol + curr.amount
                                }
                            })}
                            </PriceDiv>
                            <div  >
                                {product.product.attributes.map((attribute) => {

                                    return <div key={attribute.id}><SizeH33  >{attribute.name}</SizeH33>
                                        <div style={{ display: "flex" }} >
                                            {attribute.items.map(item => {
                                                let active = true
                                                let exists = product.selectedAtributes.find(x => x.value == item.value)
                                                if (exists) {
                                                    active = false
                                                }
                                                let color = product.selectedAtributes[0].name

                                                return <OthersBtns color={attribute.name == "Color" ? item.value : null} isActive={active}
                                                    onClick={(e) => this.onChangeAttribute(index, attribute.name, item, product.product.id)}
                                                    value={item.value} key={item.id} >{attribute.name == "Color" ? null : item.value}</OthersBtns>

                                            })}

                                        </div>


                                    </div >
                                })}



                            </div>

                        </CardDiv >
                        <IncCardDiv >
                            <CounterButtons onClick={() => this.handleCount(product.count + 1, product.product.id)} >+</CounterButtons>
                            <SummaryDiv><SumSpan>{product.count}</SumSpan></SummaryDiv>
                            <CounterButtons onClick={() => this.handleCount(product.count - 1, product.product.id)}>-</CounterButtons>
                        </IncCardDiv>
                        <PictureDiv>
                            <PictureImg
                                src={product.product.gallery[this.state.galleryImgs.length > 0 ? this.state.galleryImgs[index].selected : this.state.galleryImgs[0]]}
                                alt="fireSpot" />
                        </PictureDiv>
                        <button onClick={() => this.handleGallery(this.state.galleryImgs.length > 0 ? this.state.galleryImgs[index].selected + 1 : 0, index, product.product.gallery.length)}>+</button>
                        <button onClick={() => this.handleGallery(this.state.galleryImgs.length > 0 ? this.state.galleryImgs[index].selected - 1 : 0, index, product.product.gallery.length)}>-</button>





                    </div>

                </React.Fragment>
            })}


            <div style={{ display: "flex" }}><TaxDiv>Tax21% :</TaxDiv><ResultDiv>{this.state.tax}</ResultDiv></div>
            <div style={{ display: "flex" }}><TaxDiv>Quantity:</TaxDiv> <ResultDiv>{this.state.quantity}</ResultDiv></div>
            <div style={{ display: "flex" }}><TotalDiv>Total:</TotalDiv><ResultDiv>{this.state.total}</ResultDiv></div>
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
        cartProductChangeAtr
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Cart)

