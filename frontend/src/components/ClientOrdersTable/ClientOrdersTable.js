import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrders } from '../../store/orders/actions'

import styles from './ClientOrdersTable.module.scss'

const ClientOrdersTable = () => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities } = useSelector(({ userOrders }) => userOrders)

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [])

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
    <div className={styles.tableWrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.rowItems}>Адресс</th>
              <th className={styles.rowItems}>Карта оплаты (последние 4 цифры)</th>
              <th className={styles.rowItems}>Цена</th>
              <th className={styles.rowItems}>Дата заказа</th>
              <th className={styles.rowItems}>Доставлено</th>
              <th className={styles.rowItems}></th>
            </tr>
          </thead>
          <tbody>
            {
              entities.map(({ _id, shipping, payment, totalPrice, createdAt, isDelivered }) => {
                const date = createdAt.split('.')[0].split('T')[0].split('-').reverse().join('/')
                const time = createdAt.split('.')[0].split('T')[1]

                return (
                  <tr key={_id}>
                    <td className={styles.rowItems}>{shipping}</td>
                    <td className={styles.rowItems}>{payment}</td>
                    <td className={styles.rowItems}>&#8381;{totalPrice}</td>
                    <td className={styles.rowItems}>{`${date} (${time})`}</td>
                    <td className={styles.rowItems}>{isDelivered ? 'Да' : 'Нет'}</td>
                    <td className={styles.rowItems}><NavLink to={`/order/${_id}`} className={styles.info}>&#8505;</NavLink></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default ClientOrdersTable
