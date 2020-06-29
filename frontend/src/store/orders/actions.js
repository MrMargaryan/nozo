import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
} from './types'
import { CART_DISCARD } from '../cart/types'
import axios from 'axios'
import cookie from 'js-cookie'

export const createOrder = order => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    await axios.post('/api/orders', order, { headers: { token } })

    dispatch({
      type: ORDER_CREATE_SUCCESS
    })

    dispatch({
      type: CART_DISCARD
    })

    cookie.remove('cart')
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.message
    })
  }
}