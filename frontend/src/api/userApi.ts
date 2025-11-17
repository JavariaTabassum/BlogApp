import API from "./axiosInstance";

export const register = (data: any) => API.post("/users/register", data);
export const login = (data: any) => API.post("/users/login", data);
export const getProfile = () => API.get("/users/profile");

// Provide a default export as well to avoid import style mismatches in different modules/build setups
export default {
	register,
	login,
	getProfile,
};
