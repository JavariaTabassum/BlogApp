import API from "./axiosInstance";


export const getPosts = (mine: boolean = false) => {
  if (mine) {
    return API.get("/posts/me");
  }
  return API.get("/posts");
};


export const createPost = (data: any) => API.post("/posts", data);

export const updatePost = (id: string, data: any) => API.put(`/posts/${id}`, data);

export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const getPostById = async (id: string) => {
  const res = await API.get(`/posts/${id}`);
  return res.data;
};
