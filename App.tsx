
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 drop-shadow-md">
          Print-On-Demand Prompt Wizard
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Genera prompts creativos y optimizados para tus productos POD.
        </p>
      </header>

      <main className="w-full max-w-7xl flex flex-col md:flex-row gap-6">
        <div className="md:flex-1">
          <PromptGeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
        <div className="md:flex-1 sticky top-4 self-start">
          <PromptOutputDisplay output={output} />
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        Desarrollado con ❤️ para la comunidad POD.
      </footer>
    </div>
  );
}

export default App;
