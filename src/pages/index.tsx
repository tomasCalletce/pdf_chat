import axios from 'axios';

import { Inter } from 'next/font/google';
import { useRef, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

// components
import { PromptInput } from '../components/promptInput';
import { TextArea } from '../components/textArea';

export default function Home() {
  const promptRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (promptRef.current?.value === '' || !promptRef.current?.value) return;

    const prompt = promptRef.current?.value;
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/api/sendprompt',
        { prompt: prompt }
      );
      setResponse(response.data.msg);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-1/2">
        <h1 className="text-4xl mb-2 text-slate-200">
          PDF Inteligente: Potenciando tus archivos con IA
        </h1>
        <p className="mb-6 text-xl">
          Descubre el poder de tus archivos PDF con nuestra inteligencia
          artificial avanzada
        </p>
        <div className="bg-slate-500 p-8 rounded-2xl w-full mb-2">
          <PromptInput
            promptRef={promptRef}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
      <TextArea response={response} />
      <p className="text-gray-500 mt-2">made by juanc & tomas 🇨🇴</p>
    </div>
  );
}
