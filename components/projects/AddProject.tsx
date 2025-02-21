import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AddProject({ onProjectAdded }: { onProjectAdded: () => void }) {
	const [projectName, setProjectName] = useState("");
	const [projectUrl, setProjectUrl] = useState("");
	// const [username, setUsername] = useState<string | null>("");
	const [isLoading,setIsLoading] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const { username,token } = useAuthStore();
	// useEffect(() => {
	// 	if (typeof window !== "undefined") {
	// 		setUsername(localStorage.getItem("username"));
	// 	}
	// }, []);

	const handleAddProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// console.log(projectName,projectUrl);
		setIsLoading(true);
		try {
			const response = await fetch("/api/addproject", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization : "Bearer " + token
				},
				body: JSON.stringify({
					projectName,
					projectUrl,
					username,
				}),
			});

			const data = await response.json();

			// console.log(data);
			toast(data.msg);
			setIsLoading(false);
			if(response.ok) {
                onProjectAdded(); // Call the callback function after successful addition
                setOpen(false);
                setProjectName("");
                setProjectUrl("");
            }

		} catch (error: any) {
			console.log(error.message);
			setIsLoading(false);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="p-2 md:px-6 md:py-2 bg-purple-600 rounded-md flex gap-2 text-white hover:bg-purple-600/90">
					<Plus />
					<span className="md:block hidden">Add Project</span>
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="text-purple-600">Add Project</DialogTitle>
					<DialogDescription>
						Add the project name and Project Github Repository
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-left">
							Project Name
						</Label>
						<Input
							id="Project Name"
							className="col-span-3"
							onChange={(e) => setProjectName(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-left">
							Github Repository
						</Label>
						<Input
							id="Github Repository"
							className="col-span-3"
							onChange={(e) => setProjectUrl(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<button
						className=" h-10 w-32 rounded-md bg-purple-600 text-white flex justify-center items-center"
						onClick={handleAddProject}
					>
						{isLoading ? (
							<div className="flex gap-1">
								<div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{animationDelay: "0ms"}}></div>
								<div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{animationDelay: "150ms"}}></div>
								<div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{animationDelay: "300ms"}}></div>
							</div>
						) : (
							"Add Project"
						)}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
