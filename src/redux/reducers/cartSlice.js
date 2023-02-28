import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import cartItems from '../../cartItems'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: false,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log('error', error.message))
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== id)
      state.amount = state.cartItems.length
    },
    increase: (state, action) => {
      const id = action.payload
      const item = state.cartItems.find((item) => item.id === id)
      item.amount += 1
    },
    decrease: (state, action) => {
      const id = action.payload
      const item = state.cartItems.find((item) => item.id === id)
      item.amount -= 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.price * item.amount
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload
        state.isLoading = false
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false
      })
  },
  // extraReducers: {
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     state.cartItems = action.payload
  //     state.isLoading = false
  //   },
  //   [getCartItems.rejected]: (state) => {
  //     state.isLoading = false
  //   },
  // },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
