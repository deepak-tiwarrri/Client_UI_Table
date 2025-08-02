import { DndContext, closestCenter } from "@dnd-kit/core";
import {
   arrayMove,
   SortableContext,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { SortOption, SortField } from "@/types";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SortableSortItem from "@/utils/sortable-sort-item";
import { X } from "lucide-react";

const fields: SortField[] = ["name", "createdAt", "updatedAt", "clientId"];

interface SortPanelProps {
   sortOptions: SortOption[];
   setSortOptions: React.Dispatch<React.SetStateAction<SortOption[]>>;
   onClose: () => void;
}

export default function SortPanel({
   sortOptions,
   setSortOptions,
   onClose,
}: SortPanelProps) {
   const handleDragEnd = (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
         const oldIdx = sortOptions.findIndex((o) => o.id === active.id);
         const newIdx = sortOptions.findIndex((o) => o.id === over.id);
         setSortOptions(arrayMove(sortOptions, oldIdx, newIdx));
      }
   };

   const addSortOption = () => {
      const unused = fields.find(
         (field) => !sortOptions.find((option) => option.field === field)
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
               ? {
                  ...option,
                  direction: option.direction === "asc" ? "desc" : "asc",
               }
               : option
         )
      );
   };

   const clearAll = () => setSortOptions([]);

   const handleApplySort = () => {
      // You can apply your sort logic externally, this just closes the panel
      onClose();
   };

   return (
      <Card className="w-full max-w-lg mx-auto shadow-lg border border-gray-200">
         <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
               <h2 className="font-medium text-lg">Sort By</h2>
               <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-black transition-all"
               >
                  <X className="w-5 h-5" />
               </button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
               <SortableContext
                  items={sortOptions.map((option) => option.id)}
                  strategy={verticalListSortingStrategy}
               >
                  <div className="space-y-2">
                     {sortOptions.map((option) => (
                        <SortableSortItem
                           key={option.id}
                           option={option}
                           toggleDirection={() => toggleDirection(option.id)}
                        />
                     ))}
                  </div>
               </SortableContext>
            </DndContext>

            <div className="flex justify-between pt-4">
               <Button
                  variant="outline"
                  onClick={clearAll}
                  disabled={sortOptions.length === 0}
               >
                  Clear All
               </Button>

               <div className="flex gap-2">
                  <Button
                     variant="secondary"
                     onClick={addSortOption}
                     disabled={sortOptions.length >= fields.length}
                  >
                     + Add
                  </Button>

                  <Button variant="default" onClick={handleApplySort}>
                     Apply Sort
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
