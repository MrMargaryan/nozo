import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, Badge } from 'react-bootstrap'

const Header = () => {
  const productsQuantity = useSelector(({ cart }) => Object.keys(cart).length)
  const { entities: { name } } = useSelector(({ user }) => user)

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Link to="/"><Navbar.Brand>NOZO</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Категории" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Кепки</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Футбольные мячи</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Брюки</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Link to="/cart">
          <Button style={{ marginRight: '10px' }} variant="primary">
            Корзина {productsQuantity !== 0 && <Badge variant="danger">{productsQuantity}</Badge>}
          </Button>
        </Link>
        {
          name
            ? <Button variant="warning">{name}</Button>
            : <Link to="/signin"><Button variant="success">Войти</Button></Link>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
