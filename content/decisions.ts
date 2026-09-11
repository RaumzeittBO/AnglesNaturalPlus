export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  cost: number;
  effects: {
    nutrition: number;
    viability: number;
    sustainability: number;
    impact: number;
  };
  feedbackNote: string;
}

export interface DecisionStep {
  id: string;
  stepNumber: number;
  category: "EMPAQUE" | "INGREDIENTES" | "PRODUCCIÓN" | "LOGÍSTICA" | "IMPACTO";
  title: string;
  context: string;
  options: DecisionOption[];
}

export const DECISION_CHALLENGE: DecisionStep[] = [
  {
    id: "empaque",
    stepNumber: 1,
    category: "EMPAQUE",
    title: "Selección del Sistema de Empaque",
    context: "¿Cómo equilibrar la protección de la fórmula en polvo frente a la humedad sin generar residuos excesivos?",
    options: [
      {
        id: "opt-emp-a",
        label: "Multi-capa premium laminada tradicional",
        description: "Máxima protección y brillo comercial pero alta dificultad de reciclaje local.",
        cost: 20,
        effects: { nutrition: 5, viability: 15, sustainability: -15, impact: -5 },
        feedbackNote: "Priorizaste viabilidad comercial inmediata sobre la reciclabilidad de los materiales.",
      },
      {
        id: "opt-emp-b",
        label: "Monocapa optimizada con barrera reducida",
        description: "Menor masa plástica, simplifica reciclaje pero requiere mayor rotación de lote.",
        cost: 20,
        effects: { nutrition: 0, viability: 5, sustainability: 20, impact: 10 },
        feedbackNote: "Optaste por menor uso de material, asumiendo un control de caducidad más riguroso.",
      },
      {
        id: "opt-emp-c",
        label: "Fase de investigación de bio-polímeros locales",
        description: "Inversión en pruebas de laboratorio para validar materiales compostables antes de escalar.",
        cost: 25,
        effects: { nutrition: 0, viability: -5, sustainability: 25, impact: 20 },
        feedbackNote: "Elegiste el rigor científico: validar evidencia antes de hacer promesas ecológicas.",
      },
    ],
  },
  {
    id: "ingredientes",
    stepNumber: 2,
    category: "INGREDIENTES",
    title: "Abastecimiento de Materias Primas",
    context: "¿Cómo estructurar la cadena de suministro de granos andinos (Tarwi y Cañahua)?",
    options: [
      {
        id: "opt-ing-a",
        label: "Intermediarios mayoristas estándar",
        description: "Menor costo operativo y entrega rápida pero trazabilidad y pago al productor difusos.",
        cost: 15,
        effects: { nutrition: -5, viability: 20, sustainability: -10, impact: -15 },
        feedbackNote: "Bajas costos a corto plazo, pero sacrificas trazabilidad y desarrollo comunitario.",
      },
      {
        id: "opt-ing-b",
        label: "Alianza directa con asociaciones de productores locales",
        description: "Comercio justo, trazabilidad garantizada y control agronómico de calidad desde el origen.",
        cost: 25,
        effects: { nutrition: 15, viability: 0, sustainability: 15, impact: 25 },
        feedbackNote: "Fortaleces la economía local y garantizas la pureza y frescura del grano.",
      },
      {
        id: "opt-ing-c",
        label: "Modelo híbrido escalonado con capacitación agronómica",
        description: "Base mixta asegurando volumen mientras se co-desarrollan estándares de cosecha limpia.",
        cost: 20,
        effects: { nutrition: 10, viability: 10, sustainability: 10, impact: 15 },
        feedbackNote: "Equilibrio pragmático entre volumen operativo y crecimiento conjunto con productores.",
      },
    ],
  },
  {
    id: "produccion",
    stepNumber: 3,
    category: "PRODUCCIÓN",
    title: "Procesamiento y Eficiencia de Recursos",
    context: "¿Cómo abordar el consumo de agua y energía durante el desamargado del Tarwi y la molienda ultrafina?",
    options: [
      {
        id: "opt-prod-a",
        label: "Proceso tradicional con recirculación básica de agua",
        description: "Inversión moderada que permite iniciar operaciones con bajo riesgo financiero.",
        cost: 15,
        effects: { nutrition: 0, viability: 15, sustainability: -5, impact: 0 },
        feedbackNote: "Permite acelerar el lanzamiento pero deja pendiente la optimización hídrica profunda.",
      },
      {
        id: "opt-prod-b",
        label: "Circuito cerrado de desamargado con aprovechamiento de subproductos",
        description: "Recuperación de alcaloides del Tarwi para potenciales usos agrícolas y bio-insumos.",
        cost: 25,
        effects: { nutrition: 10, viability: -5, sustainability: 25, impact: 20 },
        feedbackNote: "Cierre de ciclos circulares de alto valor científico y ambiental.",
      },
    ],
  },
  {
    id: "logistica",
    stepNumber: 4,
    category: "LOGÍSTICA",
    title: "Distribución y Huella de Traslado",
    context: "¿Cómo conectar las áreas productivas de valles y llanos con los centros de consumo bolivianos?",
    options: [
      {
        id: "opt-log-a",
        label: "Envíos individuales bajo demanda punto a punto",
        description: "Flexibilidad máxima pero mayor consumo de transporte y embalaje secundario.",
        cost: 15,
        effects: { nutrition: 0, viability: 10, sustainability: -15, impact: -5 },
        feedbackNote: "Comodidad logística que incrementa la huella de embalaje y transporte.",
      },
      {
        id: "opt-log-b",
        label: "Nodos de distribución consolidada y retiro en puntos aliados",
        description: "Reducción de rutas fragmentadas y optimización del embalaje reutilizable.",
        cost: 20,
        effects: { nutrition: 0, viability: 5, sustainability: 15, impact: 10 },
        feedbackNote: "Distribución eficiente con menores recorridos y empaques secundarios optimizados.",
      },
    ],
  },
  {
    id: "impacto",
    stepNumber: 5,
    category: "IMPACTO",
    title: "Reinversión del Crecimiento Empresarial",
    context: "¿Hacia dónde orientar el margen positivo generado por la empresa conforme escale?",
    options: [
      {
        id: "opt-imp-a",
        label: "Fondo para bienestar animal y albergues de rescate",
        description: "Compromiso de Andrea con esterilizaciones, alimento funcional y apoyo veterinario.",
        cost: 20,
        effects: { nutrition: 0, viability: 0, sustainability: 10, impact: 30 },
        feedbackNote: "Devolver a seres vulnerables como parte del propósito ético de la compañía.",
      },
      {
        id: "opt-imp-b",
        label: "Reinversión integral en I+D farmacéutico boliviano",
        description: "Equipamiento de laboratorio propio para caracterización avanzada de superalimentos.",
        cost: 20,
        effects: { nutrition: 25, viability: 10, sustainability: 10, impact: 15 },
        feedbackNote: "Impulso directo a la soberanía científica y la innovación local.",
      },
    ],
  },
];