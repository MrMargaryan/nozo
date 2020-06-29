import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart, FaSignInAlt, FaUser } from 'react-icons/fa'

import styles from './Header.module.scss'

const Header = () => {
  const productsQuantity = useSelector(({ cart }) => Object.keys(cart).length)
  const status = useSelector(({ user }) => user.entities.status)

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>Nozo</NavLink>

      <div>
        <NavLink to="/cart" className={styles.cartIcon}>
          <FaShoppingCart className={styles.icon} />
          {productsQuantity !== 0 && <span className={styles.quantity}>{productsQuantity}</span>}
        </NavLink>
        {
          status
            ? <NavLink to={`/${status}-profile`}><FaUser className={styles.icon} /></NavLink>
            : <NavLink to="/login"><FaSignInAlt className={styles.icon} /></NavLink>
        }
      </div>
    </header>
  )
}

export default Header
