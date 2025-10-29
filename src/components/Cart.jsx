'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import dynamic from 'next/dynamic';
import ModalPurchase from './ModalPurchase';
import styles from '../styles/modules/cart.module.scss';
import Link from 'next/link';

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
                <p>Precio: ${item.price.toLocaleString('es-CO')}</p>

                <div className={styles.qtyControls}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <p>Subtotal: ${(item.price * item.quantity).toLocaleString('es-CO')}</p>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.empty}>
            <p>Tu carrito está vacío 🛒</p>
            {/* ✅ Botón visible incluso cuando no hay productos */}
            <Link href="/products" className={styles.keepShoppingBtn}>
              Seguir comprando
            </Link>
          </div>
        )}
      </ul>

      {/* ✅ Resumen visible solo si hay productos */}
      {cart.length > 0 && (
        <div className={styles.summary}>
          <p><strong>Total:</strong> ${totalPrice.toLocaleString('es-CO')}</p>

          <div className={styles.cartButtons}>
            <Link href="/products" className={styles.keepShoppingBtn}>
              Seguir comprando
            </Link>

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
        </div>
      )}

      {showModal && (
        <ModalPurchase
          product={null}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(CartComponent), { ssr: false });