export interface CollectionPoint {
  id: string;
  name: string;
  partnerName?: string;
  address: string;
  city: string;
  category?: "FARMACIA" | "GIMNASIO" | "TIENDA_SALUDABLE" | "ALBERGUE_ALIADO" | "CENTRO_EDUCATIVO" | string;
  acceptedMaterials: string[];
  schedule: string;
  phone?: string;
  whatsapp?: string;
  lat?: number;
  lng?: number;
  coordinates?: { lat: number; lng: number };
  status: "ACTIVE" | "IN_SETUP" | "PROJECTION" | "active" | "inactive";
  verifiedPartner?: boolean;
  notes?: string;
}

export interface WasteItem {
  id: string;
  name: string;
  category?: "ORGANICOS" | "APROVECHABLES" | "NO_APROVECHABLES" | string;
  commonExamples?: string;
  whatToDo?: string;
  whatNotToDo?: string;
  anglesProgram?: string;
  sourceNote?: string;
  destination?: string;
  instructions?: string;
  anglesAccepted?: boolean;
  materialDetails?: string;
}

export interface Partner {
  id: string;
  slug?: string;
  name: string;
  businessType?: "COMERCIO" | "GESTOR_RECICLADOR" | "INSTITUCION" | "CONSUMIDOR_LIDER" | string;
  type?: string;
  city: string;
  address?: string;
  description: string;
  acceptedMaterials?: string[];
  status: "APPROVED" | "PENDING" | "REJECTED" | "approved" | "pending" | "rejected";
  joinedDate?: string;
  collectionPointId?: string;
  impactContributionNotes?: string;
  impactSummary?: string;
  website?: string;
  phone?: string;
  contactEmail?: string;
  verified?: boolean;
}

export interface CollectionEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  city: string;
  description: string;
  acceptedMaterials?: string[];
  status: "UPCOMING" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "upcoming" | "completed";
  resultSummary?: string;
  results?: {
    kgCollected: number;
    containersCollected: number;
    participants: number;
    destinationManager: string;
  };
}
export type CircularEvent = CollectionEvent;

export interface SustainabilityChallenge {
  id: string;
  title: string;
  durationDays?: number;
  duration?: string;
  category?: "REDUCCIÓN" | "SEPARACIÓN" | "CIRCULARIDAD" | "BIENESTAR" | string;
  description: string;
  instructions: string[];
  pointsReward: number;
  badgeName?: string;
  badgeIcon?: string;
  status?: "ACTIVE" | "BETA" | "COMING_SOON" | string;
}
export type Challenge = SustainabilityChallenge;

export interface EcoPointReward {
  id: string;
  title?: string;
  name?: string;
  pointsCost: number;
  category: "PRODUCTO" | "DESCUENTO" | "EXPERIENCIA" | "DONACION_ALBERGUE" | string;
  description: string;
  status?: "ACTIVE" | "COMING_SOON" | string;
  active?: boolean;
}
export type Reward = EcoPointReward;

export interface ImpactRecord {
  id: string;
  date: string;
  materialType?: string;
  material?: string;
  unitsCount?: number;
  containersCollected?: number;
  weightKg?: number;
  kgCollected?: number;
  co2SavedKg?: number;
  participants?: number;
  location?: string;
  city?: string;
  batchCode?: string;
  eventNameOrSource?: string;
  verifiedBy?: string;
  registeredBy?: string;
  notes?: string;
}

