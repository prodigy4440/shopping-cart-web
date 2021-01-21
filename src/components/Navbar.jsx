import React,{useContext} from 'react'
import styled from 'styled-components';
import { StateContext } from '../context/Context';
import {ReactComponent as Search} from '../../src/assets/icons/search.svg';
import {ReactComponent as Basket} from '../../src/assets/icons/basket.svg';
import {ReactComponent as User} from '../../src/assets/icons/user.svg';
import { AuthStateContext, logout} from '../context/Auth';
import { useHistory } from 'react-router-dom';

export const StyledNavBar = styled.nav`
background-color: #fff;
height: 80px;
/* width: 100%; */
display: flex;
align-items: center;
justify-content: space-between;
padding: 16px;
border-radius: 2px;
border: 1px solid #CCCCCC;
box-shadow: 0 2px 6px rgba(17, 17, 17, 0.07);
margin: 16px;
position: sticky;
top:0;

.cartLogout {
    display: flex;
}
.logout {
    border:none;
background:transparent;
color:#227AFF;
cursor:pointer;
margin-left: 20px;

@media screen and (max-width:350px){
        margin-left:5px;
        font-size:14px;
    }

:hover {
    text-decoration: underline
}
}
`

export const SearchIcon = styled(Search)`
position: absolute;
right: 16px;
    bottom: 15px;
`;
export const BasketIcon = styled(Basket)`
fill: #fff;
`;
export const UserIcon = styled(User)`

`;

export const Navbar = ({isCartPresent}) => {
    const history = useHistory();
    const { dispatch, user: { loading, error, token } } = useContext(AuthStateContext)

    const {handleOpenCart,cartData} = useContext(StateContext)

const handleCalculateCartTotal = (data) => {
  return  data.reduce((a,b) => a + b.quantitySelected, 0)
}
    return (
        <StyledNavBar>
        <p className="ShopLogo">Sello</p>

        {/* <div className="SearchContainer">
        <input type="text" placeholder="Search For" className="SearchInput"/>
        <SearchIcon/>
        </div> */}
        <div className="cartLogout">
{
     isCartPresent === true ? <>
     <div className="cartContainer">
        <button className="itemInCart" onClick={handleOpenCart}>
            <BasketIcon/>
            <p className="cartText">Cart</p>
            <p className="price">{handleCalculateCartTotal(cartData)}</p>
        </button>
        </div>

        <button className="logout"
        onClick={()=>logout(dispatch)}
        >
            Logout
        </button>
        </>
        : null
    }
    </div>
                      </StyledNavBar>
    )
}
