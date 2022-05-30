import styled from "styled-components"
import { NavLink as Link } from "react-router-dom";


export const Nav = styled.nav`
background:#fff;
display:flex;
justify-content:space-around;
padding:0.5rem calc((100vw-1000px)/2);
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


