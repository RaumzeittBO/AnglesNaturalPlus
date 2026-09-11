export interface Ingredient {
  id: string;
  name: string;
  scientificName?: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  roleInNutriQ: string;
  originBadge: string;
  isProtagonist: boolean;
  color: string;
  accentColor: string;
  macroProfile: {
    protein: string;
    fiber: string;
    notes: string;
  };
  coordinates: { x: number; y: number };
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: "tarwi",
    name: "TARWI",
    scientificName: "Lupinus mutabilis",
    category: "Leguminosa Andina",
    shortDesc: "Ingrediente vegetal que forma parte de la exploración de NutriQ.",
    fullDesc: "Leguminosa ancestral de los valles y alturas andinas. Destaca históricamente por su elevada densidad proteica natural y su capacidad de fijar nitrógeno en el suelo de cultivo.",
    roleInNutriQ: "Núcleo vegetal proteico con perfil de aminoácidos complementario.",
    originBadge: "Valles y Altiplano Boliviano",
    isProtagonist: true,
    color: "#D9A84E",
    accentColor: "#F5D889",
    macroProfile: {
      protein: "Elevada concentración vegetal",
      fiber: "Rico en fibra dietética",
      notes: "Tradición andina en proceso de valorización científica.",
    },
    coordinates: { x: 38, y: 44 },
  },
  {
    id: "canahua",
    name: "CAÑAHUA",
    scientificName: "Chenopodium pallidicaule",
    category: "Grano Andino",
    shortDesc: "Un ingrediente que conecta nutrición, identidad e innovación.",
    fullDesc: "Grano andino resistente a condiciones climáticas extremas del altiplano. Contiene antioxidantes naturales, minerales esenciales y fibra soluble de alta asimilación.",
    roleInNutriQ: "Aporte de micronutrientes, digestibilidad y consistencia natural.",
    originBadge: "Altiplano Central & Occidental",
    isProtagonist: true,
    color: "#B46543",
    accentColor: "#E09B7C",
    macroProfile: {
      protein: "Perfil de aminoácidos balanceado",
      fiber: "Excelente contenido de fibra",
      notes: "Cultivo resiliente con gran arraigo cultural boliviano.",
    },
    coordinates: { x: 32, y: 52 },
  },
  {
    id: "arveja",
    name: "ARVEJA",
    scientificName: "Pisum sativum",
    category: "Leguminosa Funcional",
    shortDesc: "Una fuente vegetal que complementa la formulación que estamos explorando.",
    fullDesc: "Proteína vegetal ampliamente reconocida por su excelente solubilidad, perfil hipoalergénico y sinergia nutricional con granos andinos.",
    roleInNutriQ: "Equilibrio organoléptico, textura sedosa y balance de lisina.",
    originBadge: "Valles Productivos",
    isProtagonist: true,
    color: "#5C8C46",
    accentColor: "#8FC774",
    macroProfile: {
      protein: "Alta solubilidad y digestibilidad",
      fiber: "Bajo residuo",
      notes: "Permite una disolución homogénea sin necesidad de espesantes artificiales.",
    },
    coordinates: { x: 50, y: 62 },
  },
  {
    id: "crema-arroz",
    name: "CREMA DE ARROZ",
    scientificName: "Oryza sativa extract",
    category: "Carbohidrato Complejo Suave",
    shortDesc: "Aporte energético de asimilación progresiva y textura delicada.",
    fullDesc: "Base de carbohidratos de fácil digestión que actúa como vehículo estabilizador natural para la mezcla proteica.",
    roleInNutriQ: "Sensación en boca, solubilidad instantánea y energía gradual.",
    originBadge: "Tierras Bajas / Llanos",
    isProtagonist: false,
    color: "#D6C6A5",
    accentColor: "#FAF6ED",
    macroProfile: {
      protein: "Complemento suave",
      fiber: "Muy baja reactividad digestiva",
      notes: "Confiere estabilidad coloidal a la suspensión.",
    },
    coordinates: { x: 68, y: 48 },
  },
  {
    id: "vitaminas",
    name: "MIX DE VITAMINAS",
    scientificName: "Complejo Micronutricional",
    category: "Micronutrientes Científicos",
    shortDesc: "Complejo equilibrado para respaldar el metabolismo celular activo.",
    fullDesc: "Combinación calibrada en laboratorio con base en requerimientos de absorción diaria, optimizada por la perspectiva bioquímica farmacéutica.",
    roleInNutriQ: "Optimización metabólica y valor funcional integral.",
    originBadge: "Formulación Farmacéutica",
    isProtagonist: false,
    color: "#2D8A63",
    accentColor: "#62C498",
    macroProfile: {
      protein: "Micronutrientes catalizadores",
      fiber: "Bioaccesibilidad dirigida",
      notes: "Calibración farmacéutica de micronutrientes.",
    },
    coordinates: { x: 56, y: 35 },
  },
];