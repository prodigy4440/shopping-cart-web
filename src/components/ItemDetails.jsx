import React,{useContext} from 'react'
import styled from 'styled-components'
import { StateContext } from '../context/Context'
import { ModalComponent } from './ModalComponent'

const StyledItemDetails = styled.div`
        background:#fff;
        width:90%;
        max-width:700px;
        border-radius:2px;
        padding: 16px;
        display: grid;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
        grid-gap: 32px;

@media screen and (max-width: 737px){
    grid-template-columns: unset;
    grid-template-rows: repeat(auto-fit,minmax(200px,1fr));
}

      .productImage{
          flex: calc(50% - 8px);
          height: 100%;
          width: 100%;
          background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
          background-image: ${props => props.image && `url(${props.image})`}
      }
        .productDetails {
            flex: calc(50% - 8px);
            height: 100%;
        }
.productName{
font-size:20px;
font-weight: bolder;
}
.itemLeft{
    font-size:16px;
}
.itemPrice{
    margin: 16px auto;
    font-size: 24px;
font-weight: 500;
color:#0066FF;
}
.description{
font-size: 12px;
margin: 16px auto;
color: #888888;
}

.itemQuantity{
    display: flex;
    margin: 16px 0;
    align-items: center;
    label{
        font-size: 12px;
        font-weight:500;
    }
    input{
        width: 80px;
        border-radius: 2px;
        border: 1px solid #DDDDDD;
        height:34px;
        text-align: center;
        padding: 4px;
        outline-color:#0066FF;
    }
}

.addToCartButton, .qtyButton{
    width: 100%;
    height: 34px;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    color: #fff;
    background: #0066FF;
    cursor: pointer;

    :disabled {
    opacity:.4;
    cursor:not-allowed;

    :hover {
        opacity:.4;
    }
}
    :hover{
        opacity:.7;
    }
}
.qtyButton{
width: 34px;

}
.qtyPrice{
    padding: 0 16px;
    font-size: 18px;
}
`
export const ItemDetails = () => {
    const {
        modalData,
        handleUpdateQuantity,
        handleAddToCart,
        open,
        handleClose,
    } = useContext(StateContext)
    const { id, name, quantitySelected, price, url, quantity, description } = modalData
    return (
        <ModalComponent
            open={open}
            handleClose={handleClose}
        >
            <StyledItemDetails
                image={url}
            >
                <div className="productImage"></div>
                <div className="productDetails">
                    <p className="productName">{name}</p>
                    <p className="itemLeft">{quantity} items left</p>
                    <p className="itemPrice">{price} USD</p>
                    <p className="description">{description} </p>
                    <div className="itemQuantity">
                        <button
                            className="qtyButton"
                            disabled={quantitySelected === 0}
                            onClick={() => handleUpdateQuantity(id, 'subtract')}
                        >-</button>
                        <p className="qtyPrice">{quantitySelected}</p>
                        <button className="qtyButton"
                            disabled={quantity === 0}
                            onClick={() => handleUpdateQuantity(id, 'add')}
                        >+</button>
                        {/* <input type="text" name="quantity" id="quantity"/> */}
                    </div>
                    <button className="addToCartButton" disabled={quantitySelected === 0}
                        onClick={() => handleAddToCart(modalData)}
                    >Add to Cart</button>
                </div>
            </StyledItemDetails>
        </ModalComponent>

    )
}
