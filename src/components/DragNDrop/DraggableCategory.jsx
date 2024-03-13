import { Card, CardHeader } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";

const DraggableCategory = ({ category, isDragOverlay }) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transformOrigin: "0 0 ",
    transition
  };

  return (
    <Card
      className={cn(
        "h-[500px] w-[350px] md:w-[360px] lg:w-[440px] 3xl:w-[450px]] duration-300 ease-in",
        isDragOverlay && "border-dashed border-foreground/45 shadow-xl scale-[1.02]",
        isDragging && "opacity-20 shadow-xl border-foreground/50"
      )}
      {...(!isDragOverlay && { ref: setNodeRef })}
      {...(!isDragOverlay && { style: style })}
    >
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between rounded-lg border-b py-4",
          isDragOverlay && "border-dashed"
        )}
      >
        {category.id}
        <Button
          variant={"ghost"}
          className={cn(
            "rounded-[4px] px-[4px]",
            isDragOverlay ? "cursor-grabbing bg-accent" : "cursor-grab"
          )}
          {...(!isDragOverlay && listeners)}
          {...(!isDragOverlay && attributes)}
        >
          <GripVertical className={"size-6"} />
        </Button>
      </CardHeader>
    </Card>
  );
};

DraggableCategory.propTypes = {
  category: PropTypes.object.isRequired,
  isDragOverlay: PropTypes.bool.isRequired
};

export default DraggableCategory;
