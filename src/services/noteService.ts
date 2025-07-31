import axios from "axios";
import type { Note } from "../types/note";

// Конфігурація API
const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Типи параметрів
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Отримання нотаток
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...params,
      perPage: 12, // ✅ правильно!
    },
  });

  return response.data;
};

// Створення нотатки
export const createNote = async (data: {
  title: string;
  content: string;
  tag: Note["tag"];
}): Promise<Note> => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

// Видалення нотатки
export const deleteNote = async (id: number): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
