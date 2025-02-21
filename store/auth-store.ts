import { create } from "zustand";
import { persist } from "zustand/middleware";

interface authState {
	teacher_id: string;
	username: string;
	token: string;
}

interface authActions {
	setToken: (token: string) => void;
	setTeacherUsername: (username: string) => void;
	setTeacherId: (id: string) => void;
	loginUser: (token: string) => void;
	logoutUser: () => void;
}

export const useAuthStore = create(
	persist<authState & authActions>(
		(set) => ({
			teacher_id: "",
			username: "",
			token: "",
			setToken: (token) => set(() => ({ token })),
			setTeacherUsername: (username) => set(() => ({ username })),
			setTeacherId: (id) => set(() => ({ teacher_id: id })),
			loginUser: (token) =>
				set(() => ({
					token: token,
				})),
			logoutUser: () =>
				set(() => ({
					teacher_id: "",
					username: "",
					token: "",
				})),
		}),
		{
			name: "auth-storage",
		}
	)
);
