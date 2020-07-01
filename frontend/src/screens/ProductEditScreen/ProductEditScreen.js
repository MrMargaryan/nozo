import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editProduct, removeProduct } from '../../store/products/actions'
import { fetchProduct } from '../../store/products/actions'
import Button from '../../components/Button/Button'

import styles from './ProductEditScreen.module.scss'

const ProductEditScreen = ({ match: { params: { id } }, history }) => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities: { name, image, brand, price, countInStock, description } } = useSelector(({ product }) => product)

  const [newName, setNewName] = useState(name)
  const [newImage, setNewImage] = useState(image)
  const [newBrand, setNewBrand] = useState(brand)
  const [newPrice, setNewPrice] = useState(price)
  const [newCountInStock, setNewCountInStock] = useState(countInStock)
  const [newDescription, setNewDescription] = useState(description)

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [])

  useEffect(() => {
    setNewName(name)
    setNewBrand(brand)
    setNewPrice(price)
    setNewCountInStock(countInStock)
    setNewDescription(description)
  }, [name])

  const onNewNameChange = event => {
    setNewName(event.target.value)
  }

  const onNewImageChange = event => {
    setNewImage(URL.createObjectURL(event.target.files[0]))
  }

  const onNewBrandChange = event => {
    setNewBrand(event.target.value)
  }

  const onNewPriceChange = event => {
    setNewPrice(event.target.value)
  }

  const onNewCountInStockChange = event => {
    setNewCountInStock(event.target.value)
  }

  const onNewDescriptionChange = event => {
    setNewDescription(event.target.value)
  }

  const onEditProductButtonClick = event => {
    event.preventDefault()

    dispatch(editProduct(id, {
      name: newName || name,
      image: newImage || name,
      brand: newBrand || brand,
      price: newPrice || price,
      countInStock: newCountInStock || countInStock,
      description: newDescription || description,
    }))

    history.push('/')
  }

  const onRemoveProductButtonClick = () => {
    dispatch(removeProduct(id))

    history.push('/')
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

  return (
    <>
      <form className={styles.form}>
        <label htmlFor="name" className={styles.label}>Название</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newName}
          onChange={onNewNameChange}
          placeholder={name}
          className={styles.input}
        />

        <label htmlFor="image" className={styles.label}>Изображение</label>
        <input
          type="file"
          accept="/image/*"
          name="image"
          id="image"
          onChange={onNewImageChange}
          className={styles.input}
        />
        {image && <img src={newImage} alt={name} className={styles.image} />}

        <label htmlFor="brand" className={styles.label}>Бренд</label>
        <select name="brand" id="brand" onChange={onNewBrandChange} value={newBrand} className={styles.input}>
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
          value={newPrice}
          onChange={onNewPriceChange}
          className={styles.input}
        />

        <label htmlFor="countInStock" className={styles.label}>В наличии</label>
        <input
          type="number"
          name="countInStock"
          id="countInStock"
          value={newCountInStock}
          onChange={onNewCountInStockChange}
          className={styles.input}
        />

        <label htmlFor="description" className={styles.label}>Описание</label>
        <textarea
          id="description"
          name="description"
          value={newDescription}
          onChange={onNewDescriptionChange}
          className={styles.input} />

        <div onClick={onEditProductButtonClick}>
          <Button text="Изменить товар" type="submit" />
        </div>
      </form>

      <div onClick={onRemoveProductButtonClick} className={styles.removeProductButton}>
        <Button text="Удалить товар" type="button" />
      </div>
    </>
  )
}

export default ProductEditScreen
