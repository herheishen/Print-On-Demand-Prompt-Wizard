
import React from 'react';
import { PodPromptsOutput, BundleProduct, CopyEcommerce } from '../types';

interface PromptOutputDisplayProps {
  output: PodPromptsOutput | null;
}

const OutputSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="text-gray-800 text-sm md:text-base whitespace-pre-wrap">{children}</div>
  </div>
);

const PromptOutputDisplay: React.FC<PromptOutputDisplayProps> = ({ output }) => {
  if (!output) {
    return (
      <div className="flex justify-center items-center h-full p-4 md:w-1/2 lg:w-2/3">
        <p className="text-gray-500 text-lg">Esperando tus inputs para generar prompts...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg md:w-1/2 lg:w-2/3 mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultados Generados</h2>

      <OutputSection title="1) PROMPT PARA IMAGEN PRINCIPAL (PRINT READY)">
        {output.promptPrincipal}
      </OutputSection>

      <OutputSection title="2) PROMPT PARA VARIANTE A/B">
        <p className="font-medium">Variante A:</p>
        <p>{output.varianteA}</p>
        <p className="mt-3 font-medium">Variante B:</p>
        <p>{output.varianteB}</p>
      </OutputSection>

      <OutputSection title="3) PROMPT PARA VIDEO PROMOCIONAL (VENTAS)">
        {output.promptVideoPromocional}
      </OutputSection>

      <OutputSection title="4) PRODUCTOS COMPLEMENTARIOS (BUNDLE)">
        {output.productosComplementarios.map((product: BundleProduct, index: number) => (
          <div key={index} className="mb-2 last:mb-0">
            <p className="font-medium">{product.name}:</p>
            <p className="text-gray-700 text-sm md:text-base">{product.designIdea}</p>
          </div>
        ))}
      </OutputSection>

      <OutputSection title="5) COPY CORTO PARA E-COMMERCE">
        <p className="font-medium">Título:</p>
        <p>{output.copyEcommerce.titulo}</p>
        <p className="mt-3 font-medium">Descripción:</p>
        <p>{output.copyEcommerce.descripcion}</p>
      </OutputSection>

      <OutputSection title="6) HASHTAGS">
        {output.hashtags.join(' ')}
      </OutputSection>
    </div>
  );
};

export default PromptOutputDisplay;
