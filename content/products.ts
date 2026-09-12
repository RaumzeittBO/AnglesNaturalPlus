export interface PackagingComponent {
  name: string;
  material: string;
  disposalAdvice?: string;
  anglesCollects?: boolean;
  recyclingPartner?: string;
  transparencyNote?: string;
  component?: string;
  classification?: string;
  instructions?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  category: "PROTEÍNAS FUNCIONALES" | "SUPLEMENTOS DIARIOS" | "BIENESTAR BOTÁNICO" | "suplementos" | "funcionales" | "bienestar" | string;
  shortDesc?: string;
  shortDescription?: string;
  fullDesc?: string;
  description?: string;
  presentation: string;
  priceBs?: number;
  priceBob?: number;
  ingredients: string[];
  usageInstructions?: string;
  benefits?: string[];
  cautions?: string;
  status?: "CURRENT" | "IN_DEVELOPMENT" | "CONCEPT" | string;
  active?: boolean;
  featured?: boolean;
  order?: number;
  image?: string;
  badge?: string;
  packagingPassport: PackagingComponent[];
}

export const PRODUCTS: Product[] = [
  {
    id: "microbiota",
    slug: "microbiota",
    name: "MICROBIOTA",
    tagline: "Equilibrio que comienza desde adentro.",
    category: "SALUD DIGESTIVA & PROBIÓTICOS",
    shortDesc: "Es un suplemento con probióticos + glutamina + FOS que ayuda a restaurar tu flora intestinal y mejorar la digestión.",
    fullDesc: "MICROBIOTA de Angles Natural es una fórmula integral en polvo diseñada por la bioquímica Andrea Angles para restaurar, regenerar y equilibrar la flora intestinal. Combina probióticos activos (Lactobacilos vivos) con prebióticos FOS y L-Glutamina, nutriendo el epitelio intestinal para optimizar la asimilación digestiva y fortalecer las defensas naturales.",
    presentation: "Caja de 10 Sobres (6g c/u)",
    priceBs: 170,
    ingredients: [
      "FOS Prebiótico (Fructooligosacáridos)",
      "Lactobacilos vivos (Probióticos activos)",
      "L-Glutamina pura (Apoyo nutricional y barrera epitelial)",
      "Excipientes naturales solubles sin azúcares añadidos"
    ],
    usageInstructions: "Disolver 1 sobre (6g) al día en un vaso con 200 ml de agua a temperatura ambiente. Consumir preferentemente por las mañanas o antes de la comida principal.",
    cautions: "Suplemento alimenticio funcional. Conservar en lugar fresco, seco y protegido de la luz solar. No mezclar con líquidos hirviendo para preservar los probióticos vivos.",
    status: "CURRENT",
    featured: true,
    order: 1,
    image: "/products/microbiota.jpg",
    badge: "Probiótico + Glutamina + FOS",
    packagingPassport: [
      {
        name: "Sobres Individuales de 6g",
        material: "Laminado monocapa de alta barrera termosellado",
        disposalAdvice: "Vaciar completamente y guardar secos para retorno en puntos Angles.",
        anglesCollects: true,
        recyclingPartner: "Programa Angles Circular",
        transparencyNote: "Barrera protectora frente al oxígeno y humedad que garantiza la viabilidad de los lactobacilos sin necesidad de refrigeración."
      },
      {
        name: "Caja Exterior",
        material: "Cartón certificado FSC 100% reciclable",
        disposalAdvice: "Plegar y colocar en el contenedor de reciclables secos o retornar.",
        anglesCollects: true,
        transparencyNote: "Impresión con tintas de base vegetal sin plastificados no separables."
      }
    ]
  },
  {
    id: "artromag",
    slug: "artromag",
    name: "ARTROMAG",
    tagline: "Movimiento que te acompaña.",
    category: "SALUD ARTICULAR & REGENERACIÓN",
    shortDesc: "Es un suplemento para cuidar y regenerar las articulaciones. Contiene: colágeno hidrolizado, ácido hialurónico, magnesio, silicio, manganeso, condroprotectores y vitaminas.",
    fullDesc: "ARTROMAG es la solución avanzada de suplementación funcional de Angles Natural para proteger, nutrir y regenerar las articulaciones. Diseñado con una potente sinergia de Colágeno Hidrolizado bioasimilable, Ácido Hialurónico de máxima pureza, Magnesio quelado, Silicio orgánico, Manganeso, Condroprotectores activos y Vitaminas para una vida más activa y sin molestias.",
    presentation: "Caja de 30 Sobres (6g c/u)",
    priceBs: 320,
    ingredients: [
      "Colágeno Hidrolizado bioasimilable de alta pureza",
      "Ácido Hialurónico de alto peso molecular",
      "Magnesio quelado biodisponible",
      "Silicio orgánico & Manganeso mineral",
      "Condroprotectores articulares activos",
      "Complejo multivitamínico de soporte celular"
    ],
    usageInstructions: "Disolver 1 sobre (6g) al día en 200 a 250 ml de agua, jugo natural o infusión tibia. Tomar diariamente de forma continua para óptima salud articular.",
    cautions: "Alimento complementario funcional. Mantener cerrado en lugar fresco y seco. Ideal para adultos activos, deportistas y personas con desgaste articular.",
    status: "CURRENT",
    featured: true,
    order: 2,
    image: "/products/artromag.jpg",
    badge: "Colágeno + Ácido Hialurónico + Magnesio",
    packagingPassport: [
      {
        name: "Sobres Individuales de 6g",
        material: "Polímero técnico de barrera hidrofóbica",
        disposalAdvice: "Entregar limpios y secos en puntos de recolección de Angles.",
        anglesCollects: true,
        transparencyNote: "Dosis unitaria hermética que previene la degradación por apertura diaria."
      },
      {
        name: "Caja Contenedora de 30 Sobres",
        material: "Cartulina kraft reciclable",
        disposalAdvice: "Plegar y depositar en reciclables secos o devolver en puntos de acopio.",
        anglesCollects: true,
        transparencyNote: "Empaque diseñado con optimización de gramaje y sin barnices contaminantes."
      }
    ]
  },
  {
    id: "kit-cuidado-mascotas",
    slug: "kit-cuidado-mascotas",
    name: "KIT DE CUIDADO PARA MASCOTAS",
    tagline: "Todo lo que tu peludito necesita para mantenerse limpio, fresco e hidratado, en un solo kit.",
    category: "BIENESTAR & CUIDADO ANIMAL",
    shortDesc: "Cuidado natural para su gran compañía. Todo lo que tu peludito necesita para mantenerse limpio, fresco e hidratado, en un solo kit de 4 piezas.",
    fullDesc: "El Kit de Cuidado para Mascotas de Angles Natural reúne 4 productos botánicos formulados especialmente para perros y gatos con ingredientes suaves, seguros y dermatológicamente respetuosos:\n\n1. Jabón de Avena y Miel: Limpieza suave y agradable que cuida la piel.\n2. Perfume para después del baño: Un toque fresco y delicioso sin alcohol.\n3. PetClean (Shampoo en Seco): Limpia patitas, colitas y pelaje sin necesidad de agua.\n4. Bálsamo Multizona: Hidrata y repara almohadillas y nariz seca.\n\nEllos también merecen sentirse limpios, frescos y consentidos todos los días.",
    presentation: "Kit Completo de 4 Piezas (Jabón, Perfume, PetClean, Bálsamo)",
    priceBs: 120,
    ingredients: [
      "Jabón artesanal enriquecido con Avena coloidal y Miel pura",
      "Perfume botánico suave sin alcohol para perros y gatos",
      "PetClean: Loción limpiadora en seco dermoprotectora",
      "Bálsamo Multizona: Mantecas vegetales puras regeneradoras de almohadillas y trufa"
    ],
    usageInstructions: "• Jabón: Usar en el baño con agua tibia y masajear suavemente. • Perfume: Rociar a 15 cm sobre el lomo tras el secado. • PetClean: Rociar en patitas o paño limpio para limpiar tras paseos. • Bálsamo: Aplicar con la yema de los dedos en almohadillas y nariz.",
    cautions: "Uso veterinario cosmético tópico externo. Apto para perros y gatos de todas las edades y razas. Evitar el contacto directo con los ojos.",
    status: "CURRENT",
    featured: true,
    order: 3,
    image: "/products/kit-mascotas.jpg",
    badge: "Kit 4 en 1 para Perros & Gatos",
    packagingPassport: [
      {
        name: "Frascos Spray (Perfume y PetClean)",
        material: "PET transparente reciclable con válvula spray PP",
        disposalAdvice: "Enjuagar y entregar en puntos Angles para recarga o reciclaje.",
        anglesCollects: true,
        transparencyNote: "Frascos reusables diseñados para futuras recargas a granel."
      },
      {
        name: "Pote de Bálsamo Multizona",
        material: "Polipropileno (PP #5) con tapa rosca hermética",
        disposalAdvice: "Limpiar y entregar en puntos de retorno Angles.",
        anglesCollects: true,
        transparencyNote: "Material 100% recuperable en plantas de transformación locales."
      },
      {
        name: "Empaque de Jabón en Barra",
        material: "Banda de papel kraft biodegradable",
        disposalAdvice: "Compostable en jardín doméstico o contenedor de papel.",
        anglesCollects: true,
        transparencyNote: "Presentación sólida con cero plástico envolvente."
      }
    ]
  }
];