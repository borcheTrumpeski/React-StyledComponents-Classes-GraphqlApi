import React, { Component } from 'react';
import { Interweave } from 'interweave';
import {
    ImagesDiv,
    ImageFirst,
    ImageBig,
    AddBtn,
    TitleH1,
    RunningH1,
    SizeH3,
    CardInfo,
    PriceSpan,
    DollarSpan,
    GalleryDiv,
    MainProductDiv
} from "./ProductsElements";

import {

    FlexDiv,
    OthersBtns,
} from './CartElements';
import { getProductById } from "./ApiCalls";

import { connect } from 'react-redux';
import { addToCard, cartProductCount } from '../Redux/redux-actions/redux_actions'



class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                attributes: [],
                brand: "",
                category: "",
                description: "",
                gallery: [],
                id: "",
                inStock: false,
                name: "",
                prices: [{
                    amount: 0, currency: {
                        label: "",
                        symbol: ""
                    }
                }]
            },
            selectedImage: "",
            selectedAtributes: []
        };


    }


    componentDidMount() {
        debugger
        getProductById(this.props.selectedProduct).then(
            res => res.json()
        ).then(res => {
            this.setState({ product: res.data.product });
            this.setState({ selectedImage: res.data.product.gallery[0] });

            let selectedAtrrs = []
            selectedAtrrs = res.data.product.attributes.map(el => {
                return { name: el.name, value: el.items[0].value }
            })

            this.setState({ selectedAtributes: selectedAtrrs });


        })
    }
    onChangeAttribute = (index, value) => {

        debugger
        let b = this.props.cartProdutcts[this.props.cartProdutcts.length - 1].selectedAtributes[0].value
        console.log(b)
        let atr = this.state.selectedAtributes;

        atr[index].value = value
        let a = this.props.cartProdutcts[this.props.cartProdutcts.length - 1].selectedAtributes[0].value
        console.log(a)

        this.setState({ selectedAtributes: atr })

    }
    addToCard = () => {
        let exists = false
        this.props.cartProdutcts.forEach(element => {

            if (element.product.id === this.state.product.id) {
                let same = true
                element.selectedAtributes.forEach((atr, index) => {
                    if (same) {
                        same = atr.value === this.state.selectedAtributes[index].value ? true : false
                    }
                })
                if (same) {
                    let payload = {
                        count: element.count + 1,
                        id: element.id
                    }

                    this.props.cartProductCount(payload)
                    exists = true
                    alert("Already exists" + this.state.product.name)

                }
            }
        })
        debugger
        // if (exists !== null) {
        //     exists.filter(el => el.selectedAtributes.find(x=>x.name==))
        // }
        if (!exists) {
            let submit = {
                product: this.state.product,
                selectedAtributes: this.state.selectedAtributes,
                count: 1,
                id: this.props.cartProdutcts.length

            }
            this.props.addToCard(submit)
            alert("Succesfully added " + this.state.product.name)

        }

    }
    render = () => (
        <>
            <MainProductDiv>
                <GalleryDiv>
                    {this.state.product.gallery.map(image => {
                        return <ImagesDiv key={"product-" + image} onClick={() => {
                            this.setState({ selectedImage: image });
                        }}>
                            <ImageFirst img={image} alt="fireSpot" />
                        </ImagesDiv>
                    })}
                </GalleryDiv>
                <ImageBig img={this.state.selectedImage} alt="fireSpot" />

                <CardInfo >
                    <TitleH1 >{this.state.product.brand}</TitleH1>
                    <RunningH1 >{this.state.product.name}</RunningH1>
                    {this.state.product.attributes.map((attribute, index) => {
                        return <div key={"product-attrubute-" + attribute.id}><SizeH3 >{attribute.name}</SizeH3>
                            <FlexDiv>
                                {attribute.items.map(item => {

                                    return <OthersBtns key={"attr-btn-" + item.value} color={attribute.name === "Color" ? item.value : null}
                                        isActive={this.state.selectedAtributes.length === 0 ? true : this.state.selectedAtributes[index].value === item.value ? false : true}
                                        onClick={(e) => this.onChangeAttribute(index, item.value)}
                                        value={item.value} >{attribute.name === "Color" ? null : item.value}</OthersBtns>

                                })}
                            </FlexDiv>
                        </div >
                    })}
                    <PriceSpan >Price:</PriceSpan>
                    <DollarSpan>{this.state.product.prices.map(curr => {

                        if (curr.currency.symbol === this.props.currency) {
                            return <span key={"currency-" + curr.currency.symbol}>{curr.currency.symbol + curr.amount}</span>
                        }
                        return null
                    })}</DollarSpan>
                    <AddBtn onClick={this.addToCard} disabled={this.state.product.inStock}>ADD TO CART</AddBtn>
                    <Interweave content={this.state.product.description} />
                </CardInfo>
            </MainProductDiv>
        </>
    );
}
const mapStateToProps = (state) => {

    return {
        selectedProduct: state.ProductsReducer.selectedProduct,
        currency: state.ProductsReducer.currency,
        cartProdutcts: state.ProductsReducer.cart,

    }
}
const mapDispatchToProps = () => {
    return {
        addToCard,
        cartProductCount
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Products)
