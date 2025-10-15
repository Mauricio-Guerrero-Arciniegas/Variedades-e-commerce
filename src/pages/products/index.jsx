import Navbar from '../../components/Navbar'
import ProductCard from '../../components/ProductCard'
import styles from '../../styles/modules/products.module.scss'

// Sample product data — in the future fetch from an API
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

export default function Products() {
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)))

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <h1>Productos</h1>
        <div className={styles.filters}>
          {categories.map(c => (<button key={c}>{c}</button>))}
        </div>

        <section className={styles.grid}>
          {PRODUCTS.map(p => (<ProductCard key={p.id} product={p} />))}
        </section>
      </main>
    </div>
  )
}