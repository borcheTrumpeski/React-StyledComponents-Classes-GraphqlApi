import React, { Component } from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    LogoImg
} from "../Navbar/NavbarElements";
import { getCurrencies } from "../../Components/ApiCalls";
import { connect } from "react-redux";
import { setSelectedCategories, setCurrency } from '../../Redux/redux-actions/redux_actions'
import MiniCard from '../MiniCard';
import shoppingCart from "../../Pictures/shoppingCart.png"

import Logo from "../../Pictures/Logo.svg"


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: [],
            showShop: false
        };
    }
    componentDidMount() {
        getCurrencies().then(
            res => res.json()
        ).then(res => {

            this.setState({ currency: res.data.currencies });

            this.props.setCurrency(res.data.currencies[0].symbol)
        })
    }
    onSelect = (e) => {

        this.props.setCurrency(e.target.value)
    }
    onOpen = () => {
        this.setState({ showShop: !this.state.showShop })
    }
    render = () => (
        <>
            <Nav>
                <NavMenu>
                    {this.props.categories ? this.props.categories.map(link => {

                        return <NavLink key={"route-" + link.name} onClick={() => { this.props.setSelectedCategories(link.name) }} to={"/" + link.name} >
                            {link.name}
                        </NavLink>
                    }) : null}

                </NavMenu>

                <LogoImg src={Logo} alt="logo" />

                <NavBtn>


                    <select onChange={this.onSelect} >
                        {this.state.currency.length > 0 ? this.state.currency.map(curr => {

                            return <option key={"symbol-" + curr.symbol} value={curr.symbol} >{curr.symbol + " " + curr.label}</option>
                        }) : null}

                    </select>

                    <button style={{ backgroundColor: "white", position: "relative" }} onClick={this.onOpen}>



                        <img style={{ width: "25px", height: "25px" }} src={shoppingCart} />
                        <span style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            padding: "5px 10px",
                            borderRadius: "50%",
                            backgroundColor: "black",
                            color: "white",
                        }}>{this.props.cartProdutcts.length}</span>
                    </button>

                    {this.state.showShop ? <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "32px 16px",
                        position: "absolute",
                        width: "365px",
                        right: "100px",
                        top: "45px",
                        background: "#FFFFFF",
                    }}><MiniCard></MiniCard> </div> : null}


                </NavBtn>
            </Nav>

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        categories: state.ProductsReducer.categories,
        cartProdutcts: state.ProductsReducer.cart,
    }
}
const mapDispatchToProps = () => {
    return {
        setSelectedCategories,
        setCurrency

    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Navbar)

