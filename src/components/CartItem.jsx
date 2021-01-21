import React, { useContext } from 'react'
import styled from 'styled-components'
import { StateContext } from '../context/Context';

export const StyledCartItem = styled.div`
/* .cartItem{ */
    background-color: #fff;
padding: 16px;
border-radius: 2px;
border: 1px solid #CCCCCC;
box-shadow: 0 2px 6px rgba(17, 17, 17, 0.07);
transition: box-shadow .2s ease-in;
display:grid;
grid-template-columns: 1fr 2fr;
grid-gap: 16px;
/* margin: 16px 0; */
height: fit-content;

:hover,:focus {
    box-shadow: 0px 8px 6px rgba(17,17,17,0.2);
    transition: box-shadow .2s ease-in
}

:active {
    box-shadow: 0px 8px 6px rgba(17,17,17,0.09);
    transition: box-shadow .2s ease-in
}
/* } */

.productImage{
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
background-image: ${props => props.image && `url(${props.image})`}
}
.productDetails{

}
.productName{
font-size: 14px;
color:#111111;
font-weight: 500;
}
.productQuantity{
font-size: 14px;
color:#111111;
}
.productPrice{
margin: 6px auto;
font-size: 14px;
font-weight: 500;
color:#0066FF;
text-transform: uppercase;
}
.removeButton{
    width: 50%;
    height: 34px;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    color: #000;
    background: transparent;
    border:1px solid #0066FF;
    cursor: pointer;

    :hover{
        opacity:.7;
        background:#0066FF;
        color: #fff;
    }
    :disabled{
        background:#DDD;
        border:1px solid #DDD;
        color:unset;
        :hover {
        opacity:1;
    }
    }
}
`;

export const CartItem = ({data}) => {
    const {id, price, quantitySelected, name, url,subTotal} = data
const {isCheckoutLoading, handleRemoveItemFromCart} = useContext(StateContext)

    return (
        <StyledCartItem
        image={url}
        >
            {/* <div className="cartItem"> */}
        <div className="productImage"></div>
        <div className="productDetails">
            <p className="productName">{name}</p>
            <p className="productQuantity">quantity : {quantitySelected}</p>
            <p className="productPrice">{subTotal} usd</p>
            <button
            className="removeButton"
            onClick={()=>handleRemoveItemFromCart(data)}
            disabled={isCheckoutLoading}
            >
                remove
                </button>
        </div>
        {/* </div> */}
    </StyledCartItem>
    )
}
