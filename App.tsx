
import React, { useState } from 'react';
import PromptGeneratorForm from './components/PromptGeneratorForm';
import PromptOutputDisplay from './components/PromptOutputDisplay';
import { UserInput, PodPromptsOutput } from './types';
import { generatePodPrompts } from './services/podPromptService';

function App() {
  const [output, setOutput] = useState<PodPromptsOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = (input: UserInput) => {
    setIsLoading(true);
    // Simulate API call or heavy processing if needed, though this is synchronous
    setTimeout(() => {
      const generatedOutput = generatePodPrompts(input);
      setOutput(generatedOutput);
      setIsLoading(false);
    }, 500); // Small delay to show loading state
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <header className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
          POD Prompt Wizard
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Genera prompts creativos y optimizados para tus productos Print-On-Demand.
        </p>
      </header>

      <main className="w-full max-w-7xl flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="md:flex-1">
          <PromptGeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
        <div className="md:flex-1">
          <PromptOutputDisplay output={output} />
        </div>
      </main>

      <footer className="mt-20 text-center text-gray-500 text-base">
        Desarrollado con ❤️ para la comunidad Herheishen.
      </footer>
    </div>
  );
}

export default App;