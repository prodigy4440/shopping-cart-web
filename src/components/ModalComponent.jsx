import React from 'react'
import Modal from '@material-ui/core/Modal';
import styled  from 'styled-components'
// const NewModal = MaterialModal.Modal
const StyledModal = styled(Modal)`
      width: 100%;
      height:100%;
      display:flex;
      justify-content: center;
    align-items: center;
    position:relative;
`
export const ModalComponent = ({children,open,handleClose}) => {
    return (
        <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="product details"
        aria-describedby="product description details"
      >
          {children}
      </StyledModal>

    )
}
