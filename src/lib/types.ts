import type { ObjectId } from "mongodb";

export interface NameInput {
  name: string;
  addedBy: string;
}

export interface NameOutput extends NameInput {
  _id: ObjectId;
}

export interface PresenceListProps {
  initialNames: NameOutput[];
}
