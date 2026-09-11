# Sistema de Diseño — ANGLES NATURAL (Ecosistema Vivo)

Sistema visual y cromático derivado directamente del logotipo oficial de **ANGLES NATURAL**, combinando el relieve esmeralda y el acento botánico con una composición editorial cálida y contemporánea.

---

## 1. Paleta Cromática

| Token | HEX | Rol y Aplicación | Contraste |
| :--- | :--- | :--- | :--- |
| `--brand-forest` | `#0F3E2E` | Verde bosque profundo. Fondos de cierre, títulos principales, botones primarios. | Alto (>12:1) |
| `--brand-emerald` | `#1E6B4C` | Verde esmeralda botánico del monograma. Acentos activos, bordes destacados. | Medio/Alto |
| `--brand-leaf` | `#3FA868` | Verde hoja vivo. Indicadores de estado, checks y micro-animaciones. | Acento |
| `--brand-leaf-light` | `#72C48D` | Verde hoja claro. Textos sobre fondos oscuros y halos sutiles. | Óptimo en oscuro |
| `--brand-accent-gold` | `#C99738` | Oro andino sutil. Protagonismo de granos ancestrales (Tarwi, Cañahua). | Acento cálido |
| `--surface-paper` | `#FBF9F5` | Blanco cálido tipo papel de alto gramaje. Fondo principal. | Base clara |
| `--surface-cream` | `#F4EFE6` | Crema suave. Tarjetas, contenedores interactivos y modales. | Secundario |
| `--surface-sand` | `#EAE3D4` | Arena mineral. Estados hover, bordes de contenedor y divisiones. | Neutro |
| `--text-ink` | `#13221A` | Tinta bosque profunda. Texto de lectura principal y párrafos. | WCAG AAA |
| `--text-muted` | `#57665E` | Tono tierra suave. Subtítulos, metadatos y notas técnicas. | WCAG AA |
| `--border-subtle` | `#E2DBD0` | Líneas y delimitadores orgánicos. | Estructural |

---

## 2. Tipografía

### Tipografía Editorial / Titulares: `Fraunces`
- **Familia:** Variable Serif (Google Fonts)
- **Uso:** Títulos de capítulos, citas de la fundadora, manifiesto y titulares centrales.
- **Carácter:** Elegante, cálido, científico y contemporáneo.

### Tipografía de Interfaz / Cuerpo: `Manrope`
- **Familia:** Geometric/Humanist Sans (Google Fonts)
- **Uso:** Botones, fichas técnicas, métricas del simulador, navegación y textos de lectura.
- **Carácter:** Técnico, altamente legible en pantallas móviles y sobrio.

---

## 3. Principios de Movimiento (Motion Design)

- **Orgánico y Sutil:** La interacción responde con transiciones de tipo *spring* suave (`stiffness: 120, damping: 20`).
- **Respeto a Accesibilidad:** Todas las animaciones se atenúan automáticamente si el usuario tiene activo `prefers-reduced-motion`.
- **Sin Distracciones:** No se utilizan cursores invasivos ni efectos de neón artificiales.