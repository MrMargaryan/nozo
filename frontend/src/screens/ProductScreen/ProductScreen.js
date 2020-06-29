import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchProduct } from '../../store/products/actions'
import { addToCart } from '../../store/cart/actions'
import airmax from '../../images/airmax.jpg'
import Button from '../../components/Button/Button'

import styles from './ProductScreen.module.scss'

const ProductScreen = ({ match: { params: { id } } }) => {
  const dispatch = useDispatch()
  const status = useSelector(({ user }) => user.entities.status)
  const { loading, loaded, error, entities: { name, brand, price, description, countInStock } } = useSelector(({ product }) => product)

  const [totalPrice, setTotalPrice] = useState(price)
  const [quantity, setQuantity] = useState(1)

  const onQuantityChange = event => {
    setQuantity(event.target.value)
  }

  useEffect(() => {
    setTotalPrice(price * quantity)
  }, [quantity, price])

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [])

  const onAddToCartButtonClick = () => {
    dispatch(addToCart(id, quantity))
  }

  if (loading) {
    return <span>Загрузка...</span>
  }

  if (!name && loaded) {
    return <span>Данные отсутствуют</span>
  }

  if (error) {
    return <span>Извините, произошла ошибка</span>
  }

  const renderButton = () => {
    switch (status) {
      case 'admin':
        return (
          <NavLink to={`/edit/${id}`}>
            <Button text="Редактировать" type="button" />
          </NavLink>
        )
      default:
        return (
          <div onClick={onAddToCartButtonClick} className={!countInStock && styles.addToCartButtonDisabled}>
            <Button text="Добавить в корзину" type="button" />
          </div>
        )
    }
  }

  return (
    <>
      <NavLink to="/" className={styles.breadcrump}>Перейти к товарам</NavLink>
      <div className={styles.container}>
        <img src={airmax} alt={name} className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.brand}>{brand}</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.price}>&#8381;{totalPrice}</p>
          {
            countInStock
              ? (
                <form className={styles.form}>
                  <label htmlFor="quantity" className={styles.label}>Количество:</label>
                  <select name="quantity" id="quantity" value={quantity} onChange={onQuantityChange} className={styles.select}>
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
                </form>
              )
              : <p className={styles.stockWarning}>Нет в наличии</p>
          }
          {

          }
          {renderButton()}
        </div>
      </div>
    </>
  )
}

export default ProductScreen
