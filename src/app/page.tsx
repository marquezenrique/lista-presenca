import Interface from "../components/Interface";
import type { NameOutput } from "./types";
import clientPromise from "../lib/db";

async function getNames(): Promise<NameOutput[]> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const names = await db.collection<NameOutput>("names").find({}).toArray();
    return names.map((name) => ({
      _id: name._id.toString(),
      name: name.name,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const initialNames = await getNames();
  return <Interface initialNames={initialNames} />;
}
