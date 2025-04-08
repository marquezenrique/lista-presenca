import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = "test";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient>;

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}

clientPromise = globalWithMongo._mongoClientPromise;

export const getDb = async () => {
  const client = await clientPromise;
  return client.db(dbName);
};

export default clientPromise;
