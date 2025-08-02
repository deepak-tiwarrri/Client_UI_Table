import { useEffect, useMemo, useState } from "react";
import TopBar from "./components/TopBar.tsx"
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
  const [searchText, setSearchText] = useState("");
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [showSort, setShowSort] = useState(false);
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
      client.name.toLowerCase().includes(searchText.toLowerCase()) ||
      client.email.toLowerCase().includes(searchText.toLowerCase()) ||
      client.status.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  // const sortedClients = useMemo(() => {
  //   const sorted = [...filteredClients];
  //   sortOptions.slice().reverse().forEach(({ field, direction }) => {
  //     sorted.sort((a, b) => {
  //       const aVal = a[field as keyof Client];
  //       const bVal = b[field as keyof Client];

  //       if (field === "createdAt" || field === "updatedAt") {
  //         return direction === "asc"
  //           ? new Date(aVal).getTime() - new Date(bVal).getTime()
  //           : new Date(bVal).getTime() - new Date(aVal).getTime();
  //       }

  //       return direction === "asc"
  //         ? String(aVal).localeCompare(String(bVal))
  //         : String(bVal).localeCompare(String(aVal));
  //     });
  //   });
  //   return sorted;
  // }, [filteredClients, sortOptions]);

  return (
    <main className="min-h-screen flex justify-center items-start pt-10 px-4">
      <div className="w-full max-w-6xl space-y-4">
        <TopBar
          onSearchChange={(text) => setSearchText(text)}
          onToggleSort={() => setShowSort(!showSort)}
        />

        {showSort && (
          <SortPanel
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            onClose={() => setShowSort(false)}
          />
        )}

        <ClientTable clients={filteredClients} />
      </div>
    </main>
  );
}
