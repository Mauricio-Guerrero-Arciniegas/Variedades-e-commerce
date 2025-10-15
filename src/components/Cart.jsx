'use client';
import { useCart } from '../context/CartContext';
import styles from '../styles/modules/cart.module.scss';

export default function Cart() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <div className={styles.empty}>🛒 Tu carrito está vacío</div>;
  }

  return (
    <div className={styles.cart}>
      <h2>🛍️ Carrito de Compras</h2>
      <ul className={styles.list}>
        {cart.map((item) => (
          <li key={item.id} className={styles.item}>
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        Total: $
        {cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </div>
    </div>
  );
}