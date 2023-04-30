import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// components
import { PromptInput } from '../components/promptInput';

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">


      <div className='bg-slate-500 p-8 rounded-2xl'>
      <h1>que mas</h1>
      <PromptInput />
      </div>
     

    </div>
  );
}
