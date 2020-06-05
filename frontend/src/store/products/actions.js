import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL
} from './types'
import axios from 'axios'

export default () => async dispatch => {
  try {
    dispatch({
      type: FETCH_PRODUCTS_REQUEST
    })

    const { data } = await axios.get('/api/products')
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