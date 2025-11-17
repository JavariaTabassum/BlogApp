import express from "express";
import upload from "../config/multer";
import { getPosts, createPost, updatePost, deletePost, getMyPosts, getPostById} from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", authMiddleware, getMyPosts); 
router.get("/:id", getPostById);
router.get("/", getPosts);

router.post("/", authMiddleware, upload.single("image"), createPost);
router.put("/:id", authMiddleware, upload.single("image"), updatePost);
router.delete("/:id", authMiddleware, deletePost);


export default router;
