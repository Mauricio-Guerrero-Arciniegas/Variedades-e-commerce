import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import ProductCarousel from '../../components/ProductCarousel'
import ModalPurchase from '../../components/ModalPurchase'
import styles from '../../styles/modules/products.module.scss'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

const PRODUCTS = [
  {
    id: 'bag-1',
    slug: 'bolso-cuero',
    title: 'Bolso Azul Elegante',
    category: 'Bolsos',
    price: 60000,
    description: 'Bolso elegante de cuero azul, ideal para cualquier ocasión. Espacioso y duradero.',
    images: [
      '/images/bolsos/bag-1/bolso1.webp',
      '/images/bolsos/bag-1/bolso2.webp',
      '/images/bolsos/bag-1/bolso3.webp',
      '/images/bolsos/bag-1/bolso4.webp',
      '/images/bolsos/bag-1/bolso5.webp',
      '/images/bolsos/bag-1/bolso6.webp',
      '/images/bolsos/bag-1/bolso7.webp',
      '/images/bolsos/bag-1/bolso8.webp',
    ]
  },
  {
    id: 'bag-2',
    slug: 'bolso-rosa',
    title: 'Bolso Rosa Elegante',
    category: 'Bolsos',
    price: 60000,
    description: 'Bolso rosa chic de alta calidad. Perfecto para combinar con tus outfits favoritos.',
    images: [
      '/images/bolsos/bag-2/bolso1.webp',
      '/images/bolsos/bag-2/bolso2.webp',
      '/images/bolsos/bag-2/bolso3.webp',
      '/images/bolsos/bag-2/bolso4.webp'
    ]
  },
  {
    id: 'cl-1',
    slug: 'blusa-floral',
    title: 'Blusa Floral',
    category: 'Ropa',
    price: 55000,
    description: 'Blusa ligera con estampado floral. Ideal para el día a día o eventos casuales.',
    images: [
      '/images/blusas/blusa1.webp',
      '/images/blusas/blusa2.webp',
      '/images/blusas/blusa3.webp',
      '/images/blusas/blusa4.webp'
    ]
  }
]

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const product = PRODUCTS.find(p => p.slug === slug)
  const [showModal, setShowModal] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div>
        <Navbar />
        <main className={styles.container}>
          <p>Cargando...</p>
        </main>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,        
      image: product.images[0],   
      price: product.price,
      quantity: 1
    })
  }

  const formatPrice = value =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value)

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <div key={product.id} className={styles.productPage}>
          <ProductCarousel key={product.slug} images={product.images} />

          <div className={styles.info}>
            <h1>{product.title}</h1>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <p>Categoría: {product.category}</p>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.actions}>
              <button onClick={handleAddToCart}>Agregar al carrito</button>
              <button onClick={() => setShowModal(true)}>Comprar ahora</button>
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <ModalPurchase
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}