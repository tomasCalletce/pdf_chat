// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { error } from 'console';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from 'langchain';
import { RetrievalQAChain } from 'langchain/chains';
type Data = {
    msg: string,
};
const CONDENSE_PROMPT = `Dada la siguiente conversación y una pregunta de seguimiento, reformula la pregunta de seguimiento para que sea una pregunta independiente.
Pregunta de seguimiento: {pregunta}
Pregunta independiente:`;

const QA_PROMPT = `Eres un asistente de inteligencia artificial útil. Usa las siguientes piezas de contexto para responder a la pregunta al final.
Si no sabes la respuesta, solo di que no la sabes. NO trates de inventar una respuesta.
Si la pregunta no está relacionada con el contexto, responde cortésmente que estás programado para responder solo preguntas relacionadas con el contexto.
{contexto}
Pregunta: {pregunta}
Respuesta útil en formato markdown:`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const question = req.body.prompt;
        const loader = new PDFLoader("./cv/CV_JuanCamiloSalazar.pdf");

        const docs = await loader.load();
        // Load the docs into the vector store
        const vectorStore = await MemoryVectorStore.fromDocuments(
            docs,
            new OpenAIEmbeddings({
                openAIApiKey: "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",
            })
        );


        // Search for the most similar document
        // const resultOne = await vectorStore.similaritySearch("farmers", 1);

        // console.log(resultOne);
        const model = new OpenAI({
            openAIApiKey: "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",
            temperature: 0, // increase temepreature to get more creative answers
            modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
        });

        const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
        const response = await chain.call({
            query: question,
        });
        // console.log(response);
        res.status(200).json({ msg: response.text });
    }
    catch (e) {
        console.log(e);

        res.status(400).json({ msg: "error" });
    }
}
