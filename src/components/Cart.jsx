'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import dynamic from 'next/dynamic';
import ModalPurchase from './ModalPurchase';
import styles from '../styles/modules/cart.module.scss';

function CartComponent() {
  const { cart, increaseQty, decreaseQty, totalPrice, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  if (!cart) return null;

  return (
    <div className={styles.cart}>
      <ul className={styles.list}>
        {cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id} className={styles.item}>
              <img src={item.image || item.images?.[0]} alt={item.title} />
              <div className={styles.details}>
                <h3>{item.title}</h3>
                <p>Precio: ${item.price.toFixed(2)}</p>

                <div className={styles.qtyControls}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.empty}>Tu carrito está vacío 🛒</div>
        )}
      </ul>

      {cart.length > 0 && (
        <div className={styles.summary}>
          <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
          <button
            className={styles.buyNowBtn}
            onClick={() => setShowModal(true)}
          >
            Comprar ahora
          </button>
          <button onClick={clearCart} className={styles.removeBtn}>
            Vaciar carrito
          </button>
        </div>
      )}

      {showModal && (
        <ModalPurchase
          product={null} // null indica que se envía todo el carrito
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// Evita errores de SSR usando import dinámico
export default dynamic(() => Promise.resolve(CartComponent), { ssr: false });