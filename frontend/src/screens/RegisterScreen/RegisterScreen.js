import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, removeError } from '../../store/user/actions'
import Button from '../../components/Button/Button'

import styles from './RegisterScreen.module.scss'

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch()
  let { loading, error, entities } = useSelector(({ user }) => user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(removeError())
  }, [])

  useEffect(() => {
    if (entities.email)
      history.location.search ? history.push('/checkout') : history.push('/')
  }, [entities])

  const onRegisterButtonClick = event => {
    event.preventDefault()
    dispatch(register(name, email, password))
  }

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onEmailChange = event => {
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  return (
    <>
      <h2 className={styles.title}>Создать аккаунт</h2>
      <form className={styles.form}>
        {loading && <p>Подождите...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <label htmlFor="name" className={styles.label}>Имя</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onNameChange}
          className={styles.input}
        />

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
        <p className={styles.advice}>Пароль должен содержать минимум 6 символов</p>

        <div onClick={onRegisterButtonClick}><Button text="Зарегистрироваться" type="submit" /></div>
      </form>

      <NavLink to="/login" className={styles.toLoginPageLink}>Уже есть аккаунт?</NavLink>
    </>
  )
}

export default RegisterScreen
