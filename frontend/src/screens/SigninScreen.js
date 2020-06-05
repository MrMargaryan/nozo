import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../store/user/actions'
import { Form, Button, Badge } from 'react-bootstrap'
import Spinner from '../components/LoadingSpinner'

const SigninScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, entities } = useSelector(({ user }) => user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (entities.email) {
      history.push('/')
    }
  }, [entities])

  const onSigninButtonClick = event => {
    event.preventDefault()
    dispatch(signin(email, password))
  }

  const onEmailChange = event => {
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  return (
    <Form>
      <h2>Войти</h2>
      {loading && <Spinner />}
      {error && error}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Электронная почта</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" value={email} onChange={onEmailChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={onPasswordChange} />
      </Form.Group>
      <Button onClick={onSigninButtonClick} style={{ marginBottom: '10px' }} variant="success" type="submit">
        Войти
      </Button>
      <br />
      <Badge variant="primary">
        Еще не зарегистрированы?
      </Badge>
    </Form>
  )
}

export default SigninScreen
