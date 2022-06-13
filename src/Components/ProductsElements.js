import styled from "styled-components"


export const ImagesDiv = styled.div`
width: 80px;
display: inline-block;
vertical-align: top;
margin-bottom:15px;
`
export const ImageFirst = styled.div`
height: 80px;
width: 80px;
display:flex;
flex-direction:column;

background: url(${props => props.img});

background-size: 100% ;
background-position: center;

background-repeat: no-repeat;

`
export const ImageBig = styled.div`
margin-left: 20px;
width: 610px;
height: 511px;

background: url(${props => props.img});

background-size: 100% ;
background-position: center;

background-repeat: no-repeat;



`
export const AddBtn = styled.button`
padding: 16px 32px 16px 32px;
width: 292px;
margin-bottom: 30px;
background-color: #5ECE7B;
color: #FFFFFF;
border: none;
margin-top: 30px;
`
export const TitleH1 = styled.h1`
font-family: Raleway;
font-style: normal;
font-weight: 600;
font-size: 30px;
`
export const RunningH1 = styled.h1`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 30px;
`
export const SizeH3 = styled.h3`
font-family: Roboto Condensed;
font-style: normal;
font-weight: 700;
font-size: 18px;
`
export const CardInfo = styled.div`
margin-left: 40px;
width: 300px;
display: inline-block;
vertical-align: top;
`
export const FirstBtn = styled.button`
border:  1px solid #1D1F22;
width: 63px;
height: 45px;
background-color: white;
color: #1D1F22;
`

export const PriceSpan = styled.span`
font-family: Roboto Condensed;
font-style: normal;
font-weight: 700;
font-size: 18px;
display: block;
margin-top: 30px;
margin-bottom: 15px;
`
export const DollarSpan = styled.span`
font-family: Raleway;
font-style: normal;
font-weight: 700;
font-size: 24px;
`
export const GalleryDiv = styled.div`

display:flex;
flex-direction:column;

`
export const MainProductDiv = styled.div`

width: 100%;
display: flex;
justify-content: space-around;
margin-top: 50px 

`