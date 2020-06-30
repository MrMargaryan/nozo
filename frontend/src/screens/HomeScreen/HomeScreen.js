import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchProduct } from '../../store/products/actions'
import Product from '../../components/Product/Product'
import Button from '../../components/Button/Button'

import styles from './HomeScreen.module.scss'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const editProduct = useSelector(({ editProduct }) => editProduct)
  const removeProduct = useSelector(({ removeProduct }) => removeProduct)

  const [term, setTerm] = useState('')
  const [brand, setBrand] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    dispatch(fetchProducts(term, brand, sort))
  }, [editProduct, removeProduct])

  useEffect(() => {
    dispatch(fetchProducts(term, brand, sort))
  }, [brand])

  useEffect(() => {
    dispatch(fetchProducts(term, brand, sort))
  }, [sort])

  const onTermChange = event => {
    setTerm(event.target.value)
  }

  const onBrandChange = event => {
    setBrand(event.target.value)
  }

  const onSortChange = event => {
    setSort(event.target.value)
  }

  const onSearchButtonClick = event => {
    event.preventDefault()
    dispatch(fetchProducts(term, brand, sort))
  }

  const renderProducts = () => {
    if (loading) {
      return <span>Загрузка...</span>
    }

    if (!entities.length && loaded) {
      return (
        <span>Данные отсутствуют</span>
      )
    }

    if (error) {
      return <span>Извините, произошла ошибка</span>
    }

    return entities.map(({ _id, name, image, price, brand, rating, numReviews }) => {
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

  return (
    <>
      <div className={styles.filters}>
        <form className={styles.form}>
          <input
            type="text"
            value={term}
            onChange={onTermChange}
            className={styles.input}
          />
          <div className={styles.searchButton} onClick={onSearchButtonClick}>
            <Button text="Найти" type="submit" />
          </div>
        </form>
        <div>
          <span>Бренд</span>
          <select data-testid="brand" name="brand" value={brand} onChange={onBrandChange} className={styles.input}>
            <option value="">Все</option>
            <option data-testid="nike" value="Nike">Nike</option>
            <option data-testid="adidas" value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </select>
        </div>
        <div>
          <span>Сортировать</span>
          <select name="sort" value={sort} onChange={onSortChange} className={styles.input}>
            <option value="">По новизне</option>
            <option value="lowest">По цене &#8593;</option>
            <option value="highest">По цене &#8595;</option>
          </select>
        </div>
      </div>
      <div className={styles.products}>{renderProducts()}</div>
    </>
  )
}

export default HomeScreen
