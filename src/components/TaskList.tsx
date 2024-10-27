import useTaskStore from "@/store/store";
import {
	PencilSquareIcon,
	PlusIcon,
	TrashIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";
import AddTask from "./AddTask";

const TaskList = () => {
	const { tasks, deleteTask } = useTaskStore();
	const [taskId, setTaskId] = useState<number>();

	const handleDeleteTask = (taskId: number) => {
		deleteTask(taskId);
	};

	return (
		<div className="space-y-5 h-screen flex flex-col justify-center items-center max-w-xl mx-auto">
			<h1 className="text-2xl font-semibold">My Tasks</h1>
			{tasks &&
				tasks?.map((task) => (
					<div className="collapse collapse-arrow bg-base-200" key={task.id}>
						<input type="radio" name="my-accordion-2" />
						<div className="collapse-title text-xl font-medium flex items-center justify-between">
							<div>
								{task.title}{" "}
								{task?.priority && (
									<div
										className={`badge ${
											task?.priority == "LOW"
												? "badge-success"
												: task?.priority == "MEDIUM"
												? "badge-warning"
												: "badge-error"
										} capitalize`}
									>
										{task?.priority?.toString()?.toLowerCase()}
									</div>
								)}
							</div>

							<div className="flex gap-5 z-10">
								{
									<PencilSquareIcon
										className="size-4"
										onClick={() => {
											setTaskId(task.id);
											// @ts-ignore
											document?.getElementById("update_task")?.showModal();
										}}
									/>
								}{" "}
								{
									<TrashIcon
										className="size-4"
										onClick={() => handleDeleteTask(task.id as number)}
									/>
								}
							</div>
						</div>
						<div className="collapse-content">
							<p>{task.description}</p>
						</div>
					</div>
				))}

			<button
				className="btn"
				// @ts-ignore
				onClick={() => document.getElementById("add_task")?.showModal()}
			>
				<PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
				Add Task
			</button>

			<dialog id="add_task" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<AddTask modalToCloseId="add_task" />
				</div>
			</dialog>

			<dialog id="update_task" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<AddTask
						taskData={tasks?.find((t) => t.id == taskId)}
						modalToCloseId="update_task"
					/>
				</div>
			</dialog>
		</div>
	);
};

export default TaskList;
