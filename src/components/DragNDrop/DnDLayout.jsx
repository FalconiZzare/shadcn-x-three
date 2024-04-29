import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import PropTypes from "prop-types";

const DnDLayout = ({
  onDragStart,
  onDragEnd,
  onDragCancel,
  onDragOver,
  items,
  Overlay,
  showOverlay,
  useDndContext,
  children
}) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  if (useDndContext) {
    return (
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
        onDragOver={onDragOver}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {children}
        </SortableContext>
        <DragOverlay adjustScale dropAnimation={{ duration: 400 }}>
          {showOverlay ? <Overlay /> : null}
        </DragOverlay>
      </DndContext>
    );
  } else {
    return (
      <>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {children}
        </SortableContext>
        <DragOverlay adjustScale dropAnimation={{ duration: 400 }}>
          {showOverlay ? <Overlay /> : null}
        </DragOverlay>
      </>
    );
  }
};

DnDLayout.propTypes = {
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragCancel: PropTypes.func,
  onDragOver: PropTypes.func,
  items: PropTypes.array.isRequired,
  Overlay: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  showOverlay: PropTypes.bool.isRequired,
  useDndContext: PropTypes.bool
};

export default DnDLayout;
