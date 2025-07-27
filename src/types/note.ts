export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags?: NoteTag[];
}

// Тип для тегів (може бути використано пізніше)
export interface NoteTag {
  id: string;
  name: string;
}
