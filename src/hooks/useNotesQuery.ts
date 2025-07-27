import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../services/noteService";
import type {
  FetchNotesParams,
  FetchNotesResponse,
} from "../services/noteService";

export const useNotesQuery = (params: FetchNotesParams) => {
  return useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", params],
    queryFn: () => fetchNotes(params),
    placeholderData: () => ({
      results: [],
      total: 0,
      page: params.page ?? 1,
      limit: 12,
    }),
  });
};
