"use client";
import EmptyTaskState from "@/components/EmptyTaskState";
import TaskList from "@/components/TaskList";
import useTaskStore from "@/store/store";

export default function Home() {
	const { tasks } = useTaskStore();

	return !tasks?.length ? <EmptyTaskState /> : <TaskList />;
}
