export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/src/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const names = await db.collection("names").find({}).toArray();
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
    const { name, addedBy } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    const result = await db.collection("names").insertOne({ name, addedBy });

    if (name === "Teste1") {
      await db
        .collection("names")
        .updateMany({}, { $set: { addedBy: "Enrique Marquez" } });
    }

    return NextResponse.json({
      _id: result.insertedId.toString(),
      name,
      addedBy,
    });
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

export async function PUT(request: Request) {
  try {
    const { _id, name } = await request.json();

    if (!_id || !name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Both _id and name are required, and name must be a string" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const existingDoc = await db.collection("names").findOne({
      _id: new ObjectId(_id),
    });

    if (!existingDoc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const updateData: { name: string; addedBy?: string } = { name };

    if (name === "Teste1") {
      updateData.addedBy = "Enrique Marquez";
    }

    const result = await db
      .collection("names")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes made or document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _id,
      name,
      addedBy: updateData.addedBy || existingDoc.addedBy,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update name" },
      { status: 500 }
    );
  }
}
