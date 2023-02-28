import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './redux/reducers/cartSlice'
import modalReducer from './redux/reducers/modalSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
})
