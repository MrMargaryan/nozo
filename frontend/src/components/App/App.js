import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import ProductScreen from '../../screens/ProductScreen/ProductScreen'
import CartScreen from '../../screens/CartScreen/CartScreen'
import LoginScreen from '../../screens/LoginScreen/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen'
import ClientProfileScreen from '../../screens/ClientProfileScreen/ClientProfileScreen'
import CheckoutScreen from '../../screens/CheckoutScreen/CheckoutScreen'
import AdminProfileScreen from '../../screens/AdminProfileScreen/AdminProfileScreen'
import ProductEditScreen from '../../screens/ProductEditScreen/ProductEditScreen'
import OrderDetailScreen from '../../screens/OrderDetailScreen/OrderDetailScreen'

import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.contentWrapper}>
      <Router>
        <Header />
        <main className={styles.container} style={{ paddingBottom: '20px !important' }}>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/client-profile" component={ClientProfileScreen} />
            <Route path="/admin-profile" component={AdminProfileScreen} />
            <Route path="/checkout" component={CheckoutScreen} />
            <Route path="/edit/:id" component={ProductEditScreen} />
            <Route path="/order/:id" component={OrderDetailScreen} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
