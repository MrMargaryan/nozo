import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL
} from './types'

// CREATE ORDER REDUCER
const orderCreateInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const orderCreateReducer = (state = orderCreateInitialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case ORDER_CREATE_FAIL:
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

// FETCH USER ORDERS REDUCER
const fetchUserOrdersInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export const fetchUserOrdersReducer = (state = fetchUserOrdersInitialState, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_USER_ORDERS_FAIL:
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

// FETCH ORDER REDUCER
const fetchOrderInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {}
}

export const fetchOrderReducer = (state = fetchOrderInitialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_ORDER_FAIL:
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