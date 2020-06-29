import React, { useState, useEffect } from 'react'
import { createOrder } from '../../store/orders/actions'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import InputMask from 'react-input-mask'
import Cards from 'react-credit-cards'
import Button from '../../components/Button/Button'

import styles from './CheckoutScreen.module.scss'
import 'react-credit-cards/es/styles.scss'

const CheckoutScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector(({ cart }) => cart)
  const loaded = useSelector(({ createdOrder }) => createdOrder.loaded)
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [shippingError, setShippingError] = useState('')
  const [cvc, setCvc] = useState('')
  const [expiry, setExpiry] = useState('')
  const [focused, setFocused] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [paymentError, setPaymentError] = useState('')
  const [isOrderInfoBeingFilled, setIsOrderInfoBeingFilled] = useState(false)

  const onCountryChange = event => {
    setCountry(event.target.value)
  }

  const onCityChange = event => {
    setCity(event.target.value)
  }

  const onAddressChange = event => {
    setAddress(event.target.value)
  }

  const onInputFocus = event => {
    setIsOrderInfoBeingFilled(true)
    setFocused(event.target.name)
  }

  const onNumberChange = event => {
    setNumber(event.target.value)
  }

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onExpiryChange = event => {
    setExpiry(event.target.value)
  }

  const onCvcChange = event => {
    setCvc(event.target.value)
  }

  const onOrderFinishButtonClick = () => {
    if (!country || !city || !address)
      setShippingError('Введите все поля')
    else if (/\d/.test(country) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(country))
      setShippingError('Некорректные символы в названии страны')
    else if (/\d/.test(city) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(city))
      setShippingError('Некорректные символы в названии города')
    else
      setShippingError('')

    const month = expiry.substr(0, expiry.indexOf('/'))
    const year = expiry.substr(expiry.indexOf('/') + 1, expiry.length)
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear() - 2000

    if (!number || !name || !expiry || !cvc)
      setPaymentError('Введите все поля')
    else if (number.length !== 19)
      setPaymentError('Введите полностью номер карты')
    else if (month.length !== 2 || year.length !== 2)
      setPaymentError('Введите полностью срок действия карты')
    else if (/\d/.test(name) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name))
      setPaymentError('Некорректные символы в имени держателя карты')
    else if (!/^[ a-zA-Z]+$/.test(name))
      setPaymentError('Введите имя, используя латинские буквы')
    else if (month > 12 || month == 0)
      setPaymentError('Введите корректный месяц')
    else if (year < 20)
      setPaymentError('Нельзя вводить прошедшие года')
    else if (year == currentYear && month < currentMonth)
      setPaymentError('Срок действия карты истек. Проверьте дату еще раз')
    else
      setPaymentError('')
  }

  useEffect(() => {
    if (!shippingError && !paymentError && isOrderInfoBeingFilled) {
      const lastFourDigits = number.split(' ')[3]

      dispatch(createOrder({
        shipping: `${country}, ${city}, ${address}`,
        payment: `**** **** **** ${lastFourDigits}`,
        totalPrice: 350
      }))
    }
  }, [shippingError, paymentError])

  useEffect(() => {
    loaded && history.push('/client-profile')
  }, [loaded])

  return (
    <>
      <h2 className={styles.title}>Оформление заказа</h2>
      <NavLink to="/cart" className={styles.breadcrump}>Назад к корзине</NavLink>
      <div className={styles.containers}>
        <div className={styles.container}>
          <h3 className={styles.containerTitle}>Доставка</h3>
          <form className={styles.form}>
            {shippingError && <p className={styles.error}>{shippingError}</p>}
            <label htmlFor="country" className={styles.label}>Страна</label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={onCountryChange}
              onFocus={onInputFocus}
              className={styles.input}
            />

            <label htmlFor="city" className={styles.label}>Город</label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={onCityChange}
              onFocus={onInputFocus}
              className={styles.input}
            />

            <label htmlFor="address" className={styles.label}>Адрес</label>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={onAddressChange}
              onFocus={onInputFocus}
              className={styles.input}
            />
          </form>
        </div>
        <div className={styles.container}>
          <h3 className={styles.containerTitle}>Оплата</h3>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focused}
            name={name}
            number={number}
          />
          <form className={styles.form}>
            {paymentError && <p className={styles.error}>{paymentError}</p>}
            <label htmlFor="number" className={styles.label}>Номер карты</label>
            <InputMask
              mask="9999 9999 9999 9999"
              maskChar=""
              type="text"
              name="number"
              id="number"
              value={number}
              onChange={onNumberChange}
              onFocus={onInputFocus}
              className={styles.input}
            />

            <label htmlFor="name" className={styles.label}>Держатель карты</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onNameChange}
              onFocus={onInputFocus}
              className={`${styles.input} ${styles.inputName}`}
            />

            <div className={styles.expiryAndCvc}>
              <div className={styles.expiryAndCvcInput}>
                <label htmlFor="expiry" className={styles.label}>Срок действия</label>
                <InputMask
                  mask="99/99"
                  maskChar=""
                  type="tel"
                  name="expiry"
                  id="expiry"
                  value={expiry}
                  onChange={onExpiryChange}
                  onFocus={onInputFocus}
                  className={styles.input}
                />
              </div>

              <div className={styles.expiryAndCvcInput}>
                <label htmlFor="cvc" className={styles.label}>CVC</label>
                <InputMask
                  mask="999"
                  maskChar=""
                  type="text"
                  name="cvc"
                  id="cvc"
                  value={cvc}
                  onChange={onCvcChange}
                  onFocus={onInputFocus}
                  className={styles.input}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div onClick={onOrderFinishButtonClick} className={styles.orderFinishButton}>
        <Button text="Выполнить заказ" type="button" />
      </div>
    </>
  )
}

export default CheckoutScreen
