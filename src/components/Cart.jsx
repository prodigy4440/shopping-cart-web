import React, { useContext } from 'react'
import styled from 'styled-components'
import { CartItem } from './CartItem'
import { ModalComponent } from './ModalComponent'
import { ReactComponent as Close} from '../../src/assets/icons/close.svg'
import { StateContext } from '../context/Context'
import { Button } from './Button'

const StyledCart = styled.div`
height:100%;
width: 100%;
    max-width: 350px;
background-color: #fff;
position: fixed;
right:${props => props.isCartOpen ? '0' : '-400px'};
transition: right 2s ease-in-out;
padding:32px 16px;

.cartTitle {
    text-align: center;
    font-size: 24px;
    font-weight: normal;
}
.cartContainer {
    height: calc(100vh - 175px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    margin: 16px 0;
    grid-auto-rows: 137px;
}
.fullPage {
    height: 100%;
    display: grid;
    place-content: center;
}

.itemInCart {
display: flex;
padding: 13px;
background-color:#227AFF;
border: none;
border-radius: 2px;
cursor: pointer;
width: 90%;
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
    margin: 0 auto;
    color: #ffffff;
    justify-content: center;
:hover {
    opacity: .6;
}
:disabled {
    background-color:#dddddd;
    :hover {
        opacity:1;
    }
}
}
`

export const CloseIcon = styled(Close)`
position: absolute;
    top: 37px;
    cursor: pointer;

    :hover {

    }
`

export const Cart = () => {

const {
    isCartOpen,
    cartData,
    handleCloseCart,
    handleCheckout,
    isCheckoutLoading
    } = useContext(StateContext)

        const onKeyPress = e => {
            const enterOrSpace =
              e.key === "Enter" ||
              e.key === " " ||
              e.key === "Spacebar" ||
              e.which === 13 ||
              e.which === 32;
            if (enterOrSpace) {
              e.preventDefault();
              handleCloseCart();
            }
          };

    return (
        <ModalComponent
        open={isCartOpen}
        handleClose={handleCloseCart}
    >

        <StyledCart
                    isCartOpen={isCartOpen}
                >

                    <h3 className="cartTitle">Cart</h3>
<CloseIcon
tabIndex={0}
onClick={handleCloseCart}
role="button"
onKeyPress={onKeyPress}
/>
                    <div className="cartContainer">

                    {
                      cartData.length > 0 && cartData.map(data => {
                        return <CartItem
                        key={data.id}
                        data={data}
                        />
                          })
                        }

                        {
                            cartData.length === 0 && <div className="fullPage">
                                <p>Cart is currently Empty</p>
                            </div>
                        }
                    </div>

                    {
                         cartData.length > 0 &&

        <Button
onClick={handleCheckout}
disabled={isCheckoutLoading}
isLoading={isCheckoutLoading}
buttonText='Checkout'
loadingText= "Processing..."
        />}
                </StyledCart>
    </ModalComponent>
    )
}
