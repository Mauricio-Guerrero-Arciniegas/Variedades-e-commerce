import { useState } from 'react'
import styles from '../styles/modules/modal.module.scss'
import { useCart } from '../context/CartContext'

export default function ModalPurchase({ product, onClose }) {
  const { clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', address: '', note: '' })
  const [file, setFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // for now we'll just console.log — integrate with backend later
    const payload = { product, form, file }
    console.log('purchase', payload)
    alert('Compra recibida (frontend). Revisar consola. En el futuro se enviará al backend.')
    clearCart()
    onClose()
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <h2>Comprar: {product.title}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nombre completo
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </label>
          <label>
            Email
            <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </label>
          <label>
            Dirección de envío
            <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
          </label>
          <label>
            Nota (opcional)
            <textarea value={form.note} onChange={e => setForm({...form, note: e.target.value})} />
          </label>
          <label>
            Comprobante de pago (imagen)
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
          </label>
          <div className={styles.actions}>
            <button type="submit">Enviar compra</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}