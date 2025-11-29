
import React from 'react';
import { UserInput } from '../types';

interface PromptGeneratorFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
}

const PromptGeneratorForm: React.FC<PromptGeneratorFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<UserInput>({
    producto: '',
    estiloVisual: '',
    buyerPersona: '',
    emocionPrincipal: '',
    coloresClave: '',
    mercadoObjetivo: '',
    tecnicaImpresion: '',
    plataformaPrincipal: '',
    ideaBase: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fields = [
    { label: 'Producto (ej. hoodie / taza)', name: 'producto', type: 'text' },
    { label: 'Estilo visual (ej. cubano retro, luxury gold)', name: 'estiloVisual', type: 'text' },
    { label: 'Buyer persona (edad + gustos + comportamiento de compra)', name: 'buyerPersona', type: 'textarea' },
    { label: 'Emoción principal (ej. deseo, humor, nostalgia, premium)', name: 'emocionPrincipal', type: 'text' },
    { label: 'Colores clave (hex o referencias)', name: 'coloresClave', type: 'text' },
    { label: 'Mercado objetivo (país / región / ciudad)', name: 'mercadoObjetivo', type: 'text' },
    { label: 'Técnica de impresión (sublimación / DTG / UV)', name: 'tecnicaImpresion', type: 'text' },
    { label: 'Plataforma principal (Shopify / TikTok / Instagram)', name: 'plataformaPrincipal', type: 'text' },
    { label: 'Idea base (1 frase corta sobre el concepto)', name: 'ideaBase', type: 'textarea' },
  ];

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Generador de Prompts</h2>
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-base font-semibold text-gray-700 mb-2">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof UserInput]}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-base resize-y"
              required
            ></textarea>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof UserInput]}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-base"
              required
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
      >
        {isLoading ? 'Generando...' : 'Generar Prompts'}
      </button>
    </form>
  );
};

export default PromptGeneratorForm;