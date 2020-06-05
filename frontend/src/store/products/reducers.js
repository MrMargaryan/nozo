import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL
} from './types'

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      }
    default:
      return state
  }
}