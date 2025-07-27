export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags?: NoteTag[];
}

// Тип для тегів
export interface NoteTag {
  id: string;
  name: string;
}
