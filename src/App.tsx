import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/TopBar.jsx"
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent
// } from "@/components/ui/card"
import SortPanel from "./components/SortPanel";
import ClientTable from "./components/ClientTable";
import { clients as mockClients } from "./data/client.ts";
import type { SortOption, Client } from "./types/index.ts";

export default function App() {
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [search, setSearch] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sortOptions");
    if (stored) setSortOptions(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("sortOptions", JSON.stringify(sortOptions));
  }, [sortOptions]);

  const filteredClients = useMemo(() => {
    return mockClients.filter((client: Client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()) ||
      client.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const sortedClients = useMemo(() => {
    const sorted = [...filteredClients];
    sortOptions.slice().reverse().forEach(({ field, direction }) => {
      sorted.sort((a, b) => {
        const aVal = a[field as keyof Client];
        const bVal = b[field as keyof Client];

        if (field === "createdAt" || field === "updatedAt") {
          return direction === "asc"
            ? new Date(aVal).getTime() - new Date(bVal).getTime()
            : new Date(bVal).getTime() - new Date(aVal).getTime();
        }

        return direction === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    });
    return sorted;
  }, [filteredClients, sortOptions]);

  return (
    <main className="min-h-screen flex justify-center items-start pt-10 px-4">
      <div className="w-full max-w-6xl space-y-4">
        <TopBar />
        {/* <Card>
        <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">Client List</h1>
        <Input
        type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </CardContent>
      </Card> */}
        <SortPanel sortOptions={sortOptions} setSortOptions={setSortOptions} />
        <ClientTable clients={sortedClients} />
      </div>
    </main>
  );
}
