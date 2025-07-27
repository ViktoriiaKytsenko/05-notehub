import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../services/noteService";
import type { Note } from "../types/note";

interface NewNoteData {
  title: string;
  content: string;
  tag: Note["tag"];
}

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, NewNoteData>({
    mutationFn: (data) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
