import Navbar from '../components/Navbar'
import styles from '../styles/modules/layout.module.scss'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Bienvenida a Mi Tienda</h1>
          <p>Diseño y estilo en bolsos femeninos y ropa seleccionada.</p>
        </section>

        <section className={styles.about}>
          <h2>Sobre la tienda</h2>
          <p>Somos una tienda boutique que selecciona piezas con atención al detalle.</p>
        </section>

        <section className={styles.cta}>
          <a href="/products" className={styles.button}>Ver productos</a>
        </section>

        <footer id="contact" className={styles.footer}>
          <p>Contacto: +57 300 0000000 • Dirección ejemplo</p>
        </footer>
      </main>
    </div>
  )
}