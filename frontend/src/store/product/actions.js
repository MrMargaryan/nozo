import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_FAIL
} from './types'
import axios from 'axios'

export default (id) => async dispatch => {
  try {
    dispatch({
      type: FETCH_PRODUCT_REQUEST
    })

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data
    })
  } catch ({ message }) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload: message
    })
  }
}