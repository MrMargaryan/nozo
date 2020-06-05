import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types'
import axios from 'axios'

export const addToCart = (id, quantity) => async dispatch => {
  try {
    const { data: { _id, name, image, price, countInStock } } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: _id,
        name,
        image,
        price,
        countInStock,
        quantity
      }
    })
  } catch ({ message }) {
    console.error(message)
  }
}

export const removeFromCart = id => ({
  type: CART_REMOVE_ITEM,
  payload: id
})