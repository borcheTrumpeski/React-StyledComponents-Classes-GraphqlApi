import styled from "styled-components"
import { NavLink as Link } from "react-router-dom";

export const DeemScreen = styled.div`
position:${props => props.show ? "fixed" : "none"};


display: block;
width: 100%;
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(57, 55, 72, 0.22);
z-index: 0;

`

export const Nav = styled.nav`
position:relative;
background:#fff;
z-index: 2;
display:flex;
justify-content:space-around;
padding:10px 15px 10px 15px;
z-index:10px;
`
export const NavLink = styled(Link)`
color:#000;
display:flex;
align-items:center;
margin:0 1rem;
height:100%;
text-decoration:none;
border-bottom:1px solid black;
padding-bottom:2px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
text-transform: uppercase;
&.active{
    font-weight: 600;
    color: #5ECE7B;
    border-bottom:1px solid #5ECE7B ;

}
`
export const BagLink = styled(Link)`
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color:black;
width: 140px;
height: 43px;
font-family: Raleway;
font-style: normal;
font-weight: 600;
font-size: 14px;
text-transform: uppercase;
text-decoration:none;
background: #FFFFFF;
border: 1px solid #1D1F22;
`
export const CheckButton = styled.button`
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 140px;
height: 43px;
font-family: Raleway;
font-style: normal;
font-weight: 600;
font-size: 14px;
text-transform: uppercase;
background: #5ECE7B;
color:white;
border: 1px solid #1D1F22;
`


export const NavMenu = styled.div`
display:flex;
align-items:center;
margin-right:-24px;
@media screen and (max-width:768px){
    display:none;
}
`
export const NavBtn = styled.nav`
display:flex;
align-items:center;
margin-right:24px;
@media screen and (max-width:768px){
    display:none;
}
`


export const LogoImg = styled.img`
height: 30px;
width: 30px;
`
export const SelectButton = styled.button`
background: #FFFFFF;
font-family: 'Raleway';
font-style: normal;
font-weight: 500;
font-size: 18px;
display:flex;
border:none ;
padding-top:10px;
padding-bottom:10px;

flex-direction:column;
cursor:pointer;
&:hover{
    background:#EEEEEE
}

`
export const SelectDiv = styled.div`

    display: ${props => !props.hide ? "none" : "flex"};
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 45px;
    background: #FFFFFF;
   
    `

export const ShopDiv = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 16px;
    position: absolute;
    width: 365px;
    right: 100px;
    top: 45px;
    background: #FFFFFF;

    `

export const ShopSpan = styled.span`

    position: absolute;
    top: -10px;
    right: -10px;
    padding: 5px 10px;
    border-radius: 50%;
    background-color: black;
    color: white;

`
export const ShopImg = styled.img`

width: 25px;
height: 25px
`
export const ShopButton = styled.button`
cursor:pointer;
background: #FFFFFF;
border:none;
backgroundColor: white;
position: relative 

`

export const CurrSpan = styled.span`

padding-left: 15px;
padding-right: 15px;
cursor:pointer;

`





