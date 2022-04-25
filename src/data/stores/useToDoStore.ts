import create from "zustand";
import { devtools } from "zustand/middleware";
import { generateId } from "../helpers";

type Task = {
  id: string;
  title: string;
  createdDate: number;
};

type TodoStore = {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
};

export const useToDoStore = create<TodoStore>(
  devtools((set, get) => ({
    tasks: [],
    createTask: (title) => {
      const { tasks } = get();
      const newTask = {
        id: generateId(),
        title,
        createdDate: Date.now(),
      };

      set({
        tasks: [newTask].concat(tasks),
      });
    },
    updateTask: (id: string, title: string) => {
      const { tasks } = get();
      set({
        tasks: tasks.map((task) => ({
          ...task,
          title: task.id === id ? title : task.title,
        })),
      });
    },
    removeTask: (id: string) => {
      const { tasks } = get();
      set({
        tasks: tasks.filter((task) => task.id !== id),
      });
    },
  }))
);
