import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import fetchProduct from '../store/product/actions'
import { addToCart } from '../store/cart/actions'
import pants from '../images/pants.jpg'
import { Row, Col, Image, Card, Button, Form } from 'react-bootstrap'
import Spinner from '../components/LoadingSpinner'

const ProductScreen = ({ match: { params: { id } } }) => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities: { name, price, rating, numReviews, countInStock } } = useSelector(({ product }) => product)

  const [totalPrice, setTotalPrice] = useState(price)
  const [quantity, setQuantity] = useState(1)

  const onQuantityChange = event => {
    setQuantity(event.target.value)
  }

  useEffect(() => {
    setTotalPrice(price * quantity)
  }, [quantity, price])

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [])

  const onAddToCartButtonClick = () => {
    dispatch(addToCart(id, quantity))
  }

  if (loading) {
    return <Spinner />
  }

  if (!name && loaded) {
    return <span>Данные отсутствуют</span>
  }

  if (error) {
    return <span>Извините, произошла ошибка</span>
  }

  return (
    <Row>
      <Col lg={4} className="mb-4">
        <Image src={pants} thumbnail />
      </Col>
      <Col lg={8}>
        <Row>
          <Col sm={6} className="mb-4">
            <Card border="light">
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{rating} stars ({numReviews} reviews)</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
              </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card border="primary">
              <Card.Header>Цена: ${totalPrice}</Card.Header>
              <Card.Body>
                <Card.Title>{countInStock ? 'В наличие' : 'Товар закончился'}</Card.Title>
                <Card.Text>
                  Количество: <Form.Control as="select" size="sm" value={quantity} onChange={onQuantityChange}>
                    {
                      [...Array(countInStock).keys()].map(number =>
                        <option
                          key={number + 1}
                          value={number + 1}
                        >
                          {number + 1}
                        </option>
                      )
                    }
                  </Form.Control>
                </Card.Text>
                {countInStock !== 0 &&
                  <Button
                    onClick={onAddToCartButtonClick}
                    variant="primary"
                    style={{ width: '100%' }}
                  >
                    Добавить в корзину
                    </Button>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ProductScreen
