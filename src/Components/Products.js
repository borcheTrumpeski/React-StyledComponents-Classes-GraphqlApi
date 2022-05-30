import React, { Component } from 'react';
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
    DollarSpan
} from "./ProductsElements";

import {

    OthersBtns,
} from './CartElements';
import { getProductById } from "./ApiCalls";

import { connect } from 'react-redux';
import { addToCard } from '../Redux/redux-actions/redux_actions'



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

        let atr = this.state.selectedAtributes
        atr[index].value = value

        this.setState({ selectedAtributes: atr })
    }
    addToCard = () => {
        let submit = {
            product: this.state.product,
            selectedAtributes: this.state.selectedAtributes,
            count: 1
        }
        alert("Succesfully added " + this.state.product.name)
        this.props.addToCard(submit)
    }
    render = () => (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-around", marginTop: "50px" }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-around" }}>
                    {this.state.product.gallery.map(image => {
                        return <ImagesDiv key={"product-" + image} onClick={() => {
                            this.setState({ selectedImage: image });
                        }}>
                            <ImageFirst src={image} alt="fireSpot" />
                        </ImagesDiv>
                    })}
                </div>
                <ImageBig src={this.state.selectedImage} alt="fireSpot" />

                <CardInfo >
                    <TitleH1 >{this.state.product.brand}</TitleH1>
                    <RunningH1 >{this.state.product.name}</RunningH1>
                    {this.state.product.attributes.map((attribute, index) => {
                        return <div key={"product-attrubute-" + attribute.id}><SizeH3 >{attribute.name}</SizeH3>
                            <div style={{ display: "flex" }}>
                                {attribute.items.map(item => {

                                    return <OthersBtns key={"attr-btn-" + item.value} color={attribute.name == "Color" ? item.value : null}
                                        isActive={this.state.selectedAtributes.length == 0 ? true : this.state.selectedAtributes[index].value == item.value ? false : true}
                                        onClick={(e) => this.onChangeAttribute(index, e.target.value)}
                                        value={item.value} >{attribute.name == "Color" ? null : item.value}</OthersBtns>

                                })}
                            </div>
                        </div >
                    })}
                    <PriceSpan >Price:</PriceSpan>
                    <DollarSpan >{this.state.product.prices.map(curr => {

                        if (curr.currency.symbol === this.props.currency) {
                            return <span key={"currency-" + curr.currency.symbol}>{curr.currency.symbol + curr.amount}</span>
                        }
                    })}</DollarSpan>
                    <AddBtn onClick={this.addToCard} >ADD TO CART</AddBtn>
                    <p dangerouslySetInnerHTML={{ __html: this.state.product.description }}></p>
                </CardInfo>
            </div>
        </>
    );
}
const mapStateToProps = (state) => {

    return {
        selectedProduct: state.ProductsReducer.selectedProduct,
        currency: state.ProductsReducer.currency
    }
}
const mapDispatchToProps = () => {
    return {
        addToCard
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Products)
