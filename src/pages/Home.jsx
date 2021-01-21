import React, { useState, useEffect, useContext } from 'react'
import { Layout } from '../components/Layout'
import { ItemDetails } from '../components/ItemDetails';
import { Cart } from '../components/Cart';
import { ProductList } from '../components/ProductList';
import { ModalComponent } from '../components/ModalComponent';
import { BroadcastModal } from '../components/BroadCastModal';
import { StateContext } from '../context/Context';
import { useHistory } from 'react-router-dom';


export const Home = () => {
    const {data,isAuthenticated,handleFetchData}  = useContext(StateContext)

const history = useHistory()

useEffect(() => {
    const handleLogin = () => {
        localStorage.getItem('token') ? handleFetchData() : history.push('/login')
    }
    handleLogin()
}, [])


    const { loading, error, result } = data

    return (
        <Layout>

         {
         result.length > 0 && <ProductList
            // result={result}
            // handleOpen={handleOpen}
           />
           }
           {
               loading && <div className="fullPage">
               <h1>Loading</h1>
           </div>
           }
                <ItemDetails
                    // data={modalData}
                    // handleUpdateQuantity={handleUpdateQuantity}
                    // handleAddToCart={handleAddToCart}
                    // open={open}
                    // handleClose={handleClose}
                />
          <Cart
        //   isCartOpen={isCartOpen}
        //   cartData={cartData}
        //   handleCloseCart={handleCloseCart}
        //   handleRemoveItemFromCart={handleRemoveItemFromCart}
        //   handleCheckout={handleCheckout}
          />
           <BroadcastModal
            //  isLogModalOpen={  isLogModalOpen}
            //  handleCloseLogModal={handleCloseLogModal}
            //  changeDataLog={changeDataLog}
           />
        </Layout>
     )
}
