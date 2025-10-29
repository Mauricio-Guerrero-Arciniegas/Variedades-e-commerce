// components/CartPage.jsx
'use client';
import { useCart } from '../context/CartContext';
import dynamic from 'next/dynamic';
import styles from '../styles/modules/cart.module.scss';

function CartComponent() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty, totalPrice } = useCart();

  if (!cart) return null;

  return (
    <main className={styles.container}>
      <h2>Carrito de compras</h2>

      <ul className={styles.cartList}>
        {cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id} className={styles.item}>
              <img
                src={item.images?.[0] || '/images/placeholder.png'}
                alt={item.title || 'Producto sin nombre'}
              />
              <div className={styles.details}>
                <h3>{item.title}</h3>
                <p>Precio: ${item.price.toFixed(2)}</p>

                <div className={styles.qtyControls}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>Tu carrito está vacío 🛒</li>
        )}
      </ul>

      {cart.length > 0 && (
        <div className={styles.summary}>
          <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
          <button onClick={clearCart} className={styles.clearBtn}>
            Vaciar carrito
          </button>
        </div>
      )}
    </main>
  );
}

// Import dinámico para evitar hydration
export default dynamic(() => Promise.resolve(CartComponent), { ssr: false });