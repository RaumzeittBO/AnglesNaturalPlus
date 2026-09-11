# Guía de Conexión e Integración con Firebase

Esta guía documenta la arquitectura de datos híbrida de **Angles Natural** y cómo vincular un proyecto de Firebase en producción.

---

## 1. Arquitectura de Datos Híbrida (`lib/db.ts` y `lib/firebase.ts`)

La plataforma fue diseñada con el patrón **Graceful Fallback**:
1. **Modo Local / Standalone (Por Defecto):**
   - Si no se definen las variables de Firebase en `.env.local`, el adaptador `dbAdapter` utiliza un almacenamiento local respaldado por `localStorage` y semillas estáticas (`content/products.ts`, `content/circular.ts`).
   - Permite navegación 100% funcional, pruebas, evaluación de jurados y despliegue rápido sin requerir credenciales de nube.
2. **Modo Conectado (Firebase Firestore):**
   - Al proveer las credenciales, `lib/firebase.ts` inicializa la instancia de Firebase y `dbAdapter` conecta de manera transparente con las colecciones de Firestore.

---

## 2. Colecciones de Firestore

Las siguientes colecciones corresponden a los modelos de datos del sistema:

| Colección | Descripción | Esquema Principal |
| :--- | :--- | :--- |
| `products` | Catálogo de productos y pasaporte circular | `id, slug, name, category, priceBob, presentation, ingredients, benefits, packagingPassport[], active` |
| `collection_points` | Directorio de puntos de acopio oficiales | `id, name, city, address, schedule, acceptedMaterials[], status, coordinates, phone` |
| `waste_guide` | Base de conocimiento de clasificación | `id, name, category, destination, instructions, anglesAccepted, materialDetails` |
| `partners` | Aliados comerciales y de reciclaje | `id, name, type, city, address, description, website, contactEmail, status, verified, impactSummary` |
| `events` | Jornadas presenciales de acopio | `id, title, date, time, location, city, description, status, resultSummary` |
| `impact_records` | Libro mayor de pesajes y lotes verificados | `id, date, materialType, unitsCount, weightKg, co2SavedKg, location, city, batchCode, verifiedBy, notes` |
| `challenges` | Retos comunitarios de sostenibilidad | `id, title, description, pointsReward, duration, badgeIcon, instructions[]` |
| `rewards` | Catálogo de canje de Eco-Puntos | `id, title, description, pointsCost, category, active` |

---

## 3. Configuración Paso a Paso

1. Crea un proyecto en la [Consola de Firebase](https://console.firebase.google.com/).
2. Habilita **Firestore Database** en modo producción o prueba.
3. En la configuración del proyecto, añade una aplicación Web y copia los valores de configuración.
4. Crea un archivo `.env.local` en la raíz del proyecto basándote en `.env.example`:
   ```env
   NEXT_PUBLIC_WHATSAPP_PHONE=59170000000
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=angles-natural.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=angles-natural
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=angles-natural.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
   NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:...
   ```
5. Reinicia el servidor con `npm run build` o `npm run dev`.

---

## 4. Reglas de Seguridad Recomendadas para Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lectura pública para el catálogo y la guía circular
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Requiere autenticación para modificar desde /admin
    }
  }
}
```
