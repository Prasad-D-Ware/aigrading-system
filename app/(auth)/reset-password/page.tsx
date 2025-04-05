import ResetPassword from "@/components/auth/ResetPassword";
import React, { Suspense } from "react";

const page = () => {
	return (
		<div>
			<Suspense fallback={<div className="flex flex-col justify-center h-screen w-screen">Loading...</div>}>
				<ResetPassword />
			</Suspense>
		</div>
	);
};

export default page;
