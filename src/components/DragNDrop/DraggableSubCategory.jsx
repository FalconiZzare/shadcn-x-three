import { Button } from "@/components/ui/button.jsx";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";

const DraggableSubCategory = ({ subCategory, isDragOverlay }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: subCategory?.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transformOrigin: "0 0 ",
    transition
  };


  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-sm border py-3 px-4 bg-background",
        isDragOverlay && "shadow-xl",
        isDragging && "border-dashed border-foreground/60 opacity-20 shadow-xl"
      )}
      {...(!isDragOverlay && { ref: setNodeRef })}
      {...(!isDragOverlay && { style: style })}
    >
      {subCategory?.id}
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
    </div>
  )
};
DraggableSubCategory.propTypes = {
  subCategory: PropTypes.object,
  isDragOverlay: PropTypes.bool.isRequired
};

export default DraggableSubCategory;