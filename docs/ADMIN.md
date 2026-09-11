# Manual del Administrador — ANGLES ADMIN

Este manual describe el funcionamiento y la operación del panel de administración ubicado en `/admin`.

---

## 1. Acceso y Navegación

El panel de administración se encuentra en `/admin` y cuenta con un menú lateral responsivo que da acceso a las siguientes secciones:

- **/admin:** Resumen general de KPIs, solicitudes pendientes e integridad de trazabilidad.
- **/admin/productos:** Creación, edición, precios y definición del pasaporte de empaque.
- **/admin/puntos:** Gestión de puntos de acopio oficiales, direcciones y horarios.
- **/admin/residuos:** Mantenimiento de la base de datos de residuos y reglas de separación.
- **/admin/aliados:** Bandeja de entrada para revisar postulaciones de nuevos aliados y asignar la insignia de verificación.
- **/admin/jornadas:** Programación de jornadas presenciales de acopio y registro de resultados finales.
- **/admin/impacto:** Libro mayor de lotes y pesajes verificados para trazabilidad transparente.
- **/admin/retos:** Configuración de desafíos de sostenibilidad y asignación de Eco-Puntos.
- **/admin/eco-puntos:** Catálogo de recompensas y canjes disponibles.

---

## 2. Flujo de Trabajo Común

### A. Registro de un Lote de Envases Recuperados
1. Ingresa a `/admin/impacto`.
2. Haz clic en **"Registrar Lote / Pesaje"**.
3. Ingresa el código de lote (ej. `LOTE-2026-09`), material, cantidad de unidades, peso en kilogramos y responsable de verificación.
4. Al guardar, las métricas públicas en `/circular/impacto` se actualizarán de forma automática e inmediata.

### B. Aprobación de un Nuevo Aliado
1. Ingresa a `/admin/aliados`.
2. Filtra por **"Pendientes de Revisión"**.
3. Evalúa los datos del negocio y haz clic en **"Aprobar y Verificar"**.
4. El aliado aparecerá instantáneamente en el directorio público (`/circular/aliados`) con su ficha de detalle (`/circular/aliados/[slug]`).

---

## 3. Respaldo de Datos y Persistencia

- **En modo local:** Toda edición realizada en `/admin` se guarda en el `localStorage` del navegador.
- **En modo Firebase:** Si se configuran las variables en `.env.local`, todas las operaciones CRUD sincronizan directamente con Firestore en tiempo real.
