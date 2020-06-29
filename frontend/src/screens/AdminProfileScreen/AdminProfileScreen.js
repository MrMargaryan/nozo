import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../store/products/actions'
import Button from '../../components/Button/Button'

import styles from './AdminProfileScreen.module.scss'

const AdminProfileScreen = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('Nike')
  const [price, setPrice] = useState()
  const [countInStock, setCountInStock] = useState()
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onImageChange = event => {
    setImage(URL.createObjectURL(event.target.files[0]))
  }

  const onBrandChange = event => {
    setBrand(event.target.value)
  }

  const onPriceChange = event => {
    setPrice(event.target.value)
  }

  const onCountInStockChange = event => {
    setCountInStock(event.target.value)
  }

  const onDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const onAddProductButton = event => {
    event.preventDefault()

    if (!name || !image || !price || !countInStock) {
      setError(true)
    } else {
      setError(false)
      dispatch(addProduct({
        name,
        image,
        brand,
        price,
        countInStock,
        description
      }))
      setName('')
      setImage('')
      setBrand('')
      setPrice('')
      setCountInStock('')
      setDescription('')
    }
  }

  return (
    <>
      <h2 className={styles.title}>Панель администратора</h2>
      <div className={styles.addProductBox}>
        <h3 className={styles.addProductBoxTitle}>Добавить товар</h3>
        <form className={styles.form}>
          {error && <p className={styles.error}>Введите все поля</p>}
          <label htmlFor="name" className={styles.label}>Название</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onNameChange}
            className={styles.input}
          />

          <label htmlFor="image" className={styles.label}>Изображение</label>
          <input
            type="file"
            accept="/image/*"
            name="image"
            id="image"
            onChange={onImageChange}
            className={styles.input}
          />
          {image && <img src={image} alt={name} className={styles.image} />}

          <label htmlFor="brand" className={styles.label}>Бренд</label>
          <select name="brand" id="brand" onChange={onBrandChange} value={brand} className={styles.input}>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </select>

          <label htmlFor="price" className={styles.label}>Цена</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={onPriceChange}
            className={styles.input}
          />

          <label htmlFor="countInStock" className={styles.label}>В наличии</label>
          <input
            type="number"
            name="countInStock"
            id="countInStock"
            value={countInStock}
            onChange={onCountInStockChange}
            className={styles.input}
          />

          <label htmlFor="description" className={styles.label}>Описание</label>
          <textarea id="description" name="description" value={description} onChange={onDescriptionChange} className={styles.input} />

          <div onClick={onAddProductButton}>
            <Button text="Добавить товар" type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}

export default AdminProfileScreen
