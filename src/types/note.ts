export type NoteTag = "Personal" | "Work" | "Todo" | "Meeting" | "Shopping";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
