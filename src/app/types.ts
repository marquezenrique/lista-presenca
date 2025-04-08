export interface NameInput {
  name: string;
}

export interface NameOutput extends NameInput {
  _id: string;
}

export interface PresenceListProps {
  initialNames: NameOutput[];
}
