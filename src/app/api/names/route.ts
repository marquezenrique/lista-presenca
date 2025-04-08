import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import type { NameInput, NameOutput } from "../../types";
import clientPromise from "@/src/lib/db";

export async function GET() {
  try {
    const client = await clientPromise.catch(e => {
      console.error('DB connection failed:', e);
      throw new Error('Database connection failed');
    });
    const db = client.db();
    const names = await db.collection<NameOutput>("names").find({}).toArray();
    return NextResponse.json(names);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch names" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { name } = (await request.json()) as NameInput;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    const result = await db.collection<NameInput>("names").insertOne({ name });
    const insertedId = result.insertedId.toString();
    return NextResponse.json({ _id: insertedId, name } satisfies NameOutput);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to add name" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("names").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Name not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete name" },
      { status: 500 }
    );
  }
}
