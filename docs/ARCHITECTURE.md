# Arquitectura Técnica — ANGLES NATURAL (Ecosistema Vivo)

Este documento detalla la estructura, flujo de datos, gestión de estados y principios de desarrollo del proyecto para facilitar su continuidad en Codex y futuros ciclos de iteración.

---

## 1. Stack Tecnológico

- **Framework:** Next.js 15+ (App Router)
- **Lenguaje:** TypeScript estricto
- **Estilos:** Tailwind CSS con tokens semánticos y CSS variables personalizadas
- **Tipografía:** `Fraunces` (Google Font - editorial) + `Manrope` (Google Font - interfaz y datos)
- **Animaciones & Motion:** CSS transitions, SVG dynamic pathing y `lib/animations.ts`
- **Audio:** Web Audio API sintético en `lib/audio.ts` (sin dependencias de archivos externos pesados)
- **Despliegue:** Optimizado para Vercel (Next.js Static Generation)

---

## 2. Estructura de Directorios

```
ANGLESINT/
├── app/
│   ├── layout.tsx             # Root layout, Google fonts, metadata, safe-area viewport
│   ├── page.tsx               # Orquestador principal, query params (?source=video, ?mode=jury)
│   └── globals.css            # Custom properties, texturas grain, utilidades de accesibilidad
├── components/
│   ├── experience/            # Capítulos narrativos interactivos
│   │   ├── IntroPortal.tsx          # Semilla viva y selector de modo (Libre / 90s)
│   │   ├── BoliviaOrigin.tsx        # Topografía abstracta e ingredientes interactivos
│   │   ├── IngredientModal.tsx      # Ficha técnica botánica
│   │   ├── LabExperience.tsx        # Mesa de formulación científica NutriQ
│   │   ├── DecisionChallenge.tsx    # Simulador de toma de decisiones sostenibles (100 pts)
│   │   ├── SustainabilitySection.tsx# 3 flujos de residuos y separador de capas de empaque
│   │   ├── AnimalImpact.tsx         # Visión futura de bienestar animal y albergues
│   │   ├── FutureVision.tsx         # Manifiesto de Andrea Angles y convergencia de 5 pilares
│   │   └── FinalReveal.tsx          # Cierre de marca, QR interactivo y loop de repetición
│   └── ui/                    # Componentes atómicos reutilizables
│       ├── Button.tsx               # Botones primarios, secundarios y ghost
│       ├── SectionTitle.tsx         # Jerarquía de títulos con numeración romana
│       ├── ClaimBadge.tsx           # Insignias de transparencia anti-greenwashing
│       ├── AudioControl.tsx         # Control flotante de paisaje sonoro
│       ├── ProgressRoot.tsx         # Indicador de progreso de raíz viva SVG
│       ├── GuidedModeBar.tsx        # Barra de navegación para el Modo Jurado 90s
│       └── QRShareModal.tsx         # Modal de generación y escaneo QR
├── content/                   # Contenido centralizado y desacoplado
│   ├── site.ts                # Textos del sitio, metadatos y biografía de la fundadora
│   ├── ingredients.ts         # Datos de Tarwi, Cañahua, Arveja, Crema de arroz, Vitaminas
│   ├── decisions.ts           # Configuración de los 5 dilemas estratégicos y matriz de efectos
│   └── claims.ts              # Catálogo anti-greenwashing clasificado
├── lib/
│   ├── utils.ts               # Utilidades de clases (clsx, tailwind-merge)
│   ├── animations.ts          # Tokens y variantes de animación
│   ├── audio.ts               # Sintetizador procedural con Web Audio API
│   └── analytics.ts           # Wrapper desacoplado de telemetría
└── public/
    └── brand/                 # Logotipo oficial e isotipo
```

---

## 3. Orquestación de Modos

### Modo Libre (Default)
El usuario recorre la experiencia mediante scroll natural vertical. La raíz viva (`ProgressRoot.tsx`) calcula la posición relativa y se elonga acompañando el recorrido.

### Modo Guiado / Jurado (90 Segundos)
Activado mediante:
1. Selección explícita en la pantalla de bienvenida.
2. Parámetro en URL: `/?mode=jury` o `/?mode=guided`.
3. Escaneo desde el video QR: `/?source=video`.

Controlado por `GuidedModeBar.tsx`, permite avanzar paso a paso por los 6 capítulos sin saltos bruscos y con retención total del control por parte del jurado.