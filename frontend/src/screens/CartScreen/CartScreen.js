import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../store/cart/actions'
import styles from './CartScreen.module.scss'
import pants from '../../images/pants.jpg'
import { Row, Col, ListGroup, Button, Image, Card, Form, Badge } from 'react-bootstrap'

const CartScreen = () => {
  const dispatch = useDispatch()
  const prodcuts = useSelector(({ cart }) => Object.values(cart))
  const productsQuantity = prodcuts.reduce((acc, { quantity }) => acc + +quantity, 0)
  const totalPrice = prodcuts.reduce((acc, { price, quantity }) => acc + +quantity * +price, 0)

  const onQuantityChange = (event, id) => {
    dispatch(addToCart(id, event.target.value))
  }

  const onRemoveButtonClick = id => {
    dispatch(removeFromCart(id))
  }

  const onCheckoutButtonClick = () => {
    alert('Заказ оформлен')
  }

  return (
    <>
      <h2>Корзина</h2>
      <Row>
        <Col lg={9}>
          <ListGroup>
            {
              prodcuts.map(product => {
                return (
                  <ListGroup.Item key={product.id}>
                    <div className={styles.productWrapper}>
                      <div className={styles.productInfo}>
                        <Image
                          src={pants}
                          width={80}
                        />
                        <div>
                          <h5 className={styles.name}>{product.name}</h5>
                          <Form.Control as="select" className={styles.select} value={product.quantity} onChange={event => onQuantityChange(event, product.id)}>
                            {
                              [...Array(product.countInStock).keys()].map(number =>
                                <option
                                  key={number + 1}
                                  value={number + 1}
                                >
                                  {number + 1}
                                </option>
                              )
                            }
                          </Form.Control>
                          <Badge style={{ cursor: 'pointer' }} onClick={() => onRemoveButtonClick(product.id)} variant="danger">Удалить</Badge>
                        </div>
                      </div>
                      <h5>Цена: ${product.price}</h5>
                    </div>
                  </ListGroup.Item>
                )
              })
            }
          </ListGroup>
        </Col>
        <Col>
          <Card bg="secondary" text="white">
            <Card.Header>Итого ({productsQuantity} товаров): ${totalPrice}</Card.Header>
            <Card.Body>
              <Button onClick={onCheckoutButtonClick} variant="warning" style={{ width: '100%' }}>Оформить заказ</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
