import { combineReducers } from 'redux'

import {
  fetchProductsReducer,
  fetchProductReducer,
  addProductReducer,
  editProductReducer,
  removeProductReducer
} from './products/reducers'
import cartReducer from './cart/reducers'
import userReducer from './user/reducers'
import { orderCreateReducer } from './orders/reducers'

export default combineReducers({
  products: fetchProductsReducer,
  product: fetchProductReducer,
  addProduct: addProductReducer,
  editProduct: editProductReducer,
  removeProduct: removeProductReducer,
  cart: cartReducer,
  user: userReducer,
  createdOrder: orderCreateReducer
})