import useTaskStore, { Task } from "@/store/store";
import React, { useEffect, useState } from "react";

interface Props {
	taskData?: Task;
	modalToCloseId: string;
}

const AddTask = ({ taskData, modalToCloseId }: Props) => {
	const { tasks, addTask, updateTask } = useTaskStore();

	const [data, setData] = useState<Task>({
		title: "",
		description: "",
		priority: undefined,
		isEdited: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	useEffect(() => {
		if (taskData) {
			setData(taskData);
		}
	}, [taskData]);

	console.log("taskData", taskData);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		setData((prevData) => ({
			...prevData,
			[name]: name === "priority" ? (value as any) : (value as any),
		}));
	};

	const handleSubmit = () => {
		if (tasks?.find((t) => t.id == data?.id)) {
			updateTask({ task: data, taskId: data.id as number });
			// @ts-ignore
			document.getElementById(modalToCloseId)?.close();
			return;
		} else {
			addTask(data);
			// @ts-ignore
			document.getElementById(modalToCloseId)?.close();
		}

        setData({} as any);
	};

	return (
		<div className="mx-auto max-w-lg flex flex-col gap-5 justify-center items-center">
			<h1 className="text-xl">Add Your Favorite Task Here</h1>
			<input
				type="text"
				name="title"
				placeholder="Enter your task title..."
				className="input input-bordered w-full"
				onChange={handleChange}
				value={data?.title ?? ""}
			/>
			<textarea
				name="description"
				className="textarea textarea-bordered w-full"
				placeholder="Enter your task description..."
				onChange={handleChange}
				value={data?.description ?? ""}
			></textarea>

			<select
				className="select select-bordered w-full"
				name="priority"
				onChange={handleChange}
				value={(data?.priority as any) ?? "SELECT"}
			>
				<option disabled selected value="SELECT">
					Select Task Priority
				</option>
				<option value="HIGH">High</option>
				<option value="MEDIUM">Medium</option>
				<option value="LOW">Low</option>
			</select>

			<button className="btn w-full" onClick={() => handleSubmit()}>
				Button
			</button>
		</div>
	);
};

export default AddTask;
