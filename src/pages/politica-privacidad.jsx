import Link from "next/link";

export default function PoliticaPrivacidad() {
  return (
    <section
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: "1.6",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* 🔝 Botón superior */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            backgroundColor: "#0b5fff",
            color: "white",
            padding: "0.8rem 1.6rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "background-color 0.2s ease",
          }}
        >
          ← Regresar a la tienda
        </Link>
      </div>

      <h1 style={{ marginBottom: "1rem" }}>Política de Privacidad</h1>

      <p>
        En <strong>MiTienda</strong> valoramos y respetamos la privacidad de
        nuestros clientes. Esta política describe cómo recopilamos, usamos y
        protegemos tu información personal al interactuar con nuestra
        plataforma.
      </p>

      <h2>1. Información que recopilamos</h2>
      <p>
        Podemos solicitar datos como nombre, correo electrónico, dirección,
        teléfono y detalles de pago con el fin de procesar tus pedidos y
        ofrecerte un mejor servicio.
      </p>

      <h2>2. Uso de la información</h2>
      <p>
        Utilizamos tus datos únicamente para completar tus compras, enviar
        actualizaciones de pedidos, promociones y atender tus solicitudes.
      </p>

      <h2>3. Protección de datos</h2>
      <p>
        Contamos con medidas técnicas y organizativas para garantizar la
        seguridad de tu información y prevenir el acceso no autorizado.
      </p>

      <h2>4. Derechos del usuario</h2>
      <p>
        De acuerdo con la Ley 1581 de 2012 (Colombia), puedes acceder,
        corregir o eliminar tus datos personales en cualquier momento
        escribiéndonos a{" "}
        <a href="mailto:contacto@mitienda.com">contacto@mitienda.com</a>.
      </p>

      <h2>5. Actualizaciones</h2>
      <p>
        MiTienda puede actualizar esta política en cualquier momento. Te
        recomendamos revisar periódicamente esta página para mantenerte
        informado sobre los cambios.
      </p>

      <p>© {new Date().getFullYear()} MiTienda — Todos los derechos reservados.</p>

      {/* 🔚 Botón inferior */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            backgroundColor: "#0b5fff",
            color: "white",
            padding: "0.8rem 1.6rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "background-color 0.2s ease",
          }}
        >
          ← Regresar a la tienda
        </Link>
      </div>
    </section>
  );
}