export default interface Paginated<T> {
  elements: T[];
  pagination: Pagination;
}

export interface Pagination {
  hasMore: boolean;
  limit: number;
  offset: number;
  totalMessages: number;
}
