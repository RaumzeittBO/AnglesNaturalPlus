# Sistema de Economía Circular — ANGLES CIRCULAR

**Angles Circular** es la estrategia integral de sostenibilidad y retorno de envases de **Angles Natural**, liderada por la bioquímica farmacéutica Andrea Angles en Bolivia.

---

## 1. Principios Rectores

1. **Antigreenwashing Radical:** No se muestran contadores ficticios ni métricas decorativas. Si la plataforma inicia con 0 envases recuperados, se muestra explícitamente: *"Todo impacto empieza en cero. Estamos listos para recibir tu primer envase."*
2. **Pasaporte Circular por Producto:** Cada formulación desglosa sus materiales (frasco, tapa, liner, precinto, gotero, blíster, etiqueta) con instrucciones químicas precisas para su reintegración o reciclaje seguro.
3. **Red de Acopio Descentralizada:** Vinculación con farmacias, tiendas saludables y espacios comunitarios en Cochabamba, La Paz, Santa Cruz y el resto de Bolivia.

---

## 2. Componentes del Ecosistema Circular

### A. Pasaporte Circular (`/productos/[slug]`)
* Interfaz interactiva donde el consumidor inspecciona cada pieza del empaque.
* Indica la composición química exacta (ej. Vidrio ámbar tipo III, PEAD Grado 2, Foil de aluminio) y su destino según las normativas municipales bolivianas.

### B. Mapeo y Directorio de Puntos (`/circular/puntos`)
* Búsqueda por ciudad, horario y tipos de residuos aceptados.
* Integración con geolocalización y mapa interactivo.

### C. Guía "¿Dónde Va Mi Residuo?" (`/circular/donde-va`)
* Motor de búsqueda instantáneo para conocer el destino correcto de residuos cotidianos y envases farmacéuticos.
* Minijuego educativo de 3 flujos:
  * **Contenedor Verde/Azul:** Reciclables limpios y secos.
  * **Contenedor Marrón/Verde:** Materia orgánica compostable.
  * **Contenedor Negro:** No reciclables / Sanitarios.

### D. Trazabilidad de Impacto (`/circular/impacto`)
* Métricas en tiempo real calculadas de los lotes verificados en el libro mayor (`ImpactRecord`).
* Indicadores:
  * Envases recuperados totales.
  * Kilogramos de material desviados de rellenos sanitarios.
  * Estimación de CO2 equivalente evitado.
  * Voluntarios y aliados participantes.

### E. Niveles Botánicos de Eco-Puntos (`/circular/eco-puntos`)
* **Semilla** (0 - 49 pts): Inicio de hábitos circulares.
* **Brote** (50 - 149 pts): Devolución consistente de empaques.
* **Raíz** (150 - 299 pts): Miembro activo y promotor comunitario.
* **Bosque** (300+ pts): Embajador ambiental con acceso a experiencias exclusivas y visitas al laboratorio de formulación.
