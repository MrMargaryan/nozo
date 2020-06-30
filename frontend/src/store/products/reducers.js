import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAIL,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAIL
} from './types'

// FETCH PRODUCTS REDUCER
const productsInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export const fetchProductsReducer = (state = productsInitialState, action) => {
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

// FETCH PRODUCT REDUCER
const productInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {}
}

export const fetchProductReducer = (state = productInitialState, action) => {
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

// ADD PRODUCT REDUCER
const addProductInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const addProductReducer = (state = addProductInitialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      }
    default:
      return state
  }
}

// EDIT PRODUCT REDUCER
const editProductInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const editProductReducer = (state = editProductInitialState, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case EDIT_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      }
    default:
      return state
  }
}

// REMOVE PRODUCT REDUCER
const removeProductInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const removeProductReducer = (state = removeProductInitialState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case REMOVE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      }
    default:
      return state
  }
}

// ADD REVIEW REDUCER
const addReviewInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const addReviewReducer = (state = addReviewInitialState, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      }
    default:
      return state
  }
}