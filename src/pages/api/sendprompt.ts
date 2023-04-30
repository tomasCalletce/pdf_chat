// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain';
import { RetrievalQAChain } from 'langchain/chains';

type Data = {
  msg: string;
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const prompt = req.body.prompt;

    const loader = new PDFLoader('./cv/CV_JuanCamiloSalazar.pdf');

    const docs = await loader.load();

    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        openAIApiKey: OPENAI_API_KEY,
      })
    );
    const model = new OpenAI({
      openAIApiKey: OPENAI_API_KEY,
      temperature: 0, // increase temepreature to get more creative answers
      modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    });

    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    const response = await chain.call({
      query: prompt,
    });

    res.status(200).json({ msg: response.text });
  } catch (e) {
    console.log(e);

    res.status(400).json({ msg: 'error' });
  }
}
