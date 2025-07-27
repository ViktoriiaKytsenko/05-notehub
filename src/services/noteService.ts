import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";
import axios from "axios";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Типи параметрів і відповіді для fetchNotes
export interface FetchNotesParams {
  page?: number;
  search?: string;
}

export interface FetchNotesResponse {
  results: Note[];
  total: number;
  page: number;
  limit: number;
}

// Запит на отримання нотаток
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params,
  });
  return response.data;
};

// Тип даних для створення нової нотатки
export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

// Створення нотатки
export const createNote = async (data: CreateNoteDto): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
};

// Видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};
