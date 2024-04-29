import { useState } from "react";
import DnDLayout from "@/components/DragNDrop/DnDLayout.jsx";
import { DnDItems } from "@/constants/DnDConstants.js";
import DraggableCategory from "@/components/DragNDrop/DraggableCategory.jsx";

const Container = () => {
  const [activeId, setActiveId] = useState(null);
  const [categories, setCategories] = useState([...DnDItems]);

  const getIndex = (id) => {
    if (activeId) return categories.findIndex((item) => item.id === id);

    return -1;
  };

  const handleCatDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleCatDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over?.id) {
      // const categoryCopy = JSON.parse(JSON.stringify(categories));
      const categoryCopy = structuredClone(categories);

      const removedCategory = categoryCopy.splice(getIndex(active.id), 1);
      categoryCopy.splice(getIndex(over.id), 0, removedCategory[0]);
      setCategories(categoryCopy);

      // setCategories((items) => {
      //   const oldIndex = items.findIndex((category) => category.id === active.id);
      //   const newIndex = items.findIndex((category) => category.id === over?.id);
      //
      //   return arrayMove(items, oldIndex, newIndex);
      // });
    }

    setActiveId(null);
  };

  const handleCatDragCancel = () => {
    setActiveId(null);
  };

  const handleCatDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over?.id) return;
  }

  const CategoryOverlay = () => {
    return <DraggableCategory isDragOverlay category={categories[getIndex(activeId)]} />
  }

  return (
    <div className={"flex w-full items-center justify-center px-2 py-4 md:px-4 lg:px-8"}>
      <DnDLayout
        onDragStart={handleCatDragStart}
        onDragEnd={handleCatDragEnd}
        onDragCancel={handleCatDragCancel}
        onDragOver={handleCatDragOver}
        items={categories}
        showOverlay={!!activeId}
        Overlay={CategoryOverlay}
        useDndContext
      >
        <div
          className={
            "grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4"
          }
        >
          {categories?.map((category) => (
            <DraggableCategory key={category.id} category={category} isDragOverlay={false} />
          ))}
        </div>
      </DnDLayout>
    </div>
  );
};

export default Container;
