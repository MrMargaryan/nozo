import { combineReducers } from 'redux'

import productsReducer from './products/reducers'
import productReducer from './product/reducers'
import cartReducer from './cart/reducers'
import userReducer from './user/reducers'

export default combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer
})