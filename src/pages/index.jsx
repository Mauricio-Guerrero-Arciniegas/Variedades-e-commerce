import Navbar from '../components/Navbar'
import styles from '../styles/modules/layout.module.scss'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Bienvenidos a Tienda de Variedades</h1>
            <p>Diseño y estilo en bolsos femeninos y ropa seleccionada.</p>
            <a href="/products" className={styles.button}>Ver productos</a>
          </div>
        </section>

        <section className={styles.about}>
          <h2>Sobre la tienda</h2>
          <p>
            Tienda de Variedades es tu espacio favorito de moda y estilo. Aquí encontrarás una cuidada selección de bolsos, ropa femenina y accesorios pensados para resaltar tu personalidad y acompañarte en cada momento del día.
          </p>
          <p>
            Desde lo casual hasta lo elegante, nuestras colecciones combinan tendencias actuales, calidad y precios accesibles, para que vestir bien sea siempre un placer. 💫
          </p>
          <p>
            ✨ Tu estilo, tu esencia, tu tienda. Somos una tienda boutique que selecciona piezas con atención al detalle.
          </p>
        </section>

        <footer id="contact" className={styles.footer}>
          <p>Contacto: +57 316 250 0703</p>
        </footer>
      </main>
    </div>
  )
}