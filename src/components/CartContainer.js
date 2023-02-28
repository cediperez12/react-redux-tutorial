import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CartItem from './CartItem'
import { clearCart } from '../redux/reducers/cartSlice'
import { openModal } from '../redux/reducers/modalSlice'

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag </h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
      </footer>
      <button className="btn clear-btn" onClick={(e) => dispatch(openModal())}>
        clear cart
      </button>
    </section>
  )
}

export default CartContainer