export const INITIAL_COLLECTION_POINTS: CollectionPoint[] = [
  {
    id: "punto-angles-central",
    name: "Taller Piloto Angles Natural",
    partnerName: "Angles Natural Lab",
    address: "Zona Sopocachi, Av. 20 de Octubre",
    city: "La Paz",
    category: "TIENDA_SALUDABLE",
    acceptedMaterials: ["Envases Doypack Angles", "Frascos de Vidrio Angles", "Tapas PE/PP", "Scoops"],
    schedule: "Lunes a Viernes de 09:00 a 18:00",
    whatsapp: "+59170000000",
    lat: -16.5105,
    lng: -68.1295,
    status: "ACTIVE",
    verifiedPartner: true,
    notes: "Punto central de recepción y control de calidad de materiales."
  },
  {
    id: "punto-aliado-fit-cbba",
    name: "Punto Aliado Fitness & Salud",
    partnerName: "Gimnasio Vitality",
    address: "Zona Norte, Av. América",
    city: "Cochabamba",
    category: "GIMNASIO",
    acceptedMaterials: ["Envases Doypack Angles", "Scoops dosificadores"],
    schedule: "Lunes a Sábado de 07:00 a 21:00",
    lat: -17.3754,
    lng: -66.1568,
    status: "IN_SETUP",
    verifiedPartner: true,
    notes: "En fase de adecuación del contenedor recolector seguro."
  },
  {
    id: "punto-farmacia-scz",
    name: "Farmacia Naturalis Equipetrol",
    partnerName: "Farmacias Aliadas Santa Cruz",
    address: "Barrio Equipetrol, Calle 7",
    city: "Santa Cruz",
    category: "FARMACIA",
    acceptedMaterials: ["Frascos de Vidrio Angles", "Envases Doypack Angles"],
    schedule: "Lunes a Domingo de 08:00 a 22:00",
    lat: -17.7667,
    lng: -63.1952,
    status: "PROJECTION",
    verifiedPartner: false,
    notes: "Contacto inicial en curso."
  }
];

export const WASTE_GUIDE: WasteItem[] = [
  {
    id: "envases-angles",
    name: "Envases y Bolsas Angles Natural",
    category: "APROVECHABLES",
    commonExamples: "Doypacks de NutriQ, frascos ámbar, tapas y cucharas dosificadoras",
    whatToDo: "Enjuagar y secar. Entregar en puntos Angles Circular para acumular Eco-Puntos.",
    whatNotToDo: "No desechar mezclado con restos de comida húmeda.",
    anglesProgram: "Recolección directa garantizada por Angles Natural.",
    sourceNote: "Gestión circular interna con trazabilidad de lotes."
  },
  {
    id: "botellas-pet",
    name: "Botellas Plásticas Transparentes (PET #1)",
    category: "APROVECHABLES",
    commonExamples: "Botellas de agua y bebidas transparentes",
    whatToDo: "Vaciar, aplastar para reducir volumen y colocar con la tapa puesta en contenedor de reciclables.",
    whatNotToDo: "No introducir colillas de cigarrillo ni líquidos residuales.",
    anglesProgram: "Conexión con centros de reciclaje municipal y recolectores urbanos.",
    sourceNote: "Cadena de reciclaje mecánico consolidada en Bolivia."
  },
  {
    id: "carton-papel",
    name: "Cajas de Cartón y Papel Kraft",
    category: "APROVECHABLES",
    commonExamples: "Cajas de embalaje, cartón corrugado, bolsas de papel limpias",
    whatToDo: "Plegar para ocupar menor espacio y mantener secos.",
    whatNotToDo: "No incluir servilletas usadas, cajas engrasadas de pizza o papel encerado.",
    anglesProgram: "Reutilización en empaque secundario Angles y reciclaje papelero.",
    sourceNote: "El papel mojado o aceitado no puede reciclarse con fibra limpia."
  },
  {
    id: "restos-organicos",
    name: "Restos Orgánicos y Cáscaras",
    category: "ORGANICOS",
    commonExamples: "Cáscaras de fruta, verduras, restos de infusión, granos cocidos",
    whatToDo: "Disponer en compostera doméstica o contenedor de orgánicos.",
    whatNotToDo: "No mezclar con plásticos, vidrios o productos químicos.",
    anglesProgram: "Integración en proceso de compostaje de taller.",
    sourceNote: "Los orgánicos representan más del 55% de los residuos urbanos en Bolivia."
  },
  {
    id: "blister-medicamentos",
    name: "Blísters y Envases de Medicamentos Vencidos",
    category: "NO_APROVECHABLES",
    commonExamples: "Blísters metal-plástico fusionado, frascos con restos de antibióticos",
    whatToDo: "Entregar en puntos de recolección de farmacias o campañas de medicamentos vencidos.",
    whatNotToDo: "Nunca verter medicamentos por el inodoro o desagüe.",
    anglesProgram: "Guía preventiva de salud pública.",
    sourceNote: "Requiere disposición segura para evitar contaminación de acuíferos."
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: "socio-eco-la-paz",
    slug: "angles-lab-sopocachi",
    name: "Angles Natural Lab Sopocachi",
    businessType: "COMERCIO",
    city: "La Paz",
    description: "Sede central de formulación y punto de intercambio directo de envases.",
    acceptedMaterials: ["Envases Doypack", "Frascos de Vidrio", "Tapas PE/PP", "Scoops"],
    status: "APPROVED",
    joinedDate: "2026-01-15",
    collectionPointId: "punto-angles-central",
    impactContributionNotes: "Punto de trazabilidad principal."
  },
  {
    id: "socio-vitality-cbba",
    slug: "gimnasio-vitality-cochabamba",
    name: "Gimnasio Vitality",
    businessType: "COMERCIO",
    city: "Cochabamba",
    description: "Comunidad fitness aliada para la recuperación de envases proteicos.",
    acceptedMaterials: ["Envases Doypack Angles", "Scoops"],
    status: "APPROVED",
    joinedDate: "2026-03-01",
    collectionPointId: "punto-aliado-fit-cbba",
    impactContributionNotes: "Campaña de retorno entre atletas."
  }
];

