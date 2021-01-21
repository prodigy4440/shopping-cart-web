import React, { useState, useEffect, createContext } from 'react'
import { toast } from 'react-toastify';
import MOCK_DATA from '../MOCK_DATA.json'
import { isSafari } from '../utils';
export const StateContext = createContext();

const Context = (props) => {
    const [open, setOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] =useState(false)
    const [cartData, setCartData] = useState([]);
    const [modalData, setModalData] = useState(false);
    const [data, setData] = useState({
        loading: true,
        error: null,
        // result:MOCK_DATA,
        result: []
    })
    const [changeDataLog, setChangeDataLog] = useState('')
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)


    useEffect(() => {
        var iPageTabID = sessionStorage.getItem("tabID");
      // if it is the first time that this page is loaded
    if (iPageTabID == null)
        {
        var iLocalTabID = localStorage.getItem("tabID");
          // if tabID is not yet defined in localStorage it is initialized to 1
          // else tabId counter is increment by 1
        var iPageTabID = (iLocalTabID == null) ? 1 : Number(iLocalTabID) + 1;
          // new computed value are saved in localStorage and in sessionStorage
        localStorage.setItem("tabID",iPageTabID);
        sessionStorage.setItem("tabID",iPageTabID);
        }
    }, [])

    //pop modal in other tabs if users do any action to remove or add item
    useEffect(() => {
      const handleChangeDataLogBroadcast = () => {
        const channel = new BroadcastChannel("my-channel");
        changeDataLog !== "" && channel.postMessage({changeDataLog});

        channel.addEventListener("message", e => {
             if(localStorage.getItem('openedTab') !== sessionStorage.getItem('tabID')){
                setChangeDataLog(e.data.changeDataLog)
             setIsLogModalOpen(true)
             }
        });
      }
      !isSafari && handleChangeDataLogBroadcast()
    }, [changeDataLog])

    //pop modal on load to show users last action
    useEffect(() => {
     let lastActionData = localStorage.getItem('actionLog')
     if(localStorage.getItem('openedTab') !== sessionStorage.getItem('tabID')){
        lastActionData && setChangeDataLog(lastActionData)
        changeDataLog !== '' && setIsLogModalOpen(true)
     }
    }, [])


        const handleFetchData = async () => {
            setData({ ...data, loading: true, error: null, result: [] })
            try {
                const request = await fetch('https://oja-oba-service.herokuapp.com/v1/product/find?page=0&size=20', {
                    headers: {
                        "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                })
                const response = await request.json()
if(response && response.status === "SUCCESS"){
    const newQuantities = response.data.map(item => ({ ...item, quantitySelected: 0 }))
    setData({ ...data, loading: false, error: null, result: newQuantities })
}else {
    setData({ ...data, loading: false, error: response.description, result: [] })
}
            } catch (error) {
                setData({ ...data, loading: false, error: error.message, result: [] })
            }
        }



    //open modal for item
    const handleOpen = (data) => {
        setModalData(data)
        setOpen(true);
    };

    //close modal for item
    const handleClose = () => {
        setOpen(false);
    };

    //close cart modal
    const handleCloseCart = () => {
        setIsCartOpen(false)
    }

    //open cart modal
    const handleOpenCart = () => {
        setIsCartOpen(true)
    }

    //close modal for log
    const handleCloseLogModal = () => {
        setIsLogModalOpen(false)
    }

    //update quantity of item
    /**
     *
     * @param {string} id The id of the product
     * @param {string} operation add or subtract, used to note what operation to perform
     */
    const handleUpdateQuantity = (id, operation) => {
        //get the item
        const { result } = data;
        let newItem
     let newData =   result.map(item => {
            const { quantitySelected, quantity } = item;

            if(item.id !== id){
                return item
            }if(operation === "add" && (quantitySelected !== quantity || quantity !== 0)){

                newItem = { ...item, quantitySelected: quantitySelected + 1, quantity: quantity - 1 }
                return newItem
            }if(operation === 'subtract' && quantitySelected > 0){
                newItem = { ...item, quantitySelected: quantitySelected - 1, quantity: quantity + 1 }
                return newItem
            }else {
                return item
            }
        })
        setModalData({...newItem})
        setData({ ...data, result: newData })
        //return the item and update the state
    }


    const handleSetDataLog = (operator, item ) => {
        localStorage.setItem('openedTab', sessionStorage.getItem("tabID"))
if(operator === 'add'){
    console.log(item)
    setChangeDataLog(`${item} was added to the cart`)
    localStorage.setItem('actionLog',`${item} was added to the cart` )
}else if(operator === 'subtract'){
    setChangeDataLog(`${item} was removed from the cart`)
    localStorage.setItem('actionLog',`${item} was removed from the cart`)
}
    }

const handleAddToCart = (item) => {
    let updatedItem;
    let itemIndex = cartData.findIndex(product => product.id === item.id)
    //calculate the total price and to the data object
    if(cartData.length === 0 || itemIndex === -1 ){
        updatedItem = {...item, subTotal:(item.quantitySelected * item.price).toFixed(2) }
        delete updatedItem.quantity
        setCartData([...cartData, updatedItem])
        handleSetDataLog('add', item.name )
        // setChangeDataLog(`${item.product} was added to the cart`)
    }else {
        let newCartData = [...cartData]
        let foundItem =  newCartData[itemIndex]
        foundItem.quantitySelected = foundItem.quantitySelected + item.quantitySelected;
        foundItem.subTotal = ((foundItem.quantitySelected + item.quantitySelected) * item.price).toFixed(2)
        delete foundItem.quantity
        setCartData([...newCartData])
        handleSetDataLog('add', item.name )
        // setChangeDataLog(`${item.product} was added to the cart`)
    }
    // reset the quantity in the main data to 0
    handleResetQuantity(item)
    //close the modal
    handleClose()
}

const handleResetQuantity = (item) => {
    let updatedData = data.result.map(product => {
        if(product.id !== item.id){
            return product
        }else {
            return {...product, quantitySelected:0}
        }
    })

    setData({...data, result:updatedData})
}

const handleRemoveItemFromCart = (item) => {
let deletedItem = cartData.filter(product => item.id === product.id)
let quantityToAddBackToStock = deletedItem[0].quantitySelected
let filteredCart = cartData.filter(product => item.id !== product.id)
handleRestockDeletedItem(item,quantityToAddBackToStock)

setCartData(filteredCart)
handleSetDataLog('subtract', deletedItem[0].product )
// setChangeDataLog(`${deletedItem[0].product} was removed from the cart`)
}

const handleRestockDeletedItem = (item,quantityToAddBackToStock) => {
    let newUpdatedData = data.result.map(product => {
        if(product.id !== item.id){
            return product
        }else {
            return {...product, quantity:product.quantity + quantityToAddBackToStock}
        }
    })
    setData({...data, result:newUpdatedData})
    }

    const handleCheckout = async() => {
       const checkoutData = {
           requestId: new Date().getTime().toString(16),
           items: cartData
       }
       setIsCheckoutLoading(true)

       try {
        const request = await fetch('https://oja-oba-service.herokuapp.com/v1/order/create', {
            method:"POST",
            headers: {
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(checkoutData)
            // body: JSON.stringify(checkoutData)
        })
        const response = await request.json()
if(response && response.status === "SUCCESS"){
    toast.success("Checkout is Successful", {
        position: toast.POSITION.TOP_CENTER
      });
      setCartData([])
          setIsCheckoutLoading(false)
}else {
    console.log(response)
    toast.error(response.description || response.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setIsCheckoutLoading(false)
}
    } catch (error) {
        toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER
          });
          setIsCheckoutLoading(false)
    }
    }

    const handleAuthentication = (val) => {
        setIsAuthenticated(val)
    }

    const value = {
        handleOpenCart,
        handleOpen,
        handleUpdateQuantity,
        handleAddToCart,
        handleClose,
        handleCloseCart,
        handleRemoveItemFromCart,
        handleCheckout,
        handleCloseLogModal,
        handleAuthentication,
        isAuthenticated,
        data,
        cartData,
        open,
        modalData,
        handleFetchData,
        isLogModalOpen,
        isCartOpen,
        changeDataLog,
        isCheckoutLoading
    }

    return (
        <StateContext.Provider
          value={value}
        >
          {props.children}
        </StateContext.Provider>
      );
}

export default Context;
