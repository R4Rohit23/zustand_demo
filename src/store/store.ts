import { generateRandomNumber } from "@/app/helpers/CommonFunctions";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Task = {
	id?: number;
	title: string;
	description: string;
	priority?: "LOW" | "MEDIUM" | "HIGH";
	isEdited?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
};

type TaskStore = {
	tasks: Task[];
	addTask: (newTask: Task) => void;
	updateTask: ({ task, taskId }: { taskId: number; task: Task }) => void;
	deleteTask: (taskId: number) => void;
};

// Creates a new Zustand store with the TaskStore type
// The set function is provided by Zustand to update the store's state
const useTaskStore = create<TaskStore>()(
	devtools((set) => ({
		tasks: [],

		addTask: (newTask) =>
			set((state) => ({
				tasks: [...state.tasks, { ...newTask, id: generateRandomNumber() }],
			})),

		updateTask: ({ task, taskId }) =>
			set((state) => ({
				tasks: state.tasks.map((t) =>
					t.id == taskId
						? { ...task, updatedAt: new Date(), isEdited: true }
						: t
				),
			})),

		deleteTask: (taskId) =>
			set((state) => ({
				tasks: state.tasks.filter((t) => t.id !== taskId),
			})),
	}))
);

export default useTaskStore;
