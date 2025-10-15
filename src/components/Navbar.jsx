import Link from 'next/link'
import styles from '../styles/modules/navbar.module.scss'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const totalItems = cart.reduce((s, p) => s + p.qty, 0)

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/">Mi Tienda</Link>
      </div>
      <nav className={styles.links}>
        <Link href="/products">Productos</Link>
        <a href="#contact">Contacto</a>
        <div className={styles.cart}>Carrito ({totalItems})</div>
      </nav>
    </header>
  )
}