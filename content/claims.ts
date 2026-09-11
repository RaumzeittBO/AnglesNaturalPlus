export type ClaimStatus = "CURRENT" | "IN_PROGRESS" | "VISION";

export interface ClaimItem {
  id: string;
  category: "SOSTENIBILIDAD" | "FORMULACION" | "BIENESTAR_ANIMAL" | "ORIGEN";
  title: string;
  status: ClaimStatus;
  statusLabel: string;
  description: string;
  evidenceOrNextStep: string;
}

export const CLAIM_STATUS_MAP: Record<
  ClaimStatus,
  { label: string; badgeClass: string; dotClass: string; description: string }
> = {
  CURRENT: {
    label: "YA LO HACEMOS",
    badgeClass: "bg-emerald-900/10 text-emerald-800 border-emerald-700/30",
    dotClass: "bg-emerald-600",
    description: "Procesos, prácticas y formulaciones actualmente implementados en nuestras operaciones.",
  },
  IN_PROGRESS: {
    label: "ESTAMOS TRABAJANDO EN ELLO",
    badgeClass: "bg-amber-900/10 text-amber-900 border-amber-700/30",
    dotClass: "bg-amber-600",
    description: "Proyectos en fase activa de formulación, pruebas analíticas y validación técnica.",
  },
  VISION: {
    label: "VISIÓN FUTURA",
    badgeClass: "bg-teal-900/10 text-teal-900 border-teal-700/30",
    dotClass: "bg-teal-500",
    description: "Objetivos de escala, impacto social y líneas complementarias que proyectamos construir.",
  },
};

export const CLAIMS: ClaimItem[] = [
  {
    id: "residuos-separacion",
    category: "SOSTENIBILIDAD",
    title: "Separación y Clasificación de Residuos en 3 Flujos",
    status: "CURRENT",
    statusLabel: "YA LO HACEMOS",
    description: "Segregación activa de residuos orgánicos, reciclables limpios y no aprovechables en el espacio de trabajo.",
    evidenceOrNextStep: "Práctica operativa implementada en el taller de formulación.",
  },
  {
    id: "nutriq-desarrollo",
    category: "FORMULACION",
    title: "NutriQ — Proteína Funcional con Tarwi y Cañahua",
    status: "IN_PROGRESS",
    statusLabel: "ESTAMOS TRABAJANDO EN ELLO",
    description: "Formulación proteica funcional vegetal en fase de investigación, prueba de solubilidad y optimización de aminoácidos.",
    evidenceOrNextStep: "Concepto científico en desarrollo; no comercializado hasta validación total de estabilidad.",
  },
  {
    id: "empaque-monomaterial",
    category: "SOSTENIBILIDAD",
    title: "Optimización y Reducción de Capas de Empaque",
    status: "IN_PROGRESS",
    statusLabel: "ESTAMOS TRABAJANDO EN ELLO",
    description: "Evaluación de materiales con menor impacto y eliminación de empaques secundarios superfluos.",
    evidenceOrNextStep: "Pruebas de barrera contra humedad en curso para determinar el mínimo espesor necesario.",
  },
  {
    id: "apoyo-albergues",
    category: "BIENESTAR_ANIMAL",
    title: "Programa Estructurado de Apoyo a Albergues de Mascotas",
    status: "VISION",
    statusLabel: "VISIÓN FUTURA",
    description: "Destinar un porcentaje de utilidades de líneas complementarias para financiar esterilizaciones y nutrición de animales rescatados.",
    evidenceOrNextStep: "Se activará una vez alcanzada la escala comercial y el punto de equilibrio financiero.",
  },
  {
    id: "alimentos-mascotas",
    category: "BIENESTAR_ANIMAL",
    title: "Línea de Nutrición Funcional para Mascotas",
    status: "VISION",
    statusLabel: "VISIÓN FUTURA",
    description: "Desarrollo de suplementación preventiva basada en ciencia para la salud articular y digestiva de perros y gatos.",
    evidenceOrNextStep: "Fase conceptual proyectada como siguiente etapa de diversificación.",
  },
  {
    id: "alianza-productores",
    category: "ORIGEN",
    title: "Red Directa de Comercio Justo con Productores Andinos",
    status: "IN_PROGRESS",
    statusLabel: "ESTAMOS TRABAJANDO EN ELLO",
    description: "Establecimiento de acuerdos de abastecimiento directo con asociaciones campesinas de Tarwi y Cañahua.",
    evidenceOrNextStep: "Contactos preliminares en valles y altiplano boliviano.",
  },
];