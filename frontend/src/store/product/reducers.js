import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL
} from './types'

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_PRODUCT_FAIL:
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