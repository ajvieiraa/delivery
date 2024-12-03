import { Pagination } from '../services/api';

type PaginationHelperResult = {
  data: { items: any[]; pagination: Pagination };
};

type PaginationHelper = (
  existing: Partial<{ data: { items: any[]; pagination: Pagination } }>,
  incoming: { data: { items: any[]; pagination: Pagination } },
) => PaginationHelperResult;

/**
 * Merge helper for paginated results
 */
export const pagination: PaginationHelper = (existing, incoming) => {
  // If current page is first, replace all data with incoming data
  if (incoming.data.pagination.current_page === 1) return incoming;

  // If current page
  if (
    incoming.data.pagination.current_page ===
    existing.data?.pagination.current_page
  )
    return existing as PaginationHelperResult;

  // Else, merge existing and incoming items
  return {
    data: {
      pagination: incoming.data.pagination,
      items: [...(existing.data?.items || []), ...incoming.data.items],
    },
  };
};
