import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  CHANGE_IS_DELIVERED_REQUEST,
  CHANGE_IS_DELIVERED_SUCCESS,
  CHANGE_IS_DELIVERED_FAIL
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

export const fetchUserOrders = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_USER_ORDERS_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    const { data } = await axios.get('/api/orders/user', { headers: { token } })

    dispatch({
      type: FETCH_USER_ORDERS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_USER_ORDERS_FAIL,
      payload: error.message
    })
  }
}

export const fetchOrder = id => async (dispatch, getState) => {
  dispatch({
    type: FETCH_ORDER_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    const { data } = await axios.get(`/api/orders/${id}`, { headers: { token } })

    dispatch({
      type: FETCH_ORDER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_FAIL,
      payload: error.message
    })
  }
}

export const fetchOrders = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_ORDERS_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    const { data } = await axios.get('/api/orders/all', { headers: { token } })

    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload: error.message
    })
  }
}

export const changeIsDelivered = (id, isDelivered) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_IS_DELIVERED_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    await axios.put(`/api/orders/isDelivered`, { id, isDelivered }, { headers: { token } })

    dispatch({
      type: CHANGE_IS_DELIVERED_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: CHANGE_IS_DELIVERED_FAIL,
      payload: error.message
    })
  }
}