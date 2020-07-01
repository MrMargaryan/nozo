import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchProduct, addReview } from '../../store/products/actions'
import { addToCart } from '../../store/cart/actions'
import Button from '../../components/Button/Button'

import styles from './ProductScreen.module.scss'

const ProductScreen = ({ match: { params: { id } } }) => {
  const dispatch = useDispatch()
  const status = useSelector(({ user }) => user.entities.status)
  const { loading, loaded, error, entities: { name, image, brand, price, description, countInStock, reviews } } = useSelector(({ product }) => product)

  const [totalPrice, setTotalPrice] = useState(price)
  const [quantity, setQuantity] = useState(1)

  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState(false)

  const onQuantityChange = event => {
    setQuantity(event.target.value)
  }

  const onRatingChange = event => {
    setRating(+event.target.value)
  }

  const onCommentChange = event => {
    setComment(event.target.value)
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

  const onAddReviewButtonClick = async event => {
    event.preventDefault()
    if (comment) {
      await dispatch(addReview(id, rating, comment))
      dispatch(fetchProduct(id))
      setRating(1)
      setComment('')
      setCommentError(false)
    }
    else {
      setCommentError(true)
    }
  }

  const renderStars = rating => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
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
          <NavLink to={`/edit/${id}`} className={styles.button}>
            <Button text="Редактировать" type="button" />
          </NavLink>
        )
      default:
        return (
          <div onClick={onAddToCartButtonClick} className={countInStock ? styles.button : `${styles.button} ${styles.buttonActive}`}>
            <Button text="Добавить в корзину" type="button" />
          </div>
        )
    }
  }

  return (
    <>
      <NavLink to="/" className={styles.breadcrump}>Перейти к товарам</NavLink>
      <div className={styles.container}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.brand}>{brand}</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.price}>&#8381;{totalPrice}</p>
          {
            countInStock
              ? (
                <form className={styles.form}>
                  <label forHtml="quantity" className={styles.label}>Количество:</label>
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
          {renderButton()}
        </div>
      </div>
      <div className={styles.reviewsWrapper}>
        <div className={styles.customerReview}>
          <h3 className={styles.customerReviewTitle}>Отзывы</h3>
          <div>
            {
              reviews && reviews.length > 0 ? (
                reviews.map(({ _id, name, comment, createdAt, rating }) => {
                  const date = createdAt.split('.')[0].split('T')[0].split('-').reverse().join('/')
                  const time = createdAt.split('.')[0].split('T')[1]

                  return (
                    <div key={_id} className={styles.review}>
                      <p className={styles.author}>Автор: {name}</p>
                      <p className={styles.stars}>{renderStars(rating)}</p>
                      <p>{date} ({time})</p>
                      <p className={styles.comment}>{comment}</p>
                    </div>
                  )
                })
              ) : <p>Отзывов нет</p>
            }
          </div>
        </div>
        {
          status && (
            <form className={styles.customerReview}>
              <h3 className={styles.customerReviewTitle}>Оставить отзыв</h3>
              {commentError && <p className={styles.error}>Заполните поле отзыв</p>}
              <label forHtml="rating">Рейтинг</label>
              <select name="rating" id="rating" value={rating} onChange={onRatingChange} className={styles.input}>
                <option value="1">1 – Плохо</option>
                <option value="2">2 – Средне</option>
                <option value="3">3 –Хорошо</option>
                <option value="4">4 – Очень хорошо</option>
                <option value="5">5 – Великолепно</option>
              </select>

              <label forHtml="comment">Комментарий</label>
              <textarea id="comment" name="comment" value={comment} onChange={onCommentChange} className={styles.input} />

              <div onClick={onAddReviewButtonClick}>
                <Button text="Оставить отзыв" type="submit" />
              </div>
            </form>
          )
        }
      </div>
    </>
  )
}

export default ProductScreen
