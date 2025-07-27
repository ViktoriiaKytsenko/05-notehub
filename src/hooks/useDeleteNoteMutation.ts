import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../services/noteService";
import type { Note } from "../types/note";

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, number>({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
