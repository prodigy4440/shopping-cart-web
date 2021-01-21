import React, { useContext } from 'react'
import styled from 'styled-components'
import { StateContext } from '../context/Context'
import { Product } from './Product'

const StyledProductsList = styled.section`
display: grid;
grid-gap: 16px;
grid-template-columns: repeat(auto-fit, minmax(271px, 1fr));
grid-auto-rows: 262px;
margin: 16px;

@media screen and (max-width:350px){
    grid-template-columns: 1fr;

    }
`

export const ProductList = () => {
    const {data:{result},handleOpen } = useContext(StateContext)
    return (
        <StyledProductsList>
        {result && result.map(item => {

            return <Product
                item={item}
                key={item.id}
                handleOpen={handleOpen}
            />
        })}
    </StyledProductsList>
    )
}
