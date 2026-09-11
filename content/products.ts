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
    id: "nutriq-functional",
    slug: "nutriq-proteina-funcional",
    name: "NutriQ — Proteína Funcional",
    tagline: "Formulación vegetal andina con Tarwi, Cañahua y Arveja",
    category: "PROTEÍNAS FUNCIONALES",
    shortDesc: "Proteína vegetal funcional desarrollada desde la bioquímica boliviana para un perfil de aminoácidos completo y digestibilidad superior.",
    fullDesc: "NutriQ es el concepto central de suplementación de Angles Natural. Integra la densidad proteica del Tarwi desamargado, los micronutrientes resilientes de la Cañahua y la solubilidad de la Arveja, enriquecida con un complejo de vitaminas calibrado.",
    presentation: "Doypack monocapa de 500 g en polvo (20 porciones)",
    priceBs: 160,
    ingredients: [
      "Aislado proteico de Tarwi (Lupinus mutabilis)",
      "Harina micropulverizada de Cañahua (Chenopodium pallidicaule)",
      "Proteína vegetal de Arveja (Pisum sativum)",
      "Crema de arroz suave como estabilizante",
      "Mix vitamínico B1, B6, B12, C y Zinc quelado"
    ],
    usageInstructions: "Disolver 25 g (1 scoop dosificador) en 250 ml de agua, leche vegetal o batido. Consumir preferentemente después de la actividad física o como refuerzo matutino.",
    cautions: "Alimento complementario funcional. No sustituye una dieta equilibrada. Mantener en lugar fresco, seco y al abrigo de la luz directa.",
    status: "IN_DEVELOPMENT",
    featured: true,
    order: 1,
    image: "/brand/logo.png",
    badge: "Concepto en Formulación",
    packagingPassport: [
      {
        name: "Bolsa Doypack Exterior",
        material: "Polietileno monocapa de alta barrera",
        disposalAdvice: "Vaciar completamente y enjuagar con agua limpia. Entregar seco.",
        anglesCollects: true,
        recyclingPartner: "Programa Angles Circular",
        transparencyNote: "Optimizamos el espesor para prescindir de aluminio laminado difícil de reciclar."
      },
      {
        name: "Cierre Zip Hermético",
        material: "PE integrado al cuerpo del empaque",
        disposalAdvice: "No retirar; se procesa junto con la estructura de la bolsa.",
        anglesCollects: true,
        transparencyNote: "Monomaterial compatible con reciclaje mecánico estándar."
      },
      {
        name: "Cuchara Dosificadora (Scoop)",
        material: "Polipropileno reciclable (PP #5)",
        disposalAdvice: "Reutilizable indefinidamente o devolver en puntos Angles.",
        anglesCollects: true,
        transparencyNote: "Fomentamos la compra sin scoop en recargas posteriores para evitar plásticos repetidos."
      }
    ]
  },
  {
    id: "vital-andean-mix",
    slug: "vital-mix-granos-andinos",
    name: "VitalMix — Complejo de Micronutrientes",
    tagline: "Concentrado andino de antioxidantes y minerales biodisponibles",
    category: "SUPLEMENTOS DIARIOS",
    shortDesc: "Mezcla funcional concentrada de Cañahua y germinados para revitalización celular y soporte inmunológico.",
    fullDesc: "Formulado para personas activas que buscan nutrientes de alta biodisponibilidad sin aditivos sintéticos. Aporta hierro vegetal, magnesio, fósforo y polifenoles bioactivos.",
    presentation: "Frasco ámbar de 250 g en polvo",
    priceBs: 110,
    ingredients: [
      "Concentrado soluble de Cañahua tostada a baja temperatura",
      "Cúrcuma boliviana micro-micronizada",
      "Ácido ascórbico (Vitamina C pura)",
      "Citrato de magnesio"
    ],
    usageInstructions: "Mezclar 1 cucharadita (5 g) al día en agua tibia, infusión o jugo natural.",
    cautions: "Consérvese cerrado en lugar fresco. Consulte a su médico o nutricionista ante requerimientos especiales.",
    status: "IN_DEVELOPMENT",
    featured: true,
    order: 2,
    image: "/brand/logo.png",
    badge: "En Investigación",
    packagingPassport: [
      {
        name: "Frasco Contenedor",
        material: "Vidrio ámbar farmacéutico 100% reciclable",
        disposalAdvice: "Enjuagar y devolver con su tapa para esterilización y reuso.",
        anglesCollects: true,
        recyclingPartner: "Vidrio local y reuso directo Angles",
        transparencyNote: "El vidrio ámbar ofrece la mayor protección UV para los polifenoles bioactivos."
      },
      {
        name: "Tapa a Rosca",
        material: "Aluminio lacado reciclable",
        disposalAdvice: "Devolver en puntos de acopio limpios.",
        anglesCollects: true,
        transparencyNote: "Fácilmente separable para reciclaje metalúrgico."
      },
      {
        name: "Etiqueta Adhesiva",
        material: "Papel FSC con adhesivo al agua hidrosoluble",
        disposalAdvice: "Se desprende fácilmente durante el lavado de botellas.",
        anglesCollects: true,
        transparencyNote: "Evita solventes tóxicos en el proceso de lavado."
      }
    ]
  },
  {
    id: "botanical-infusion-rest",
    slug: "serena-infusion-botanica",
    name: "Serena — Elixir Botánico Reparador",
    tagline: "Infusión botánica para descanso nocturno y recuperación neuromuscular",
    category: "BIENESTAR BOTÁNICO",
    shortDesc: "Sinergia de hierbas medicinales de los valles bolivianos y magnesio para optimizar la regeneración durante el sueño.",
    fullDesc: "El descanso de calidad es el pilar olvidado del rendimiento y el bienestar. Serena combina Cedrón, Toronjil, Manzanilla orgánica de altura y magnesio elemental.",
    presentation: "Caja de 20 pirámides biodegradables",
    priceBs: 75,
    ingredients: [
      "Cedrón orgánico (Aloysia citrodora)",
      "Toronjil (Melissa officinalis)",
      "Manzanilla de altura (Matricaria chamomilla)",
      "Glicinato de magnesio"
    ],
    usageInstructions: "Infundir una pirámide en 200 ml de agua a 90°C durante 5 a 7 minutos antes de dormir.",
    cautions: "Apto para adultos. No recomendado durante el embarazo sin consulta previa.",
    status: "CONCEPT",
    featured: false,
    order: 3,
    image: "/brand/logo.png",
    badge: "Visión Futura",
    packagingPassport: [
      {
        name: "Pirámides Filtrantes",
        material: "Fibra de maíz PLA 100% compostable industrialmente",
        disposalAdvice: "Disponer en compost orgánico o contenedor de orgánicos.",
        anglesCollects: true,
        transparencyNote: "Libres de microplásticos y blanqueadores con cloro."
      },
      {
        name: "Caja Exterior",
        material: "Cartulina kraft reciclada sin barnices plásticos",
        disposalAdvice: "Plegar y depositar en reciclables secos.",
        anglesCollects: true,
        transparencyNote: "Impresión con tintas de base vegetal."
      }
    ]
  }
];