import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";


export const GridContainer = styled.div`
display: grid;
width:100%;
grid-template-columns: 1fr 1fr 1fr;

`
export const Grid = styled.div`
padding: 20px ;
display: flex;
`
export const CategoryLink = styled(Link)`

display:flex;
align-items:center;
height:100%;
text-decoration:none;
padding-bottom:2px;
`
export const CartImgContainer = styled.div`
display: ${props => props.show ? "flex" : "none"};
justify-content: flex-end;
width: 100% ;
`


export const CartImg = styled.button`
border-radius: 50%;
border:none;
background-color: #5ECE7B;
width: 50px;
 height: 50px;
 justify-content: center;
 align-items: center;
 display: flex;
 margin-top: -100px;
 position: absolute;
 margin-right: 50px
`

export const Card = styled.div`
display:block;
margin-left:30px;
height: 444px;
width: 386px;

`

export const Tith1 = styled.h1`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 42px;
padding: 3% 0% 3% 3%;
text-transform: uppercase;
`
export const Styledspan = styled.span`
font-family: Raleway;
font-style: normal;
font-weight: 300;
font-size: 18px;
line-height: 160%;
color: #1D1F22;
`

export const SpanPrice = styled.span`
font-family: Raleway;
font-style: normal;
font-weight: 500;
font-size: 18px;
color: #1D1F22;
display:block;
`

