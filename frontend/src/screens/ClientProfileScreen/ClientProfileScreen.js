import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update, logout } from '../../store/user/actions'
import ClientOrdersTable from '../../components/ClientOrdersTable/ClientOrdersTable'
import Button from '../../components/Button/Button'

import styles from './ClientProfileScreen.module.scss'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, entities: { _id, name, email } } = useSelector(({ user }) => user)
  const [newName, setNewName] = useState(name)
  const [newEmail, setNewEmail] = useState(email)
  const [newPassword, setNewPassword] = useState()
  const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)

  const onNameChange = event => {
    setNewName(event.target.value)
  }

  const onEmailChange = event => {
    setNewEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setNewPassword(event.target.value)
  }

  const onUpdateButtonClick = (event) => {
    event.preventDefault()
    setIsUpdateButtonClicked(true)
    dispatch(update(_id, newName || undefined, newEmail || undefined, newPassword || undefined))
    !newName && setNewName(name)
    !newEmail && setNewEmail(email)
    setNewPassword('')
  }

  const onLogoutButtonClick = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <div className={styles.profileScreenWrapper}>
      <div className={styles.userInfo}>
        <h3 className={styles.title}>Профиль</h3>
        <form className={styles.form}>
          {loading && <p>Подождите...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && isUpdateButtonClicked && <p className={styles.success}>Успешное изменение</p>}
          <label htmlFor="name" className={styles.label}>Имя</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newName}
            onChange={onNameChange}
            className={styles.input}
          />

          <label htmlFor="email" className={styles.label}>Электронная почта</label>
          <input
            type="email"
            name="email"
            id="email"
            value={newEmail}
            onChange={onEmailChange}
            className={styles.input}
          />

          <label htmlFor="password" className={styles.label}>Пароль</label>
          <input
            type="password"
            name="password"
            id="password"
            value={newPassword}
            onChange={onPasswordChange}
            className={styles.input}
          />
          <p className={styles.advice}>Пароль должен содержать минимум 6 символов</p>

          <div onClick={onUpdateButtonClick} className={styles.editButtonWrapper}><Button text="Изменить" type="submit" /></div>
        </form>
        <div onClick={onLogoutButtonClick}><Button text="Выйти" type="button" /></div>
      </div>
      <div className={styles.orders}>
        <h3 className={styles.ordersTitle}>Заказы</h3>
        <ClientOrdersTable />
      </div>
    </div>
  )
}

export default ProfileScreen
