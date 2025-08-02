import type { Client } from "../types";

export const clients: Client[] = [
  {
    id: "CL001",
    name: "Alice Johnson",
    email: "alice@example.com",
    createdAt: "2024-01-05",
    updatedAt: "2024-07-12",
    status: "Active",
  },
  {
    id: "CL002",
    name: "Bob Smith",
    email: "bob@example.com",
    createdAt: "2024-03-20",
    updatedAt: "2024-07-15",
    status: "Inactive",
  },
  {
    id: "CL003",
    name: "Charlie Rose",
    email: "charlie@example.com",
    createdAt: "2024-02-10",
    updatedAt: "2024-07-10",
    status: "Active",
  },
  {
    id: "CL004",
    name: "John Rambo",
    email: "johnrambo@example.com",
    createdAt: "2024-02-10",
    updatedAt: "2024-07-10",
    status: "Inactive",
  },
  // Add more as needed
];
