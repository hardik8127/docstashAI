import { Worker } from "bullmq";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from "dotenv";

dotenv.config();

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log(`Job:`, job.data);
    const data = JSON.parse(job.data);
    // path: data.path
    // read the pdf from path
    // chunk the pdf
    // call the openai embedding model for every chunk
    // store the chunk in qdrant db

    // Load Pdf
    const loader = new PDFLoader(data.path);
    const docs = await loader.load({});
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        collectionName: "chat-with-pdf",
      }
    );
    await vectorStore.addDocuments(docs);
    console.log(`all docs are added to vector store`);
    
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: "6379",
    },
  }
);
