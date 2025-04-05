"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function StudentCardSkeleton() {
	return (
		<div className="w-full max-w-sm mx-auto animate-pulse">
			<Card className="overflow-hidden">
				<CardContent className="p-6">
					<div className="flex items-start gap-4">
						{/* Avatar Skeleton */}
						<div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />

						{/* Content Skeleton */}
						<div className="flex-1 space-y-3">
							<div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
							<div className="flex items-center gap-2 mt-2">
								<div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
								<div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