export const INITIAL_EVENTS: CollectionEvent[] = [
  {
    id: "jornada-piloto-lapaz-01",
    title: "1ra Jornada Comunitaria de Retorno de Envases",
    date: "2026-10-18",
    time: "10:00 - 16:00",
    location: "Plaza Abaroa, Sopocachi",
    city: "La Paz",
    description: "Jornada educativa de retorno de envases Angles Natural, canje de Eco-Puntos y charla de separación consciente.",
    acceptedMaterials: ["Envases Angles", "Botellas PET limpias", "Cartón kraft"],
    status: "UPCOMING"
  }
];

export const INITIAL_CHALLENGES: SustainabilityChallenge[] = [
  {
    id: "reto-7-dias-sin-descartables",
    title: "7 Días de Consumo Consciente",
    durationDays: 7,
    category: "REDUCCIÓN",
    description: "Evita bolsas plásticas desechables y lleva tu bolsa reutilizable durante una semana completa.",
    instructions: [
      "Registra tu compromiso en la plataforma.",
      "Lleva bolsa de tela para tus compras diarias.",
      "Rechaza sorbetes y cubiertos plásticos descartables."
    ],
    pointsReward: 50,
    badgeName: "Brote Consciente",
    status: "ACTIVE"
  },
  {
    id: "reto-retorna-primer-envase",
    title: "Mi Primer Envase Circular",
    durationDays: 30,
    category: "CIRCULARIDAD",
    description: "Termina tu producto Angles Natural, limpia el envase y devuélvelo en cualquier punto aliado.",
    instructions: [
      "Vacía y lava el envase con agua.",
      "Llévalo al punto más cercano.",
      "Registra tu código de retorno con el encargado del punto."
    ],
    pointsReward: 100,
    badgeName: "Guardián de la Raíz",
    status: "ACTIVE"
  }
];

export const INITIAL_REWARDS: EcoPointReward[] = [
  {
    id: "rew-sachet-nutriq",
    name: "Sachet Muestra NutriQ (50g)",
    pointsCost: 150,
    category: "PRODUCTO",
    description: "Muestra individual de formulación funcional para probar o compartir.",
    status: "ACTIVE"
  },
  {
    id: "rew-descuento-15",
    name: "15% de Descuento en tu Próxima Recarga",
    pointsCost: 250,
    category: "DESCUENTO",
    description: "Cupón canjeable para comprar sin packaging secundario innecesario.",
    status: "ACTIVE"
  },
  {
    id: "rew-donacion-albergue",
    name: "Aporte Nutricional para Albergue de Rescate",
    pointsCost: 200,
    category: "DONACION_ALBERGUE",
    description: "Angles Natural dona un suplemento o ración a nombre tuyo para un refugio aliado.",
    status: "ACTIVE"
  }
];