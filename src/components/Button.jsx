import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
display: flex;
padding: 13px;
background-color:#227AFF;
border: none;
border-radius: 2px;
cursor: pointer;
width:100%;
/* width: 90%;
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0; */
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
`;
export const Button = ({onClick,disabled, isLoading, buttonText, loadingText,...props }) => {
    return (
        <StyledButton
        onClick={onClick}
        disabled={disabled}
       { ...props}
        >
<p className="price">{isLoading ? loadingText : buttonText}</p>
</StyledButton>
    )
}
