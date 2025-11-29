
export interface UserInput {
  producto: string;
  estiloVisual: string;
  buyerPersona: string;
  emocionPrincipal: string;
  coloresClave: string;
  mercadoObjetivo: string;
  tecnicaImpresion: string;
  plataformaPrincipal: string;
  ideaBase: string;
}

export interface BundleProduct {
  name: string;
  designIdea: string;
}

export interface CopyEcommerce {
  titulo: string;
  descripcion: string;
}

export interface PodPromptsOutput {
  promptPrincipal: string;
  varianteA: string;
  varianteB: string;
  promptVideoPromocional: string;
  productosComplementarios: BundleProduct[];
  copyEcommerce: CopyEcommerce;
  hashtags: string[];
}
