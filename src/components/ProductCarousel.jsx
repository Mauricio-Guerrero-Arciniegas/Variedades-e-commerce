import { useState } from 'react'
import styles from '../styles/modules/carousel.module.scss'

export default function ProductCarousel({ images = [] }) {
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false) // 🔍 estado para ampliar imagen

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.viewport}>
          <img
            src={images[index]}
            alt={`Imagen ${index + 1}`}
            onClick={() => setZoomed(true)} // 👈 abre el modo ampliado
            className={styles.clickable}
          />
        </div>

        <div className={styles.controls}>
          <button onClick={prev} aria-label="Anterior">◀</button>
          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={i === index ? styles.active : ''}
                onClick={() => setIndex(i)}
                aria-label={`Ir a ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Siguiente">▶</button>
        </div>
      </div>

      {/* 🔍 Modal para ampliar imagen */}
      {zoomed && (
        <div className={styles.zoomOverlay} onClick={() => setZoomed(false)}>
          <img src={images[index]} alt="Zoom" className={styles.zoomImage} />
        </div>
      )}
    </>
  )
}