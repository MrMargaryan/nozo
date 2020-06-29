import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOGOUT,
  ERROR_REMOVE
} from './types'
import cookie from 'js-cookie'

const initialState = {
  loading: false,
  error: null,
  entities: cookie.getJSON('user') || {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        entities: action.payload
      }
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case USER_LOGOUT:
      return {
        loading: false,
        error: null,
        entities: {}
      }
    case ERROR_REMOVE:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}