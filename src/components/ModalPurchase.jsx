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
  const [previewUrl, setPreviewUrl] = useState(null);

  const items = product ? [product] : cart || [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;

    setFormData((prev) => ({
      ...prev,
      [name]: file || value,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Por favor selecciona un comprobante de pago');
      return;
    }

    setUploading(true);
    let fileUrl = '';

    try {
      const data = new FormData();
      data.append('file', formData.file);
      data.append('upload_preset', 'Comprobantes');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dkfbhn3ht/image/upload',
        { method: 'POST', body: data }
      );

      const result = await res.json();

      if (!res.ok) {
        console.error('Error Cloudinary:', result);
        alert('Error al subir el comprobante');
        setUploading(false);
        return;
      }

      fileUrl = result.secure_url;
      console.log('Archivo subido correctamente:', fileUrl);
    } catch (err) {
      console.error('Error en fetch:', err);
      alert('Error al subir el comprobante');
    } finally {
      setUploading(false);
    }

    const total = items.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    let message = `🧾 *Nuevo Pedido de ${formData.name}*\n\n`;
    message += `📞 Teléfono: ${formData.phone}\n📧 Correo: ${formData.email}\n🏠 Dirección: ${formData.address}\n\n`;
    message += `🛍️ *Productos:*\n`;
    items.forEach((item) => {
      message += `• ${item.title} (x${item.quantity || 1}) - $${item.price.toFixed(2)}\n`;
    });
    message += `\n💰 *Total:* $${total.toFixed(2)}\n`;
    message += `\n💳 *Realiza el pago por Nequi a este número:* 3001234567\n`;
    if (formData.note) message += `📝 Nota: ${formData.note}\n`;
    message += `📸 Comprobante: ${fileUrl}\n`;

    const phoneNumber = '573205285432';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

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

        {items.length > 0 &&
          items.map((item) => (
            <div key={item.id} className={styles.summaryItem}>
              <img src={item.image || item.images?.[0]} alt={item.title} />
              <div>
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p>Cantidad: {item.quantity || 1}</p>
                <p>Precio: ${item.price?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          ))}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Dirección de envío</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Nota (opcional)</label>
            <textarea
              name="note"
              rows="3"
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Comprobante de pago (imagen)</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {previewUrl && (
            <div className={styles.previewFile}>
              <img src={previewUrl} alt="Vista previa del comprobante" />
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={uploading}
          >
            {uploading ? 'Subiendo...' : 'Enviar pedido vía WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
}