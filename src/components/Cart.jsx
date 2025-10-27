'use client';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import styles from '../styles/modules/cart.module.scss';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty, totalPrice } = useCart();

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <h2>Carrito de compras</h2>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío 🛒</p>
        ) : (
          <>
            <ul className={styles.cartList}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <img src={item.images[0]} alt={item.title} />
                  <div className={styles.details}>
                    <h3>{item.title}</h3>
                    <p>Precio: ${item.price.toFixed(2)}</p>

                    <div className={styles.qtyControls}>
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>

                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
              <button onClick={clearCart} className={styles.clearBtn}>Vaciar carrito</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}