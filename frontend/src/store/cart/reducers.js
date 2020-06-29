import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_DISCARD
} from './types'
import cookie from 'js-cookie'

export default (state = cookie.getJSON('cart') || {}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      if (state[action.payload.id]) {
        return {
          ...state,
          [action.payload.id]: {
            ...action.payload,
            quantity: action.payload.quantity
          }
        }
      }
      return { ...state, [action.payload.id]: action.payload }
    case CART_REMOVE_ITEM:
      const { [action.payload]: deletedValue, ...newState } = state
      return newState
    case CART_DISCARD:
      return {}
    default:
      return state
  }
}