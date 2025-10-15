import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import ProductCarousel from '../../components/ProductCarousel'
import ModalPurchase from '../../components/ModalPurchase'
import styles from '../../styles/modules/products.module.scss'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

// same sample data (in a real app move to a shared module or API)
const PRODUCTS = [
  {
    id: 'bag-1',
    slug: 'bolso-rosa',
    title: 'Bolso Rosa Elegante',
    category: 'Bolsos',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1520975911094-d8d2f4b1e9d2?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1520976279501-2d7d0a1d4c4c?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1520975911094-d8d2f4b1e9d2?auto=format&fit=crop&w=801&q=60',
      'https://images.unsplash.com/photo-1520976279501-2d7d0a1d4c4c?auto=format&fit=crop&w=802&q=60'
    ]
  },
  {
    id: 'cl-1',
    slug: 'blusa-floral',
    title: 'Blusa Floral',
    category: 'Ropa',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1495121605193-b116b5b09d16?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1520975911094-d8d2f4b1e9d2?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1495121605193-b116b5b09d16?auto=format&fit=crop&w=801&q=60',
      'https://images.unsplash.com/photo-1520976279501-2d7d0a1d4c4c?auto=format&fit=crop&w=802&q=60'
    ]
  }
]

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const product = PRODUCTS.find(p => p.slug === slug)
  const [showModal, setShowModal] = useState(false)
  const { addToCart } = useCart()

  if (!product) return (
    <div>
      <Navbar />
      <main className={styles.container}><p>Cargando...</p></main>
    </div>
  )

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.productPage}>
          <ProductCarousel images={product.images} />

          <div className={styles.info}>
            <h1>{product.title}</h1>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <p>Categoria: {product.category}</p>
            <div className={styles.actions}>
              <button onClick={() => addToCart(product)}>Agregar al carrito</button>
              <button onClick={() => setShowModal(true)}>Comprar ahora</button>
            </div>
          </div>
        </div>
      </main>

      {showModal && <ModalPurchase product={product} onClose={() => setShowModal(false)} />}
    </div>
  )
}