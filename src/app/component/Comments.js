import React from "react"

export default function Comments() {
	return (
		<div className=" py-10 px-10">
			<a
				href="#"
				className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
			>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of
					2021 so far, in reverse chronological order.
				</p>
				<div className="flex items-center gap-3 mt-3 text-white">
					<img
						src="/images/comment_user.jpg"
						className="rounded-full"
						width={48}
						height={48}
					/>
					<div className="flex flex-col justify-start text-sm">
						<p className="font-bold">John Doe</p>
						<p>CEO, Company Inc.</p>
					</div>
				</div>
			</a>
		</div>
	)
}
