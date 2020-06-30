import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import { render, cleanup } from '@testing-library/react'
import HomeScreen from '../screens/HomeScreen/HomeScreen'

afterEach(cleanup)

it('should be "all" by default', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  )

  expect(getByTestId('brand').textContent).toBe('ВсеNikeAdidasPumaReebok')
})

it('should have value named nike', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  )

  expect(getByTestId('nike').textContent).toBe('Nike')
})

it('should have value named adidas', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  )

  expect(getByTestId('adidas').textContent).toBe('Adidas')
})

it('should have value named adidas', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  )

  expect(getByTestId('adidas').textContent).toBe('Adidas')
})
