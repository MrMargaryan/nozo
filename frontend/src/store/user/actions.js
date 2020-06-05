import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGHIN_FAIL,
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const signin = (email, password) => async dispatch => {
  dispatch({
    type: USER_SIGNIN_REQUEST
  })

  try {
    const { data } = await axios.post('/api/users/signin', { email, password })
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    })
    cookie.set('user', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGHIN_FAIL,
      payload: error.message
    })
  }
}