'use client';
import { useCart } from '../context/CartContext'; // Ajusta la ruta si tu context está en otra carpeta
import { useState, useEffect } from 'react';
import styles from '../styles/modules/cart.module.scss';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  // Marcar cuando el componente está montado
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mostrar placeholder mientras se monta
  if (!mounted) {
    return (
      <main className={styles.container}>
        <h2>Carrito de compras</h2>
        <p>Cargando carrito...</p>
      </main>
    );
  }

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