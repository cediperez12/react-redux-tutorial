import React from 'react'
import { useDispatch } from 'react-redux'

import { clearCart } from '../redux/reducers/cartSlice'
import { closeModal } from '../redux/reducers/modalSlice'

const Modal = () => {
  const dispatch = useDispatch()

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            className="btn confirm-btn"
            onClick={(e) => {
              dispatch(clearCart())
              dispatch(closeModal())
            }}
          >
            confirm
          </button>
          <button
            className="btn clear-btn"
            onClick={(e) => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Modal
