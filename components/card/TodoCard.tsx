"use client";
import { getUrl } from "@/libs/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };

      fetchImage();
    }
  }, [todo]);
  return (
    <>
      <div
        {...draggableProps}
        {...dragHandleProps}
        ref={innerRef}
        className="bg-white rounded-md space-y-2 drop-shadow-md"
      >
        <div className="flex justify-between items-center p-5">
          <p>{todo.title}</p>
          <button
            className=" text-red-500 hover:text-red-600"
            onClick={() => deleteTask(index, todo, id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 ml-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {/* Add image conditionally */}
        {imageUrl && (
          <div className="relative h-full w-full rounded-b-md">
            <Image
              src={imageUrl}
              alt="Task Image"
              width={400}
              height={200}
              className="w-full object-contain rounded-b-md"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TodoCard;
