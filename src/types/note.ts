export type NoteTag = "Personal" | "Work" | "Todo";

export interface Note {
  id: number;
  title: string;
  content: string; // стало обов’язковим
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
