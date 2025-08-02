import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { debounce } from "lodash";
import {
   Filter,
   Plus,
   Search,
   ArrowUpDown,
   SlidersHorizontal,
} from "lucide-react";

interface TopBarProps {
   onSearchChange: (val: string) => void;
   onToggleSort: () => void;
}

const TopBar = ({ onSearchChange, onToggleSort }: TopBarProps) => {
   const [search, setSearch] = useState("");

   interface HandleDebouncedSearch {
      (val: string): void;
   }

   const handleDebouncedSearch: HandleDebouncedSearch = debounce((val: string) => {
      onSearchChange(val);
   }, 300);

   interface SearchChangeEvent {
      target: {
         value: string;
      };
   }

   const handleSearchChange = (e: SearchChangeEvent) => {
      const val = e.target.value;
      setSearch(val);
      handleDebouncedSearch(val);
   };

   return (
      <div className="flex w-full justify-between items-center gap-4 py-4">
         <div className="flex items-center gap-2 w-full max-w-3xl">
            <Input
               type="text"
               placeholder="Search by name or email..."
               value={search}
               onChange={handleSearchChange}
            />
            <Search className="w-5 h-5 text-gray-500" />
            <Button variant="ghost" size="icon">
               <ArrowUpDown className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
               <Filter className="w-5 h-5" />
            </Button>
         </div>

         <div className="flex gap-2 items-center">
            <Button
               variant="outline"
               size="icon"
               onClick={onToggleSort}
               title="Sort Panel"
            >
               <SlidersHorizontal className="w-5 h-5" />
            </Button>

            <Button variant="default">
               <Plus className="w-4 h-4 mr-2" />
               Add Client
            </Button>
         </div>
      </div>
   );
}
export default TopBar;