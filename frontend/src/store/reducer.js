import { combineReducers } from 'redux'

import {
  fetchProductsReducer,
  fetchProductReducer,
  addProductReducer,
  editProductReducer,
  removeProductReducer,
  addReviewReducer
} from './products/reducers'
import cartReducer from './cart/reducers'
import userReducer from './user/reducers'
import {
  orderCreateReducer,
  fetchUserOrdersReducer,
  fetchOrderReducer,
  fetchOrdersReducer,
  changeIsDeliveredReducer
} from './orders/reducers'

export default combineReducers({
  products: fetchProductsReducer,
  product: fetchProductReducer,
  addProduct: addProductReducer,
  editProduct: editProductReducer,
  removeProduct: removeProductReducer,
  addReview: addReviewReducer,
  cart: cartReducer,
  user: userReducer,
  createdOrder: orderCreateReducer,
  userOrders: fetchUserOrdersReducer,
  order: fetchOrderReducer,
  orders: fetchOrdersReducer,
  changeIsDelivered: changeIsDeliveredReducer
})