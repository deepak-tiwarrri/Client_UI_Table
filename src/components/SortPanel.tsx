import { DndContext, closestCenter } from "@dnd-kit/core";
import {
   arrayMove,
   SortableContext,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { SortOption } from "@/types/index.ts";
import type { SortField } from "@/types/index.ts";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SortableSortItem from "@/utils/sortable-sort-item";



const fields: SortField[] = ["name", "createdAt", "updatedAt", "clientId"];

interface SortPanelProps {
   sortOptions: SortOption[];
   setSortOptions: React.Dispatch<React.SetStateAction<SortOption[]>>;
}

export default function SortPanel({ sortOptions, setSortOptions }: SortPanelProps) {


   const handleDragEnd = (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
         const oldIdx = sortOptions.findIndex(o => o.id === active.id);
         const newIdx = sortOptions.findIndex(o => o.id === over.id);
         setSortOptions(arrayMove(sortOptions, oldIdx, newIdx));
      }
   };

   const addSortOption = () => {
      const unused = fields.find(
         field => !sortOptions.find(option => option.field === field)
      );
      if (unused) {
         setSortOptions([
            ...sortOptions,
            { id: uuid(), field: unused, direction: "asc" },
         ]);
      }
   };

   const toggleDirection = (id: string) => {
      setSortOptions((prev: SortOption[]) =>
         prev.map((option: SortOption) =>
            option.id === id
               ? { ...option, direction: option.direction === "asc" ? "desc" : "asc" }
               : option
         )
      );
   };

   const clearAll = () => setSortOptions([]);

   return (
      <Card>
         <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
               <h2 className="font-medium">Sort By</h2>
               <div className="space-x-2">
                  <Button variant="default" onClick={clearAll}>Clear All</Button>
                  <Button
                     variant="default"
                     onClick={addSortOption}
                     disabled={sortOptions.length >= fields.length}
                  >
                     + Add
                  </Button>
               </div>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
               <SortableContext
                  items={sortOptions.map(option => option.id)}
                  strategy={verticalListSortingStrategy}
               >
                  <div className="space-y-2">
                     {sortOptions.map(option => (
                        <SortableSortItem
                           key={option.id}
                           option={option}
                           toggleDirection={() => toggleDirection(option.id)}
                        />
                     ))}
                  </div>
               </SortableContext>
            </DndContext>
         </CardContent>
      </Card>
   );
}


