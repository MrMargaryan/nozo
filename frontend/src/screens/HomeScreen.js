import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchProducts from '../store/products/actions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Spinner from '../components/LoadingSpinner'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (!entities.length && loaded) {
    return <span>Данные отсутствуют</span>
  }

  if (error) {
    return <span>Извините, произошла ошибка</span>
  }

  return (
    <Row>
      {
        entities.map(({ _id, name, category, image, price, brand, rating, numReviews }) => {
          return (
            <Col lg={4} md={12} key={_id}>
              <Product
                id={_id}
                name={name}
                category={category}
                image={image}
                price={price}
                brand={brand}
                rating={rating}
                numReviews={numReviews}
              />
            </Col>
          )
        })
      }
    </Row>
  )
}

export default HomeScreen
