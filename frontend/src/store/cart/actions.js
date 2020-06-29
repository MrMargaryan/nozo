import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data: { _id, name, brand, image, price, countInStock } } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: _id,
        name,
        image,
        brand,
        price,
        countInStock,
        quantity
      }
    })

    const { cart } = getState()
    cookie.set('cart', JSON.stringify(cart), { expires: 7 })
  } catch ({ message }) {
    console.error(message)
  }
}

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  const { cart } = getState()
  cookie.set('cart', JSON.stringify(cart), { expires: 7 })
}