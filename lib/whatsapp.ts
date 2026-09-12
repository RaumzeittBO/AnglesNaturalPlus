export const WHATSAPP_CONFIG = {
  phoneNumber: "59176529243", // WhatsApp Oficial de Angles Natural (+591 76529243)
  defaultGreeting: "Hola Angles Natural, quisiera recibir información y asesoramiento sobre sus productos.",
};

export function getWhatsAppProductLink(productName: string, customMessage?: string): string {
  const text = customMessage || `Hola Angles Natural, quisiera consultar sobre la compra y disponibilidad de: ${productName}`;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedText}`;
}

export function getWhatsAppPartnerLink(partnerBusinessName?: string): string {
  const text = partnerBusinessName
    ? `Hola Angles Natural, tengo interés en sumar mi espacio (${partnerBusinessName}) como Punto Aliado en la próxima fase del programa Angles Circular.`
    : `Hola Angles Natural, quisiera información sobre el programa de Puntos Aliados y economía circular.`;
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(text)}`;
}