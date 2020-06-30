import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder } from '../../store/orders/actions'
import QRCode from 'qrcode.react'

import styles from './OrderDetailScreen.module.scss'

const OrderDetailScreen = ({ match: { params: { id } } }) => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities } = useSelector(({ order }) => order)

  useEffect(() => {
    dispatch(fetchOrder(id))
  }, [])

  if (loading) {
    return <span>Загрузка...</span>
  }

  if (!entities && loaded) {
    return <span>Данные отсутствуют</span>
  }

  if (error) {
    return <span>Извините, произошла ошибка</span>
  }

  return (
    <>
      <h2 className={styles.title}>Заказ <span className={styles.id}>{id}</span></h2>
      <div className={styles.orderInfo}>
        <h3 className={styles.orderInfoTitle}>Товары</h3>
        <div className={styles.orderItems}>
          {
            Object.keys(entities).length > 0 && (
              entities.orderItems.map(({ product, quantity }) => <NavLink to={`/product/${product}`} className={styles.product}>Товар {product} (количество: {quantity})</NavLink>)
            )
          }
        </div>

        <h3 className={styles.orderInfoTitle}>Адрес доставки</h3>
        <p className={styles.text}>{entities.shipping}</p>

        <h3 className={styles.orderInfoTitle}>Оплата</h3>
        <p className={styles.text}>**** **** **** {entities.payment}</p>

        <h3 className={styles.orderInfoTitle}>Цена</h3>
        <p className={styles.text}>&#8381;{entities.totalPrice}</p>

        <h3 className={styles.orderInfoTitle}>Дата заказа</h3>
        {entities.createdAt && (
          <p className={styles.text}>
            {entities.createdAt.split('.')[0].split('T')[0].split('-').reverse().join('/')} ({entities.createdAt.split('.')[0].split('T')[1]})
          </p>
        )}

        <h3 className={styles.orderInfoTitle}>Доставлено</h3>
        <p className={styles.text}>{entities.isDelivered ? 'Да' : 'Нет'}</p>

        <h3 className={styles.orderInfoTitle}>Электронный чек</h3>
        <QRCode value={`${id} это гг`} />
      </div>
    </>
  )
}

export default OrderDetailScreen
