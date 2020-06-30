import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../store'
import { render, cleanup, fireEvent } from '@testing-library/react'
import CheckoutScreen from '../screens/CheckoutScreen/CheckoutScreen'

afterEach(cleanup)

it('should give error to fill all the shipping inputs', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router>
        <CheckoutScreen />
      </Router>
    </Provider>
  )

  fireEvent.click(getByTestId('orderFinish'))

  expect(getByTestId('shippingError').textContent).toBe('Введите все поля')
})

it('should give error to fill all the payment inputs', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router>
        <CheckoutScreen />
      </Router>
    </Provider>
  )

  fireEvent.click(getByTestId('orderFinish'))

  expect(getByTestId('paymentError').textContent).toBe('Введите все поля')
})