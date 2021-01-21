import React from 'react'
import styled from 'styled-components'

const StyledProduct = styled.div`
background-color: #fff;
padding: 16px;
border-radius: 2px;
border: 1px solid #CCCCCC;
box-shadow: 0 2px 6px rgba(17, 17, 17, 0.07);
cursor: pointer;
transition: box-shadow .2s ease-in;

:hover,:focus {
    box-shadow: 0px 8px 6px rgba(17,17,17,0.2);
    transition: box-shadow .2s ease-in
}

:active {
    box-shadow: 0px 8px 6px rgba(17,17,17,0.09);
    transition: box-shadow .2s ease-in
}
/* height: 262px; */
    /* width: 271px; */

.productImage{
border-radius:2px;
height: calc(80% - 16px);
margin-bottom: 16px;
background-image:${props => props.image && `url(${props.image})`};
background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
}
.productDetails{
    height:20%
}
.productTitle{
font-size: 14px;
font-weight: 400;
margin-bottom: 8px;
}
.productPrice{
font-size: 14px;
font-weight: 500;
color:#0066FF;
}
.productRemaining{
font-size: 12px;
}
.priceQuantity{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
`;
export const Product = ({item,handleOpen}) => {
    const {id, price, quantity, name, url,stock} = item
    const onKeyPress = e => {
        const enterOrSpace =
          e.key === "Enter" ||
          e.key === " " ||
          e.key === "Spacebar" ||
          e.which === 13 ||
          e.which === 32;
        if (enterOrSpace) {
          e.preventDefault();
          handleOpen(item);
        }
      };
    return (
        <StyledProduct
        image={url}
        tabIndex={0}
        role="button"
        onClick={()=> handleOpen(item)}
        onKeyPress={onKeyPress}
        >
        <div className="productImage"></div>
        <div className="productDetails">
            <p className="productTitle">{name}</p>
            <div className="priceQuantity">
            <p className="productPrice">{price} USD</p>
            <p className="productRemaining">{quantity} items left</p>
            </div>
        </div>
        </StyledProduct>
    )
}
