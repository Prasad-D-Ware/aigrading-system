"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitGraphIcon as GitContributions, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export interface StudentCardProps {
	username: string;
	id: string;
	avatarUrl: string;
	contributions: number;
	profileUrl: string;
}

export default function StudentCard({
	username,
	avatarUrl,
	id,
	contributions,
	profileUrl,
}: StudentCardProps) {
	const router = useRouter();
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			whileHover={{ y: -5 }}
			className="w-full max-w-sm mx-auto"
		>
			<div
				onClick={() => {
					router.push(`/projects/student/${id}`);
				}}
			>
				<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
					<CardContent className="p-6">
						<div className="flex items-start gap-4">
							<div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10">
								<img
									src={avatarUrl}
									alt={username}
									className="w-16 h-16 rounded-full"
								/>
							</div>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<h3 className="text-xl font-semibold text-gray-900">
										{username}
									</h3>
									<User2 className="w-4 h-4 text-primary/60" />
								</div>
								<div className="mt-2 flex items-center gap-2">
									<GitContributions className="w-4 h-4 text-primary" />
									<Badge variant="secondary" className="font-medium">
										{contributions.toLocaleString()} contributions
									</Badge>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}
