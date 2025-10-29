'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import styles from '../styles/modules/navbar.module.scss'

export default function Navbar() {
  const { cart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">MiTienda</Link>
      </div>

      <div className={styles.links}>
        <Link href="/">Inicio</Link>
        <Link href="/products">Productos</Link>
        <Link href="/cart" className={styles.cartLink}>
          🛒 Carrito
          {mounted && totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </nav>
  )
}