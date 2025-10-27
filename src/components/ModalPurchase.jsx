'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/modules/modalPurchase.module.scss';

export default function ModalPurchase({ product, onClose }) {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
    file: null,
  });
  const [uploading, setUploading] = useState(false);

  const items = product ? [product] : cart || [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = '';
    if (formData.file) {
      try {
        setUploading(true);
        const data = new FormData();
        data.append('file', formData.file);
        data.append('upload_preset', 'Comprobantes de pago'); 
        const res = await fetch('https://api.cloudinary.com/v1_1/dkfbhn3ht/image/upload', {
          method: 'POST',
          body: data,
        });
        const fileData = await res.json();
        fileUrl = fileData.secure_url;
      } catch (err) {
        console.error('Error al subir imagen:', err);
      } finally {
        setUploading(false);
      }
    }

    const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    let message = `🧾 *Nuevo Pedido de ${formData.name}*\n\n`;
    message += `📞 Teléfono: ${formData.phone}\n📧 Correo: ${formData.email}\n🏠 Dirección: ${formData.address}\n\n`;
    message += `🛍️ *Productos:*\n`;
    items.forEach((item) => {
      message += `• ${item.title} (x${item.quantity || 1}) - $${item.price.toFixed(2)}\n`;
    });
    message += `\n💰 *Total:* $${total.toFixed(2)}\n`;
    if (formData.note) message += `📝 Nota: ${formData.note}\n`;
    if (fileUrl) message += `📸 Comprobante: ${fileUrl}\n`;
    message += `\nGracias por tu compra ❤️`;

    // Número de WhatsApp al que llegan los pedidos (sin + ni espacios)
    const phoneNumber = '573205285432'; 
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>🧾 Resumen de compra</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className={styles.summaryItem}>
              <img src={item.image || item.images?.[0]} alt={item.title} />
              <div>
                <p><strong>{item.title}</strong></p>
                <p>Cantidad: {item.quantity || 1}</p>
                <p>Precio: ${item.price?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Correo electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Dirección de envío</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Nota (opcional)</label>
            <textarea name="note" rows="3" value={formData.note} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Comprobante de pago (imagen)</label>
            <input type="file" name="file" accept="image/*" onChange={handleChange} />
          </div>

          <button type="submit" className={styles.submitButton} disabled={uploading}>
            {uploading ? 'Subiendo...' : 'Enviar pedido vía WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
}