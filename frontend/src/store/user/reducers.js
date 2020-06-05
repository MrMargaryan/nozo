import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGHIN_FAIL
} from './types'

const initialState = {
  loading: false,
  error: null,
  entities: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: action.payload
      }
    case USER_SIGHIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}