export interface ChapterMeta {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
}

export const SITE_CONTENT = {
  brand: {
    name: "ANGLES NATURAL",
    founder: "Andrea Angles",
    founderTitle: "Bioquímica Farmacéutica & Emprendedora",
    founderRole: "Fundadora de Angles Natural",
    tagline: "De la ciencia nace el impacto.",
    descriptor: "Ecosistema Vivo",
    visionStatement: "No queremos pedirte que imagines nuestro futuro. Queremos que puedas recorrerlo.",
  },
  meta: {
    title: "Angles Natural — Ecosistema Vivo",
    description: "Una experiencia digital interactiva sobre ciencia, formulación funcional, sostenibilidad y propósito desde Bolivia.",
    ogTitle: "ANGLES NATURAL — Ecosistema Vivo",
    ogDescription: "De la ciencia nace el impacto. Conoce la visión de Andrea Angles y el desarrollo de NutriQ.",
  },
  modes: {
    free: {
      id: "free",
      label: "EXPLORAR LIBREMENTE",
      description: "Recorrido orgánico guiado por la raíz a tu propio ritmo.",
    },
    guided: {
      id: "guided",
      label: "EXPERIENCIA GUIADA · 90 S",
      description: "Presentación ejecutiva capítulo por capítulo pensada para el jurado.",
    },
  },
  videoJuryPrompt: {
    heading: "Continúa la historia.",
    subheading: "Entra al ecosistema de Angles Natural.",
    badge: "Acceso Directo Jurado",
  },
  chapters: [
    {
      id: "origen",
      number: "01",
      title: "Todo comienza aquí.",
      subtitle: "Creemos que innovar también significa aprender a mirar lo que tenemos cerca.",
      summary: "Bolivia como territorio de biodiversidad y origen de materias primas con valor nutricional excepcional.",
    },
    {
      id: "laboratorio",
      number: "02",
      title: "Investigar. Probar. Corregir. Volver a intentar.",
      subtitle: "De la ciencia nace la formulación: la mesa de investigación donde nace el concepto NutriQ.",
      summary: "La alquimia científica detrás de la combinación de fuentes vegetales y micronutrientes esenciales.",
    },
    {
      id: "desafio",
      number: "03",
      title: "Crear un producto es solamente una parte del problema.",
      subtitle: "Ahora te toca decidir: 100 recursos para equilibrar nutrición, viabilidad, sostenibilidad e impacto.",
      summary: "Simulador de toma de decisiones estratégicas donde construir responsablemente es un balance continuo.",
    },
    {
      id: "sostenibilidad",
      number: "04",
      title: "Responsabilidad también significa diseñar mejor.",
      subtitle: "Gestión circular de residuos e ingeniería de empaques con honestidad radical.",
      summary: "Separación en 3 flujos reales y desglose técnico de capas de protección sin greenwashing.",
    },
    {
      id: "bienestar-animal",
      number: "05",
      title: "Crecer también puede significar devolver.",
      subtitle: "Una visión de impacto integral que proyecta devolver a la comunidad y a los animales.",
      summary: "Proyección futura de apoyo estructurado a albergues de mascotas en Bolivia.",
    },
    {
      id: "vision",
      number: "06",
      title: "La Visión",
      subtitle: "Una empresa no es solamente aquello que vende. También es aquello que decide construir.",
      summary: "Andrea Angles y el rumbo de una empresa boliviana en constante evolución.",
    },
  ] as ChapterMeta[],
  founderSection: {
    greeting: "Soy Andrea Angles.",
    credentials: [
      "Bioquímica farmacéutica.",
      "Emprendedora boliviana.",
      "Fundadora de Angles Natural.",
    ],
    pillars: [
      { word: "CIENCIA", desc: "Rigurosidad en formulación y desarrollo analítico." },
      { word: "NATURALEZA", desc: "Aprovechamiento consciente de materias primas." },
      { word: "BOLIVIA", desc: "Identidad, territorio y valor agregado local." },
      { word: "INNOVACIÓN", desc: "Desarrollo funcional adaptado a necesidades reales." },
      { word: "IMPACTO", desc: "Compromiso social, ambiental y con el bienestar animal." },
    ],
    closingMessage: "Esta empresa todavía está creciendo. Pero sabemos con certeza hacia dónde queremos crecer.",
    finalValues: "Ciencia · Innovación · Propósito",
  },
};