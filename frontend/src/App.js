import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen/CartScreen'
import SigninScreen from './screens/SigninScreen'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Container className="mt-4 mb-4">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/signin" component={SigninScreen} />
          </Switch>
        </Container>
      </Router>
    </>
  )
}

export default App
