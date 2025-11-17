import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: any, res: Response) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const author = req.user?._id;

    const newPost = new Post({ title, content, image, author });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error: any) {
  console.error("Create Post Error:", error.message, JSON.stringify(error, null, 2));
  res.status(500).json({ message: error.message });
}
};

// export const updatePost = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (!updatedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.status(200).json(updatedPost);
//   } catch (error: any) {
//   console.error("Update Error:", error.message, JSON.stringify(error, null, 2));
//   res.status(500).json({ message: error.message });
// }

// };

export const updatePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔒 Prevent editing another user’s post
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this post" });
    }

    // Prepare updated fields
    const updatedData: any = {
      title: req.body.title,
      content: req.body.content,
    };

    // If new image uploaded
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedPost);
  } catch (error: any) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// export const deletePost = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deletedPost = await Post.findByIdAndDelete(id);
//     if (!deletedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error: any) {
//   console.error("Delete Error:", error.message, JSON.stringify(error, null, 2));
//   res.status(500).json({ message: error.message });
// }

// };

export const deletePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔒 Prevent deleting another user’s post
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get all posts (excluding current user's posts)
export const getPosts = async (req: any, res: Response) => {
  try {
    const userId = req.user?._id;

    const filter = userId ? { author: { $ne: userId } } : {};

    const posts = await Post.find(filter)
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
 } catch (error: any) {
  console.error("Get Posts Error:", error.message, JSON.stringify(error, null, 2));
  res.status(500).json({ message: "Server error" });
}

};

// ✅ Get logged-in user's posts
export const getMyPosts = async (req: any, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const posts = await Post.find({ author: userId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error: any) {
  console.error("Get My Posts Error:", error.message, JSON.stringify(error, null, 2));
  res.status(500).json({ message: "Server error" });
}

};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error: any) {
  console.error("GetPostById Error:", error.message, JSON.stringify(error, null, 2));
  res.status(500).json({ message: "Error fetching post details" });
}

};
