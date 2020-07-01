import React from 'react'
import { NavLink } from 'react-router-dom'
import airmax from '../../images/airmax.jpg'

import styles from './Product.module.scss'

const Product = ({ id, name, image, price, brand, rating, numReviews }) => {
  const renderStars = () => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const reviewsEnding = () => {
    if (
      numReviews % 10 === 0 ||
      numReviews % 10 === 5 ||
      numReviews % 10 === 6 ||
      numReviews % 10 === 7 ||
      numReviews % 10 === 8 ||
      numReviews % 10 === 9 ||
      numReviews === 11 ||
      numReviews === 12 ||
      numReviews === 13 ||
      numReviews === 14
    )
      return 'отзывов'
    else if (numReviews % 10 === 1 && numReviews !== 11) return 'отзыв'
    else return 'отзыва'
  }

  return (
    <div className={styles.card}>
      <NavLink to={`/product/${id}`}><img className={styles.image} src={image} alt={name} /></NavLink>
      <div className={styles.content}>
        <h4><NavLink to={`/product/${id}`} className={styles.name}>{name}</NavLink></h4>
        <p className={styles.brand}>{brand}</p>
        <p className={styles.price}>&#8381;{price}</p>
        <p className={styles.stars}>{renderStars()}</p>
        <p>({numReviews} {reviewsEnding()})</p>
      </div>
    </div>
  )
}

export default Product
