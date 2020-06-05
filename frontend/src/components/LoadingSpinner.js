import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
  return (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    Загрузка...
    </Button>
  )
}

export default LoadingSpinner
