import Navbar from '../../components/Navbar'
import ProductCard from '../../components/ProductCard'
import styles from '../../styles/modules/products.module.scss'
import { useState } from 'react'

const PRODUCTS = [
  {
    id: 'bag-1',
    slug: 'bolso-cuero',
    title: 'Bolso Azul-Beige',
    category: 'Bolsos',
    price: 50000,
    images: ['/images/bolsos/bag-1/bolso1.webp']
  },
  {
    id: 'bag-2',
    slug: 'bolso-rosa',
    title: 'Bolso Beige-Rojo',
    category: 'Bolsos',
    price: 50000,
    images: ['/images/bolsos/bag-2/bolso1.webp']
  },
  {
    id: 'cl-1',
    slug: 'blusa-floral',
    title: 'Blusa Floral',
    category: 'Ropa',
    price: 60000,
    images: ['/images/blusas/blusa2.webp']
  }
]

export default function Products() {
  const categories = ['Todos', ...new Set(PRODUCTS.map(p => p.category))]
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // 🔥 Filtra productos según la categoría seleccionada
  const filteredProducts =
    selectedCategory === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === selectedCategory)

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <h1>Productos</h1>

        {/* botones de filtro */}
        <div className={styles.filters}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={selectedCategory === c ? styles.active : ''}
            >
              {c}
            </button>
          ))}
        </div>

        {/* productos filtrados */}
        <section className={styles.grid}>
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </main>
    </div>
  )
}