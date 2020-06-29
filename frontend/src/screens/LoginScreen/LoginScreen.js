import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { login } from '../../store/user/actions'
import Button from '../../components/Button/Button'

import styles from './LoginScreen.module.scss'

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, entities } = useSelector(({ user }) => user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (entities.email) {
      history.push('/')
    }
  }, [entities])

  const onLoginButtonClick = event => {
    event.preventDefault()
    dispatch(login(email, password))
  }

  const onEmailChange = event => {
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  return (
    <>
      <h2 className={styles.title}>Аккаунт</h2>
      <div className={styles.containers}>
        <div className={styles.container}>
          <h3 className={styles.containerTitle}>Впервые на сайте?</h3>
          <p className={styles.text}>Регистрация бесплатная, быстрая и удобная!</p>
          <ul className={styles.benefits}>
            <li>&#10003; Оформление заказов</li>
            <li>&#10003; Возможность оставлять отзывы</li>
          </ul>
          <NavLink to="/register"><Button text="Создать аккаунт" type="button" /></NavLink>
        </div>
        <div className={styles.container}>
          <h3 className={styles.containerTitle}>Уже есть аккаунт?</h3>
          <form className={styles.form}>
            {loading && <p>Подождите...</p>}
            {error && <p className={styles.error}>{error}</p>}
            <label htmlFor="email" className={styles.label}>Электронная почта</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onEmailChange}
              className={styles.input}
            />

            <label htmlFor="password" className={styles.label}>Пароль</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onPasswordChange}
              className={styles.input}
            />

            <div onClick={onLoginButtonClick}><Button text="Войти" type="submit" /></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginScreen
