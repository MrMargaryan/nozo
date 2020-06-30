import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsDelivered } from '../../store/orders/actions'
import { logout } from '../../store/user/actions'
import { fetchOrders } from '../../store/orders/actions'
import Button from '../../components/Button/Button'

import styles from './OperatorProfileScreen.module.scss'

const OperatorProfileScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities } = useSelector(({ orders }) => orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const onRadioButtonChange = async (id, isDelivered) => {
    await dispatch(changeIsDelivered(id, isDelivered))
    dispatch(fetchOrders())
  }

  const onLogoutButtonClick = () => {
    dispatch(logout())
    history.push('/')
  }

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
    <>
      <h2 className={styles.title}>Панель оператора</h2>
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
                      <td className={styles.rowItems}>
                        <input
                          type="radio"
                          id={_id}
                          name={_id}
                          value="yes"
                          checked={isDelivered === true}
                          onChange={() => onRadioButtonChange(_id, true)}
                        />
                        <label htmlFor="yes"> Да</label>
                        <br />
                        <input
                          type="radio"
                          id={_id}
                          name={_id}
                          value="no"
                          checked={isDelivered === false}
                          onChange={() => onRadioButtonChange(_id, false)}
                        />
                        <label htmlFor="no"> Нет</label>
                      </td>
                      <td className={styles.rowItems}><NavLink to={`/order/${_id}`} className={styles.info}>&#8505;</NavLink></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div onClick={onLogoutButtonClick} className={styles.logoutButton}>
        <Button text="Выйти" type="button" />
      </div>
    </>
  )
}

export default OperatorProfileScreen
