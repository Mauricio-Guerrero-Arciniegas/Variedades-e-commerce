import Link from 'next/link'
import styles from '../styles/modules/productCard.module.scss'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.thumb}>
        <div className={styles.imageWrapper}>
          <img src={product.images[0]} alt={product.title} />
        </div>
      </Link>

      <div className={styles.body}>
        <h3>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.description}</p> {/* <- Nueva línea */}

        <div className={styles.actions}>
          <button
            onClick={() => {
              addToCart(product)
            }}
          >
            Agregar al carrito
          </button>

          <Link href={`/products/${product.slug}`} className={styles.view}>
            Ver
          </Link>
        </div>
      </div>
    </article>
  )
}