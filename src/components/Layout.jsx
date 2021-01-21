import React,{useContext} from 'react';
import styled from 'styled-components';
import { Navbar } from './Navbar';

const StyledLayout = styled.section`
max-width:1440px;
margin: 48px auto;

.ShopLogo{
    font-size: 40px;
    color: #227AFF;

    @media screen and (max-width: 400px){
        font-size:25px;
        font-weight: bolder;
    }
}

.SearchContainer {
    width: 480px;
    height: 48px;
    position: relative;
}

.SearchInput{
    height: 100%;
    width:100%;
    border:1px solid #DDDDDD;
    border-radius: 2px;
    padding: 16px 12px;
    outline-color: #227AFF;
}

.itemInCart {
display: flex;
padding: 13px;
background-color:#227AFF;
border: none;
border-radius: 2px;
cursor: pointer;

:hover {
    opacity: .6;
}
}
.price,.cartText {
    margin-left: 5px;
    color: #fff;
    font-weight:bolder;
}

.cartText {
    @media screen and (max-width:350px){
        display:none;
    }
}
.fullPage {
    height: 100%;
    display: grid;
    place-content: center;
}
`




export const Layout = ({children,isCartPresent=true}) => {


    return (
        <StyledLayout>
     <Navbar isCartPresent={isCartPresent}/>
                {children}
        </StyledLayout>
    )
}
