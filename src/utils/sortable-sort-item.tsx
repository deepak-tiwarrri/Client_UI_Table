import type { SortField, SortOption } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

const fieldLabels: Record<SortField, string> = {
   name: "Client Name",
   createdAt: "Created At",
   updatedAt: "Updated At",
   clientId: "Client ID",
};

export default function SortableSortItem({
   option,
   toggleDirection,
}: {
   option: SortOption;
   toggleDirection: () => void;
}) {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: option.id,
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   const Icon = option.direction === "asc" ? ArrowUpAZ : ArrowDownAZ;

   return (
      <div
         ref={setNodeRef}
         style={style}
         className="flex justify-between items-center bg-muted p-2 rounded-md border"
      >
         <div className="flex items-center gap-3" {...attributes} {...listeners}>
            <span className="cursor-move">≡</span>
            <span>{fieldLabels[option.field]}</span>
         </div>
         <button onClick={toggleDirection}>
            <Icon className="w-4 h-4 text-muted-foreground" />
         </button>
      </div>
   );
}