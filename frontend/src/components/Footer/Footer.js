import React from 'react'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/MrMargaryan" className={styles.link}>Гамлет Маргарян</a>
      <p className={styles.moscowLove}>Made with <span title="Я устал, я ухожу(" className={styles.heart}>&#9829;</span> in Moscow</p>
    </footer>
  )
}

export default Footer
