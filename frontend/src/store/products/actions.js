import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAIL,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_FAIL,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAIL
} from './types'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
if (process.env.NODE_ENV !== 'production')
  axios.defaults.baseURL = 'http://127.0.0.1:5000'

export const fetchProduct = id => async dispatch => {
  try {
    dispatch({
      type: FETCH_PRODUCT_REQUEST
    })

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload: error.message
    })
  }
}

export const fetchProducts = (term, brand, sort) => async dispatch => {
  try {
    dispatch({
      type: FETCH_PRODUCTS_REQUEST
    })

    const { data } = await axios.get(`/api/products?term=${term}&brand=${brand}&sort=${sort}`)
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch ({ message }) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: message
    })
  }
}

export const addProduct = product => async (dispatch, getState) => {
  dispatch({
    type: ADD_PRODUCT_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    const bodyFormData = new FormData()
    bodyFormData.set('name', product.name)
    bodyFormData.set('image', product.image)
    bodyFormData.set('brand', product.brand)
    bodyFormData.set('price', product.price)
    bodyFormData.set('countInStock', product.countInStock)
    bodyFormData.set('description', product.description)

    await axios({
      method: 'post',
      url: '/api/products',
      data: bodyFormData,
      headers: {
        token,
        'Content-Type': 'multipart/form-data'
      }
    })

    dispatch({
      type: ADD_PRODUCT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.message
    })
  }
}

export const editProduct = (id, product) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_PRODUCT_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    await axios.put(`/api/products/${id}`, product, { headers: { token } })

    dispatch({
      type: EDIT_PRODUCT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload: error.message
    })
  }
}

export const removeProduct = id => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_PRODUCT_REQUEST
  })

  try {
    const { user: { entities: { token } } } = getState()

    await axios.delete(`/api/products/${id}`, { headers: { token } })

    dispatch({
      type: REMOVE_PRODUCT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FAIL,
      payload: error.message
    })
  }
}

export const addReview = (id, rating, comment) => async (dispatch, getState) => {
  dispatch({
    type: ADD_REVIEW_REQUEST
  })

  try {
    const { user: { entities: { name, token } } } = getState()

    await axios.post(`/api/products/review/${id}`, { name, rating, comment }, { headers: { token } })

    dispatch({
      type: ADD_REVIEW_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: ADD_REVIEW_FAIL,
      payload: error.message
    })
  }
}