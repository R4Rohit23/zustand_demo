import { PlusIcon } from "@heroicons/react/20/solid";
import React from "react";
import AddTask from "./AddTask";

const EmptyTaskState = () => {
	return (
		<div className="text-center flex flex-col h-screen w-screen justify-center items-center">
			<svg
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="mx-auto h-12 w-12 text-gray-400"
			>
				<path
					d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					strokeWidth={2}
					vectorEffect="non-scaling-stroke"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<h3 className="mt-2 text-lg font-semibold">No tasks so far</h3>
			<p className="mt-1 text-sm text-gray-500">
				Get started by creating a new tasks.
			</p>
			<div className="mt-6">
				<button
					type="button"
					className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					// @ts-ignore
					onClick={() => document.getElementById("my_modal_3")?.showModal()}
				>
					<PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
					Add Task
				</button>
			</div>

			<dialog id="my_modal_3" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<AddTask modalToCloseId="my_modal_3"/>
				</div>
			</dialog>
		</div>
	);
};

export default EmptyTaskState;
