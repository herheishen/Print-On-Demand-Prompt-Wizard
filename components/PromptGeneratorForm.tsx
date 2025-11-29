
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
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg md:w-1/2 lg:w-1/3 mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Generador de Prompts POD</h2>
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof UserInput]}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof UserInput]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generando...' : 'Generar Prompts'}
      </button>
    </form>
  );
};

export default PromptGeneratorForm;
