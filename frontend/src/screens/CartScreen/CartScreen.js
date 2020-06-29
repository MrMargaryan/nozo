import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../store/cart/actions'
import airmax from '../../images/airmax.jpg'
import Button from '../../components/Button/Button'

import styles from './CartScreen.module.scss'

const CartScreen = ({ history }) => {
  const dispatch = useDispatch()
  const products = useSelector(({ cart }) => Object.values(cart))
  const productsQuantity = products.reduce((acc, { quantity }) => acc + +quantity, 0)
  const totalPrice = products.reduce((acc, { price, quantity }) => acc + +quantity * +price, 0)
  const user = useSelector(({ user }) => user.entities._id)

  const productsEnding = () => {
    if (
      productsQuantity % 10 === 0 ||
      productsQuantity % 10 === 5 ||
      productsQuantity % 10 === 6 ||
      productsQuantity % 10 === 7 ||
      productsQuantity % 10 === 8 ||
      productsQuantity % 10 === 9 ||
      productsQuantity === 11 ||
      productsQuantity === 12 ||
      productsQuantity === 13 ||
      productsQuantity === 14
    )
      return 'товаров'
    else if (productsQuantity % 10 === 1 && productsQuantity !== 11) return 'товар'
    else return 'товара'
  }

  const onQuantityChange = (event, id) => {
    dispatch(addToCart(id, event.target.value))
  }

  const onRemoveButtonClick = id => {
    dispatch(removeFromCart(id))
  }

  const onCheckoutButtonClick = () => {
    user ? history.push('/checkout') : history.push('/register?redirect=checkout')
  }

  return (
    <>
      <h2 className={styles.title}>Корзина</h2>
      <div className={styles.cart}>
        {
          products.map(product => {
            const { id, name, brand, price, quantity, countInStock } = product

            return (
              <div key={id} className={styles.cartItem}>
                <img src={airmax} alt={name} className={styles.image} />
                <div className={styles.content}>
                  <NavLink to={`/product/${id}`} className={styles.name}>{brand} / {name}</NavLink>
                  <select value={quantity} onChange={event => onQuantityChange(event, id)} className={styles.select}>
                    {
                      [...Array(countInStock).keys()].map(number =>
                        <option
                          key={number + 1}
                          value={number + 1}
                        >
                          {number + 1}
                        </option>
                      )
                    }
                  </select>
                  <button onClick={() => onRemoveButtonClick(id)} className={styles.deleteButton}>Удалить</button>
                  <p className={styles.price}>&#8381;{price * quantity}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <p className={styles.totalPriceWrapper}>
        <span>Итого ({productsQuantity} {productsEnding()}): </span>
        <span className={styles.totalPrice}>&#8381;{totalPrice}</span>
      </p>
      <div onClick={onCheckoutButtonClick} className={products.length ? styles.checkoutButtonActive : styles.checkoutButtonDisabled}>
        <Button text="Оформить заказ" type="button" />
      </div>
    </>
  )
}

export default CartScreen
