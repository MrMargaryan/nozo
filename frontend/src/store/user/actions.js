import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOGOUT,
  ERROR_REMOVE
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const login = (email, password) => async dispatch => {
  dispatch({
    type: USER_REQUEST
  })

  try {
    const { data } = await axios.post('/api/user/login', { email, password })

    dispatch({
      type: USER_SUCCESS,
      payload: data
    })

    cookie.set('user', JSON.stringify(data), { expires: 7 })
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response.data
    })
  }
}

export const register = (name, email, password) => async dispatch => {
  dispatch({
    type: USER_REQUEST
  })

  try {
    const { data } = await axios.post('/api/user/register', { name, email, password })

    dispatch({
      type: USER_SUCCESS,
      payload: data
    })

    cookie.set('user', JSON.stringify(data), { expires: 7 })
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response.data
    })
  }
}

export const logout = () => dispatch => {
  cookie.remove('user')

  dispatch({
    type: USER_LOGOUT
  })
}

export const update = (id, name, email, password) => async (dispatch, getState) => {
  const { user: { entities: { token } } } = getState()

  dispatch({
    type: USER_REQUEST
  })

  try {
    const { data } = await axios.put(`/api/user/${id}`,
      { name, email, password }, { headers: { token } }
    )

    dispatch({
      type: USER_SUCCESS,
      payload: data
    })

    cookie.set('user', JSON.stringify(data), { expires: 7 })
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response.data
    })
  }
}

export const removeError = () => ({
  type: ERROR_REMOVE
})