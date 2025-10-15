import Navbar from '../components/Navbar'
import Cart from '../components/Cart'

export default function CartPage() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <Cart />
      </main>
    </div>
  )
}