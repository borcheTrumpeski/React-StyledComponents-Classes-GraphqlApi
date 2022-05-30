import styled from "styled-components"


export const CounterButtons = styled.button.attrs((props) => props)`
border:  1px solid #1D1F22;
width:${props => (props.mini ? ` 24px` : `45px`)} ;
height: ${props => (props.mini ? ` 24px` : `45px`)};
background-color: white; 
color: #1D1F22;
`
export const OthersBtns = styled.button.attrs((props) => props)`
border:  1px solid ${props => (props.color != null && props.isActive ? "#1D1F22" : "#5ECE7B")};
width:${props => (props.mini ? ` 24px` : `63px`)};
height: ${props => (props.mini ? ` 24px` : `45px`)};
margin-right: ${props => (props.mini ? ` 5px` : `10px`)};
background-color:${props => (props.color == null ? props.isActive ? ` #FFFFFF` : `#1D1F22` : props.color)};
color:${props => (props.isActive ? `#1D1F22` : ` #FFFFFF`)} ;
font-family: Source Sans Pro;
font-style: normal;
font-weight: 400;
font-size: ${props => (props.mini ? ` 14px` : `16px`)};
line-height: 18px;
align-items: center;
text-align: center;
`
export const SizeH33 = styled.h3.attrs((props) => props)`
font-family: ${props => (props.mini ? ` Raleway` : `Roboto Condensed`)};
font-style: normal;
font-weight: ${props => (props.mini ? ` 400` : `700`)};
font-size: ${props => (props.mini ? ` 18px` : `14px`)};
`


export const CartSpan = styled.span.attrs((props) => props)`
font-family: Raleway;
font-style: normal;
font-weight: 700;
font-size: ${props => (props.mini ? `16px ` : `32px`)};
color: #1D1F22;
justify-content: start;
`
export const LineHr = styled.hr`
margin-bottom: 20px;`

export const ApolloDiv = styled.div.attrs((props) => props)`
font-family: Raleway;
font-style: normal;
font-weight: ${props => (props.mini ? `300` : `600`)};
font-size: ${props => (props.mini ? `16px ` : `32px`)};
color: #1D1F22;
`
export const RunningShortDiv = styled.div.attrs((props) => props)`
font-family: Raleway;
font-style: normal;
font-weight: ${props => (props.mini ? `300 ` : `400`)};
font-size: ${props => (props.mini ? `16px ` : `30px`)};
color: #1D1F22;
`
export const PriceDiv = styled.div.attrs((props) => props)`
font-family: Raleway;
font-style: normal;
font-weight: ${props => (props.mini ? `500 ` : `700`)};
font-size: ${props => (props.mini ? `16px ` : `24px`)};
margin-top: ${props => (props.mini ? `10px ` : `20px`)};
margin-bottom: ${props => (props.mini ? `10px ` : `20px`)};
`

export const SizeBtn = styled.button`
border: 1px solid #1D1F22;
width: 63px;
height: 45px;
background-color: white;
color: #1D1F22;
`

export const CardDiv = styled.div.attrs((props) => props)`
width:30%;
vertical-align: top;
padding-left: ${props => (props.mini ? `5px ` : `20px`)};
display: inline-block;
`
export const IncCardDiv = styled.div.attrs((props) => props)`

width: ${props => (props.mini ? `20% ` : `40%`)};
height:${props => (props.mini ? `190px ` : `288px`)};
display: inline-block;
text-align: right;
vertical-align: top;
`


export const SummaryDiv = styled.div.attrs((props) => props)`
margin-top: ${props => (props.mini ? `60px ` : `90px`)};
margin-bottom: ${props => (props.mini ? `60px ` : `90px`)};
`
export const SumSpan = styled.span.attrs((props) => props)`
font-family: Raleway;
font-style: normal;
font-weight: ${props => (props.mini ? `500 ` : `700`)};
font-size: ${props => (props.mini ? `16px ` : `24px`)};
padding-right: ${props => (props.mini ? `6px ` : `15px`)};
`
export const PictureDiv = styled.div`
display: inline-block;
margin-left: 30px;
`
export const PictureImg = styled.img.attrs((props) => props)`
height: ${props => (props.mini ? `190px ` : `288px`)};
width: ${props => (props.mini ? `121px ` : `141px`)};
 `

export const TotalDiv = styled.div.attrs((props) => props)`
 font-family:${props => (props.mini ? `'Roboto' ` : 'Raleway')}; 
font-style: normal;
font-weight: 500;
font-size: ${props => (props.mini ? `16px ` : `24px`)};
 `
export const ResultDiv = styled.div.attrs((props) => props)`
 font-family: 'Raleway';
 font-style: normal;
 font-weight: 700;
 font-size: ${props => (props.mini ? `16px ` : `24px`)};
 `
export const TaxDiv = styled.div`
 font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size:24px;
 `



