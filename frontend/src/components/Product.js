import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import pants from '../images/pants.jpg'

const Product = ({ id, name, category, image, price, brand, rating, numReviews }) => {
  return (
    <Card className="mb-4">
      <Link to={`/product/${id}`}><Card.Img variant="top" src={pants} /></Link>
      <Card.Body>
        <Card.Title><Link to={`/product/${id}`}>{name}</Link></Card.Title>
        <Card.Subtitle className="text-muted mb-3">{brand}</Card.Subtitle>
        <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>${price}</Card.Text>
        <Card.Text>{rating} stars ({numReviews} reviews)</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
