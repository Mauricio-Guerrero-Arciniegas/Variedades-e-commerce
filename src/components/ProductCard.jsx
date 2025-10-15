import Link from 'next/link'
import styles from '../styles/modules/productCard.module.scss'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className={styles.body}>
        <h3>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.actions}>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          <Link href={`/products/${product.slug}`} className={styles.view}>Ver</Link>
        </div>
      </div>
    </article>
  )
}