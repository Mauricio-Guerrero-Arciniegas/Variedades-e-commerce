import Link from 'next/link'
import styles from '../styles/modules/navbar.module.scss'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const totalItems = cart.reduce((s, p) => s + (p.quantity || 0), 0)

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/">Mi Tienda</Link>
      </div>
      <nav className={styles.links}>
        <Link href="/products">Productos</Link>
        <a href="#contact">Contacto</a>
        <Link href="/cart" className={styles.cart}>
          <span>Carrito</span>
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </Link>
      </nav>
    </header>
  )
}