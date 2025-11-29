
import React from 'react';
import { PodPromptsOutput, BundleProduct } from '../types';

interface PromptOutputDisplayProps {
  output: PodPromptsOutput | null;
}

const OutputSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-5 border-b border-gray-200 last:border-b-0">
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">{children}</div>
  </div>
);

const PromptOutputDisplay: React.FC<PromptOutputDisplayProps> = ({ output }) => {
  if (!output) {
    return (
      <div className="p-8 bg-white shadow-xl rounded-2xl flex justify-center items-center h-full min-h-[400px]">
        <p className="text-gray-500 text-xl font-medium">Esperando tus inputs para generar prompts...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Resultados Generados</h2>

      <OutputSection title="1) PROMPT PARA IMAGEN PRINCIPAL (PRINT READY)">
        {output.promptPrincipal}
      </OutputSection>

      <OutputSection title="2) PROMPT PARA VARIANTE A/B">
        <p className="font-semibold text-gray-800">Variante A:</p>
        <p>{output.varianteA}</p>
        <p className="mt-4 font-semibold text-gray-800">Variante B:</p>
        <p>{output.varianteB}</p>
      </OutputSection>

      <OutputSection title="3) PROMPT PARA VIDEO PROMOCIONAL (VENTAS)">
        {output.promptVideoPromocional}
      </OutputSection>

      <OutputSection title="4) PRODUCTOS COMPLEMENTARIOS (BUNDLE)">
        {output.productosComplementarios.map((product: BundleProduct, index: number) => (
          <div key={index} className="mb-3 last:mb-0">
            <p className="font-semibold text-gray-800">{product.name}:</p>
            <p className="text-gray-700 text-base">{product.designIdea}</p>
          </div>
        ))}
      </OutputSection>

      <OutputSection title="5) COPY CORTO PARA E-COMMERCE">
        <p className="font-semibold text-gray-800">Título:</p>
        <p>{output.copyEcommerce.titulo}</p>
        <p className="mt-4 font-semibold text-gray-800">Descripción:</p>
        <p>{output.copyEcommerce.descripcion}</p>
      </OutputSection>

      <OutputSection title="6) HASHTAGS">
        {output.hashtags.join(' ')}
      </OutputSection>
    </div>
  );
};

export default PromptOutputDisplay;