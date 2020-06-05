import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types'

export default (state = {}, action) => {
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
    default:
      return state
  }
}