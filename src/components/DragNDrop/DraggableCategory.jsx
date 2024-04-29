import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { GripVertical } from "lucide-react";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";
import DraggableSubCategory from "@/components/DragNDrop/DraggableSubCategory.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import DnDLayout from "@/components/DragNDrop/DnDLayout.jsx";
import { DragOverlay } from "@dnd-kit/core";

const DraggableCategory = ({ category, isDragOverlay }) => {
  const [activeId, setActiveId] = useState(null);

  const {
    active,
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: category?.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transformOrigin: "0 0 ",
    transition
  };

  const getIndex = (id) => {
    if (activeId) return category?.items.findIndex((item) => item.id === id);

    return -1;
  };

  const handleSubDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleSubDragEnd = (event) => {
    const {active, over} = event

    console.log("Active", active, "Over", over);
  }

  const handleSubDragCancel = () => {
    setActiveId(null);
  }

  const SubCategoryOverlay = () => {
    return <DraggableSubCategory isDragOverlay subCategory={category?.items[1]}/>
  }

  return (
    <Card
      className={cn(
        "3xl:w-[450px] h-[500px] w-[350px] md:w-[360px] lg:w-[440px]",
        isDragOverlay && "shadow-xl",
        isDragging && "border-dashed border-foreground/60 opacity-20 shadow-xl"
      )}
      {...(!isDragOverlay && { ref: setNodeRef })}
      {...(!isDragOverlay && { style: style })}
    >
      <CardHeader
        className={"flex flex-row items-center justify-between rounded-lg border-b py-4"}
      >
        {category?.id}
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
      {
        category &&
        <>
          <SortableContext
            // showOverlay={!!activeId}
            // Overlay={SubCategoryOverlay}
            items={category?.items}
            strategy={rectSortingStrategy}
            // useDndContext
            // onDragStart={handleSubDragStart}
            // onDragEnd={handleSubDragEnd}
            // onDragCancel={handleSubDragCancel}
          >
            <ScrollArea className={"h-[414px] p-3 mt-1"}>
              <CardContent className={"flex flex-col gap-3 px-1"}>
                {
                  category?.items?.map((item) => (
                    <DraggableSubCategory
                      key={item.id}
                      isDragOverlay={false}
                      subCategory={item}
                    />
                  ))
                }
              </CardContent>
            </ScrollArea>
          </SortableContext>
          <DragOverlay adjustScale dropAnimation={{ duration: 400 }}>
            {active?.id ? <SubCategoryOverlay /> : null}
          </DragOverlay>
        </>
      }
    </Card>
  );
};

DraggableCategory.propTypes = {
  category: PropTypes.object,
  isDragOverlay: PropTypes.bool.isRequired
};

export default DraggableCategory;
