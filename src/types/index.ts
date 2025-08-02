export type SortField = "name" | "createdAt" | "updatedAt" | "clientId";

export interface SortOption {
  id: string;
  field: SortField;
  direction: "asc" | "desc";
}

export interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: "Active" | "Inactive";
}
