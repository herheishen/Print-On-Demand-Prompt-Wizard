import { PodPromptsOutput, UserInput, BundleProduct, CopyEcommerce } from '../types';

const NEGATIVE_RULES = 'no text, no watermark, no signature, no blurry, no busy background, no distorted anatomy, no low contrast';
const PRINT_PARAMETERS = '4500x5400px, 300DPI';

/**
 * Generates the main print-ready image prompt.
 */
function generatePromptPrincipal(input: UserInput): string {
  const { ideaBase, estiloVisual, coloresClave, producto } = input;
  const dynamicPart = `Un ${ideaBase} con un estilo ${estiloVisual}, fondo abstracto premium degradado, paleta de colores: ${coloresClave}, enfoque comercial de alto impacto para ${producto}.`;
  
  const prompt = `${dynamicPart} ${NEGATIVE_RULES}, ${PRINT_PARAMETERS}`;
  return prompt.substring(0, Math.min(prompt.length, 260)); // Ensure length limit
}

/**
 * Generates prompt variant A, adjusted for trend/platform.
 */
function generateVarianteA(input: UserInput): string {
  const { ideaBase, estiloVisual, coloresClave, producto, plataformaPrincipal } = input;
  let dynamicPart = `Un ${ideaBase} dinámico, con efectos de luz vibrantes en estilo ${estiloVisual}, ideal para ${plataformaPrincipal}, paleta con acentos brillantes de ${coloresClave}, diseño moderno para ${producto}.`;
  
  const prompt = `${dynamicPart} ${NEGATIVE_RULES}, ${PRINT_PARAMETERS}`;
  return prompt.substring(0, Math.min(prompt.length, 260)); // Ensure length limit
}

/**
 * Generates prompt variant B, adjusted for buyer persona/colors.
 */
function generateVarianteB(input: UserInput): string {
  const { ideaBase, estiloVisual, coloresClave, producto, buyerPersona, emocionPrincipal } = input;
  let dynamicPart = `Un ${ideaBase} expresivo que evoca ${emocionPrincipal}, con detalles sutiles en estilo ${estiloVisual}, para ${buyerPersona}, paleta refinada de ${coloresClave}, arte único para ${producto}.`;

  const prompt = `${dynamicPart} ${NEGATIVE_RULES}, ${PRINT_PARAMETERS}`;
  return prompt.substring(0, Math.min(prompt.length, 260)); // Ensure length limit
}

/**
 * Generates the promotional video prompt.
 */
function generatePromptVideoPromocional(input: UserInput): string {
  const { producto, ideaBase, emocionPrincipal } = input;
  const hook = `Hook: ¿Listo para llevar tu ${producto} al siguiente nivel?`;
  const scene1 = `Escena 1: Primer plano del ${producto} con diseño ${ideaBase}.`;
  const scene2 = `Escena 2: Modelo usando el ${producto} casualmente.`;
  const scene3 = `Escena 3: Zoom en los detalles clave del diseño.`;
  const emotion = `Emoción dominante: ${emocionPrincipal}.`;
  const cta = `CTA: Compra ahora y destaca.`;

  const prompt = `${hook} ${scene1} ${scene2} ${scene3} ${emotion} ${cta} Formato vertical 9:16.`;
  return prompt.substring(0, Math.min(prompt.length, 280)); // Ensure length limit
}

/**
 * Generates complementary products for a bundle.
 */
function generateProductosComplementarios(input: UserInput): BundleProduct[] {
  const { producto, ideaBase, estiloVisual } = input;
  const allProducts = ["taza", "pegatina", "funda de móvil", "bolsa tote", "libreta", "calcetines"];
  const compatibleProducts = allProducts.filter(p => p !== producto).slice(0, 3); // Get 3 distinct products

  return compatibleProducts.map(p => ({
    name: p.charAt(0).toUpperCase() + p.slice(1),
    designIdea: `Diseño minimalista o a juego de ${ideaBase} en estilo ${estiloVisual}, ideal para complementar tu ${producto}.`
  }));
}

/**
 * Generates e-commerce copy (title and description).
 */
function generateCopyEcommerce(input: UserInput): CopyEcommerce {
  const { producto, ideaBase, estiloVisual, emocionPrincipal } = input;
  const title = `${emocionPrincipal.toUpperCase()} | ${producto} ${ideaBase} ${estiloVisual}`.substring(0, 55);
  const description = `Eleva tu estilo con este ${producto} único. Presenta el diseño de ${ideaBase} en un vibrante estilo ${estiloVisual}. Expresa tu ${emocionPrincipal} y destaca.`.substring(0, 160);
  return { titulo: title, descripcion: description };
}

/**
 * Generates relevant hashtags.
 */
function generateHashtags(input: UserInput): string[] {
  // Fix: Add ideaBase to destructuring to resolve "Cannot find name 'ideaBase'" error.
  const { producto, estiloVisual, buyerPersona, emocionPrincipal, mercadoObjetivo, plataformaPrincipal, ideaBase } = input;
  const keywords = [
    producto.replace(/\s/g, ''),
    estiloVisual.replace(/\s/g, ''),
    emocionPrincipal.replace(/\s/g, ''),
    mercadoObjetivo.split(' ')[0], // First word of market
    plataformaPrincipal.replace(/\s/g, ''),
  ].map(tag => `#${tag}`);

  // Add some buyer persona related hashtags
  if (buyerPersona.toLowerCase().includes('gamer')) keywords.push('#GamerStyle');
  if (buyerPersona.toLowerCase().includes('vintage')) keywords.push('#RetroVibes');
  if (buyerPersona.toLowerCase().includes('joven')) keywords.push('#ModaJoven');

  const ideaBaseWords = ideaBase.split(' ').map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}`);
  
  const uniqueHashtags = Array.from(new Set([...keywords, ...ideaBaseWords]))
    .filter(tag => tag.length > 2 && tag.length < 25) // Filter for reasonable length
    .slice(0, 12); // Max 12 hashtags

  return uniqueHashtags;
}

/**
 * Main function to generate all POD prompts and related content.
 */
export function generatePodPrompts(input: UserInput): PodPromptsOutput {
  return {
    promptPrincipal: generatePromptPrincipal(input),
    varianteA: generateVarianteA(input),
    varianteB: generateVarianteB(input),
    promptVideoPromocional: generatePromptVideoPromocional(input),
    productosComplementarios: generateProductosComplementarios(input),
    copyEcommerce: generateCopyEcommerce(input),
    hashtags: generateHashtags(input),
  };
}