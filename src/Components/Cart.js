import React, { Component } from 'react';
import { cartProductCount } from '../Redux/redux-actions/redux_actions';

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
    CartDiv,
    OthersBtns,
    SizeH33,
    TotalDiv,
    ResultDiv,
    TaxDiv,
    FlexDiv,
    ScrollPictureButtons,
    ScrollPictureDiv
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
        this.props.cartProdutcts.forEach(product => {

            product.product.prices.forEach(curr => {

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

        if (selected !== max && selected >= 0) {
            let gallery = this.state.galleryImgs
            gallery[index].selected = selected
            this.setState({ galleryImgs: gallery });
        }


    };

    render = () => (
        <>
            <CartDiv >
                <CartSpan>CART</CartSpan>
            </CartDiv>


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
                                return null
                            })}
                            </PriceDiv>
                            <div  >
                                {product.product.attributes.map((attribute) => {

                                    return <div key={attribute.id}><SizeH33  >{attribute.name}</SizeH33>
                                        <FlexDiv>
                                            {attribute.items.map(item => {
                                                let active = true
                                                let exists = product.selectedAtributes.find(x => x.value === item.value)
                                                if (exists) {
                                                    active = false
                                                }

                                                return <OthersBtns color={attribute.name === "Color" ? item.value : null} isActive={active}
                                                    value={item.value} key={item.id} >{attribute.name === "Color" ? null : item.value}</OthersBtns>

                                            })}

                                        </FlexDiv>


                                    </div >
                                })}



                            </div>

                        </CardDiv >
                        <IncCardDiv >
                            <CounterButtons onClick={() => this.handleCount(product.count + 1, product.product.id)} >+</CounterButtons>
                            <SummaryDiv><SumSpan>{product.count}</SumSpan></SummaryDiv>
                            <CounterButtons onClick={() => this.handleCount(product.count - 1, product.product.id)}>-</CounterButtons>
                        </IncCardDiv>
                        <PictureDiv img={product.product.gallery[this.state.galleryImgs.length > 0 ? this.state.galleryImgs[index].selected : this.state.galleryImgs[0]]}>
                            <ScrollPictureDiv >
                                <ScrollPictureButtons onClick={() => this.handleGallery(this.state.galleryImgs.length > 0 ? this.state.galleryImgs[index].selected + 1 : 0, index, product.product.gallery.length)}>{"<"}</ScrollPictureButtons>
                                <ScrollPictureButtons onClick={() => this.handleGallery(this.state.galleryImgs.length > 0 ? this.state.galleryImgs[index].selected - 1 : 0, index, product.product.gallery.length)}>{">"}</ScrollPictureButtons>
                            </ScrollPictureDiv>


                        </PictureDiv>




                    </div>

                </React.Fragment>
            })}


            <FlexDiv><TaxDiv>Tax21% :</TaxDiv><ResultDiv>{this.state.tax.toFixed(2)}</ResultDiv></FlexDiv>
            <FlexDiv><TaxDiv>Quantity:</TaxDiv> <ResultDiv>{this.state.quantity}</ResultDiv></FlexDiv>
            <FlexDiv><TotalDiv>Total:</TotalDiv><ResultDiv>{this.state.total.toFixed(2)}</ResultDiv></FlexDiv>
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Cart)

