import { combineReducers } from 'redux'

import { fetchProductsReducer, fetchProductReducer } from './products/reducers'
import cartReducer from './cart/reducers'
import userReducer from './user/reducers'
import { orderCreateReducer } from './orders/reducers'

export default combineReducers({
  products: fetchProductsReducer,
  product: fetchProductReducer,
  cart: cartReducer,
  user: userReducer,
  createdOrder: orderCreateReducer
})