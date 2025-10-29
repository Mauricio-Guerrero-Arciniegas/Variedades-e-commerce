'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/modules/modalPurchase.module.scss';

export default function ModalPurchase({ product, onClose }) {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  // Usar producto individual si se pasa, sino todo el carrito
  const items = product ? [product] : cart || [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('Por favor completa tu nombre y teléfono.');
      return;
    }

    if (!formData.file) {
      alert('Por favor adjunta el comprobante de pago.');
      return;
    }

    let fileUrl = '';
    try {
      setUploading(true);
      const data = new FormData();
      data.append('file', formData.file);
      data.append('upload_preset', 'Comprobantes'); // tu preset de Cloudinary
      const res = await fetch('https://api.cloudinary.com/v1_1/dkfbhn3ht/image/upload', {
        method: 'POST',
        body: data,
      });
      const fileData = await res.json();
      fileUrl = fileData.secure_url;
    } catch (err) {
      console.error('Error al subir imagen:', err);
      alert('Error al subir la imagen. Intenta de nuevo.');
      return;
    } finally {
      setUploading(false);
    }

    const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    // Mensaje de WhatsApp
    let message = `🧾 *Nuevo Pedido de ${formData.name}*\n\n`;
    message += `📞 Teléfono: ${formData.phone}\n🏠 Dirección: ${formData.address || 'No especificada'}\n\n`;
    message += `💳 Realizó pago a Nequi: 300 123 4567 (Mauricio Guerrero)\n\n`;
    message += `🛍️ *Productos:*\n`;
    items.forEach((item) => {
      message += `• ${item.title} (x${item.quantity || 1}) - $${item.price.toLocaleString('es-CO')}\n`;
    });
    message += `\n💰 *Total:* $${total.toLocaleString('es-CO')}\n`;
    if (formData.note) message += `📝 Nota: ${formData.note}\n`;
    message += `📸 Comprobante: ${fileUrl}\n`;
    message += `\nGracias por tu compra ❤️`;

    const phoneNumber = '573205285432'; // tu número de WhatsApp sin + ni espacios
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
                <p>Precio: ${item.price?.toLocaleString('es-CO')}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.paymentInfo}>
            💳 Por favor realiza el pago en Nequi:<br />
            Número: 3162508709<br />
            Nombre: Fabiana Constanza Benavides
          </p>

          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Dirección de envío (opcional)</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Nota (opcional)</label>
            <textarea name="note" rows="3" value={formData.note} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Comprobante de pago (imagen)</label>
            <input type="file" name="file" accept="image/*" onChange={handleChange} required />
          </div>

          {previewUrl && (
            <div className={styles.preview}>
              <p>Vista previa del comprobante:</p>
              <img src={previewUrl} alt="Preview comprobante" />
            </div>
          )}

          <button type="submit" className={styles.submitButton} disabled={uploading}>
            {uploading ? 'Subiendo...' : 'Enviar pedido vía WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
}