import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/products/actions'
import Product from '../../components/Product/Product'

import styles from './HomeScreen.module.scss'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const editProduct = useSelector(({ editProduct }) => editProduct)
  const removeProduct = useSelector(({ removeProduct }) => removeProduct)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [editProduct, removeProduct])

  if (loading) {
    return <span>Загрузка...</span>
  }

  if (!entities.length && loaded) {
    return <span>Данные отсутствуют</span>
  }

  if (error) {
    return <span>Извините, произошла ошибка</span>
  }

  return (
    <div className={styles.products}>
      {
        entities.map(({ _id, name, image, price, brand, rating, numReviews }) => {
          return (
            <Product
              key={_id}
              id={_id}
              name={name}
              image={image}
              price={price}
              brand={brand}
              rating={rating}
              numReviews={numReviews}
            />
          )
        })
      }
    </div>
  )
}

export default HomeScreen
