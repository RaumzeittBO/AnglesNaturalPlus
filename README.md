# ANGLES NATURAL — Plataforma Web Oficial & Ecosistema Vivo

Plataforma digital integral y multifunción de **ANGLES NATURAL**, empresa boliviana de bienestar, ciencia farmacéutica y suplementación funcional fundada por la bioquímica farmacéutica Andrea Angles.

---

## 🌐 Despliegue en Producción (Deployment)

| Servicio | Detalle |
| :--- | :--- |
| **Repositorio GitHub** | [https://github.com/RaumzeittBO/AnglesNaturalPlus](https://github.com/RaumzeittBO/AnglesNaturalPlus) |
| **Rama Principal** | `main` |
| **Proyecto Vercel** | `angles-natural-plus` |
| **URL Oficial de Producción** | [https://angles-natural-plus.vercel.app](https://angles-natural-plus.vercel.app) |
| **Integración CI/CD** | Despliegue automático en Vercel con cada push a la rama `main` |

---

## 🚀 Inicio Rápido (Local Development)

### Requisitos Previos
- Node.js 18.x o superior
- npm, pnpm o yarn

### Instalación de Dependencias
```bash
npm install
```

### Ejecutar en Modo Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilar y Verificar para Producción
```bash
npm run lint
npm run build
npm run start
```

---

## 🌿 Arquitectura de la Plataforma

1. **Portal Institucional (`/`):** Presentación de marca, ciencia funcional andina y accesos a productos y circularidad.
2. **Nuestra Historia (`/nosotros`):** Biografía de Andrea Angles y su método de 7 pasos.
3. **Catálogo de Productos (`/productos` & `/productos/[slug]`):** Fichas técnicas, pedidos directos a WhatsApp y **Pasaporte Circular** interactivo por componente de empaque.
4. **Ecosistema Vivo (`/ecosistema`):** Experiencia inmersiva en 6 capítulos con soporte para modo jurado (`?mode=jury`) y escaneo QR desde video (`?source=video`).
5. **Angles Circular (`/circular`):**
   - `/circular/devuelve`: Guía de preparación y retorno de envases.
   - `/circular/puntos`: Directorio nacional y mapa interactivo de acopio.
   - `/circular/donde-va`: Guía de separación de residuos y minijuego educativo en 3 flujos.
   - `/circular/impacto`: Trazabilidad real y transparente.
   - `/circular/aliados`: Directorio de aliados y formulario de postulación.
   - `/circular/jornadas`: Jornadas presenciales comunitarias.
   - `/circular/retos`: Desafíos de sostenibilidad con Eco-Puntos.
   - `/circular/eco-puntos`: Niveles botánicos (*Semilla a Bosque*) y recompensas.
6. **Panel de Administración (`/admin`):** Dashboard integral con operaciones CRUD para catálogo, puntos de acopio, residuos, eventos, solicitudes e impacto.

---

## 📚 Documentación Técnica

- [Guía de Integración con Firebase](docs/FIREBASE.md)
- [Sistema de Economía Circular](docs/CIRCULAR_SYSTEM.md)
- [Manual del Administrador](docs/ADMIN.md)
- [Arquitectura Técnica](docs/ARCHITECTURE.md)
- [Sistema de Diseño & Tokens](docs/DESIGN_SYSTEM.md)
- [Guía de Contenidos & Anti-Greenwashing](docs/CONTENT_GUIDE.md)

---

© Angles Natural. Desarrollado con ciencia, innovación y propósito desde Bolivia.