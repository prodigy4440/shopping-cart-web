import React from 'react'
import { ModalComponent } from './ModalComponent';
import styled from 'styled-components';
import { useContext } from 'react';
import { StateContext } from '../context/Context';

export const StyledAlertModal = styled.div`
background-color:#fff;
padding:16px;
`;

export const BroadcastModal = () => {

const {
    isLogModalOpen,
handleCloseLogModal,
changeDataLog,
} = useContext(StateContext)

return <ModalComponent
    open={isLogModalOpen}
    handleClose={handleCloseLogModal}
>
    <StyledAlertModal>
        <h1>Someone Changed The Data</h1>
        <p>{changeDataLog}</p>
    </StyledAlertModal>

</ModalComponent>
}
