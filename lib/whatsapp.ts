export const WHATSAPP_CONFIG = {
  phoneNumber: "59170000000", // Central Angles Natural WhatsApp (Configurable)
  defaultGreeting: "Hola Angles Natural, quisiera recibir información sobre sus productos y formulaciones.",
};

export function getWhatsAppProductLink(productName: string, customMessage?: string): string {
  const text = customMessage || `Hola Angles Natural, quisiera consultar sobre la compra y disponibilidad de: ${productName}`;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedText}`;
}

export function getWhatsAppPartnerLink(partnerBusinessName: string): string {
  const text = `Hola Angles Natural, tengo interés en sumar mi negocio (${partnerBusinessName}) como Punto Aliado del programa Angles Circular.`;
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(text)}`;
}