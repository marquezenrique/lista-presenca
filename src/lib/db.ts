import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = "presence"; // Nome do seu banco de dados

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Função auxiliar para obter o banco de dados
export const getDb = async () => {
  const client = await clientPromise;
  return client.db(dbName);
};

export default clientPromise;
