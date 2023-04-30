import { Inter } from 'next/font/google';
import axios from 'axios';
import { useRef } from 'react';
const inter = Inter({ subsets: ['latin'] });

// components
import { PromptInput } from '../components/promptInput';
import { TextArea } from '../components/textArea';

export default function Home() {
  const prompt = useRef("");

  const sendPrompt = async () => {
    try {
      const res = await axios.post("/api/upload", {
        prompt: prompt?.current,
      });
      console.log(res.data); // do something with response data
    } catch (error) {
      console.error(error); // handle error
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className='w-1/2'>
        <h1 className="text-4xl mb-2 text-slate-200">
          PDF Inteligente: Potenciando tus archivos con IA
        </h1>
        <p className="mb-6 text-xl">
          Descubre el poder de tus archivos PDF con nuestra inteligencia
          artificial avanzada
        </p>
        <div className="bg-slate-500 p-8 rounded-2xl w-full mb-2">
          <PromptInput />
        </div>
       
      </div>
      <TextArea/>
      <p className="text-gray-500 mt-2">made by juanc & tomas 🇨🇴</p>
    </div>
  );
}
