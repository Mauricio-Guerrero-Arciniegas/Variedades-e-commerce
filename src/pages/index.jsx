import Navbar from '../components/Navbar'
import styles from '../styles/modules/layout.module.scss'
import { FaInstagram } from "react-icons/fa"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Navbar />

      <main className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Bienvenidos a Tienda de Variedades</h1>
            <p>Diseño y estilo en bolsos femeninos, ropa seleccionada y accesorios.</p>
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

        {/* ======== FOOTER ======== */}
        <footer
  style={{
    backgroundColor: "#0f11117e",
    color: "#f5f5f5",
    padding: "3rem 2rem",
    marginTop: "3rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  }}
>
  {/* Columna 1: Marca */}
  <div style={{ marginTop: "-.5rem" }}> {/* 🔹 Ajuste para alinear con los títulos */}
    <h2
      style={{
        color: "#f7dfa5",
        fontWeight: "700",
        marginBottom: "0.8rem",
      }}
    >
      MiTienda
    </h2>
    <p style={{ color: "#ccc", lineHeight: "1.6" }}>
      Moda y estilo para todos los días.  
      Encuentra los mejores bolsos y prendas que se adaptan a tu estilo.
    </p>
  </div>

  {/* Columna 2: Enlaces */}
  <div>
    <h3 style={{ color: "#f7dfa5", marginBottom: "0.8rem" }}>Enlaces</h3>
    <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
      <li>
        <a href="/products" style={{ color: "#f5f5f5", textDecoration: "none" }}>
          Productos
        </a>
      </li>
      <li>
        <a href="/politica-privacidad" style={{ color: "#f5f5f5", textDecoration: "none" }}>
          Política de privacidad
        </a>
      </li>
      <li>
        <a href="/politica-seguridad" style={{ color: "#f5f5f5", textDecoration: "none" }}>
          Política de seguridad
        </a>
      </li>
    </ul>
  </div>

  {/* Columna 3: Contacto */}
  <div>
    <h3 style={{ color: "#f7dfa5", marginBottom: "0.8rem" }}>Contáctanos</h3>
    <p style={{ margin: "0.3rem 0", color: "#ccc" }}>📧 contacto@mitienda.com</p>
    <p style={{ margin: "0.3rem 0", color: "#ccc" }}>📱 +57 300 123 4567</p>
    <p style={{ margin: "0.3rem 0", color: "#ccc" }}>📍 Medellín, Colombia</p>
  </div>

  {/* Columna 4: Redes sociales */}
  <div style={{ textAlign: "center" }}>
    <h3 style={{ marginBottom: "1.2rem", fontWeight: "600", color: "#f7dfa5" }}>
      Síguenos
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      {/* Cuenta 1 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <a
          href="https://www.instagram.com/market.rose"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#E1306C",
            fontSize: "1.8rem",
            transition: "transform 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.color = "#ff7aa2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "#E1306C";
          }}
        >
          <FaInstagram />
        </a>
        <span style={{ fontSize: "0.9rem", color: "#ddd", marginTop: "0.4rem" }}>
          @Market Rosé
        </span>
      </div>

      {/* Cuenta 2 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <a
          href="https://www.instagram.com/cafeauroraoficial"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#E1306C",
            fontSize: "1.8rem",
            transition: "transform 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.color = "#ff7aa2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "#E1306C";
          }}
        >
          <FaInstagram />
        </a>
        <span style={{ fontSize: "0.9rem", color: "#ddd", marginTop: "0.4rem" }}>
          @Café Aurora
        </span>
      </div>
    </div>
  </div>

  {/* Línea inferior */}
  <div
    style={{
      gridColumn: "1 / -1",
      textAlign: "center",
      marginTop: "2rem",
      paddingTop: "1rem",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "#aaa",
      fontSize: "0.9rem",
    }}
  >
    © {new Date().getFullYear()} MiTienda. Todos los derechos reservados.
  </div>
</footer>
      </main>
    </div>
  )
}