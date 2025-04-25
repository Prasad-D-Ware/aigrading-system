import React from "react";

const Loader = () => {
	return (
		<div className="flex gap-1">
			<div
				className="w-3 h-3 rounded-full bg-white animate-bounce"
				style={{ animationDelay: "0ms" }}
			></div>
			<div
				className="w-3 h-3 rounded-full bg-white animate-bounce"
				style={{ animationDelay: "150ms" }}
			></div>
			<div
				className="w-3 h-3 rounded-full bg-white animate-bounce"
				style={{ animationDelay: "300ms" }}
			></div>
		</div>
	);
};

export default Loader;
