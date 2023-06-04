import { useBoardStore } from "@/store/BoardStore";
import { RadioGroup } from "@headlessui/react";
const types = [
  {
    id: "todo",
    name: "todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "inprogress",
    description: "A task that's currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];

const TaskTypeRadioGroup = () => {
  const [setNewTaskType, newTaskType] = useBoardStore((state) => [
    state.setNewTaskType,
    state.newTaskType,
  ]);
  return (
    <>
      <div className="w-full py-5">
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
            <div className="space-y-2">
              {types.map((type) => (
                <RadioGroup.Option
                  key={type.id}
                  value={type.id}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                        : ""
                    } ${
                      checked
                        ? `${type.color} bg-opacity-75 text-white`
                        : `bg-white`
                    } 
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {type.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              <span>{type.description}</span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default TaskTypeRadioGroup;
