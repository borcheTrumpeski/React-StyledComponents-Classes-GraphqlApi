import React, { Component } from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    LogoImg,
    SelectButton,
    SelectDiv,
    ShopSpan,
    ShopDiv,
    ShopImg,
    ShopButton,
    CurrSpan

} from "../Navbar/NavbarElements";
import { getCurrencies } from "../../Components/ApiCalls";
import { connect } from "react-redux";
import { setSelectedCategories, setCurrency, showMiniCart } from '../../Redux/redux-actions/redux_actions'
import MiniCard from '../MiniCard';
import shoppingCart from "../../Pictures/shoppingCart.png"

import Logo from "../../Pictures/Logo.svg"

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: [],
            showShop: false,
            openCurrency: false,

        };
        this.wrapperRef = React.createRef();
        this.currencyRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClickOutsideCurrency = this.handleClickOutsideCurrency.bind(this);

    }


    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.removeEventListener("mousedown", this.handleClickOutsideCurrency);


    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        document.addEventListener("mousedown", this.handleClickOutsideCurrency);
        getCurrencies().then(
            res => res.json()
        ).then(res => {

            this.setState({ currency: res.data.currencies });

            this.props.setCurrency(res.data.currencies[0].symbol)
        })
    }
    onSelect = (symbol) => {
        this.setState({ openCurrency: false })
        this.props.setCurrency(symbol)
    }
    onOpen = () => {
        this.setState({ showShop: !this.state.showShop })
        this.props.showMiniCart(!this.state.showShop)

    }
    openCurrency = () => {
        this.setState({ openCurrency: !this.state.openCurrency })

    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.state.showShop) {


                this.setState({ showShop: !this.state.showShop && this.state.showShop })
                this.props.showMiniCart(false)
            }
        }
    }

    handleClickOutsideCurrency(event) {
        if (this.currencyRef && !this.currencyRef.current.contains(event.target)) {
            this.setState({ openCurrency: false })
        }
    }


    render = () => (

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
                <div ref={this.currencyRef}>
                    <CurrSpan onClick={this.openCurrency}>{this.props.currency}{" ^"}</CurrSpan>

                    <SelectDiv hide={this.state.openCurrency} onChange={this.onSelect}>
                        {this.state.currency.length > 0 ? this.state.currency.map(curr => {


                            return <SelectButton onClick={e => this.onSelect(curr.symbol)} key={"symbol-" + curr.symbol} value={curr.symbol} >{curr.symbol + " " + curr.label}</SelectButton>
                        }) : null}

                    </SelectDiv>
                </div>
                <div ref={this.wrapperRef}>
                    <ShopButton onClick={this.onOpen}>



                        <ShopImg src={shoppingCart} />
                        <ShopSpan>{this.props.cartProdutcts.length}</ShopSpan>
                    </ShopButton>

                    {this.state.showShop ? <ShopDiv><MiniCard ></MiniCard> </ShopDiv> : null}
                </div>

            </NavBtn>
        </Nav>


    )
}
const mapStateToProps = (state) => {

    return {
        categories: state.ProductsReducer.categories,
        cartProdutcts: state.ProductsReducer.cart,
        currency: state.ProductsReducer.currency

    }
}
const mapDispatchToProps = () => {
    return {
        setSelectedCategories,
        setCurrency,
        showMiniCart

    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Navbar)

