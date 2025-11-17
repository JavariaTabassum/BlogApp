// import { useState } from "react";
// import { createPost } from "../api/postApi";
// import { useNavigate } from "react-router-dom";
// import { Editor } from "@tinymce/tinymce-react";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title.trim() || !content.trim()) {
//       setError("Title and content are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);

//     if (selectedFile) {
//       formData.append("image", selectedFile);
//     }

//     setLoading(true);

//     try {
//       await createPost(formData);
//       navigate("/");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="min-h-screen flex flex-col bg-white p-6"
//     >
//       <h2 className="text-3xl font-semibold mb-6 text-center">Create Post</h2>

//       {error && (
//         <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {/* Title */}
//       <input
//         type="text"
//         placeholder="Post Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="border p-3 mb-6 rounded w-full text-lg"
//       />

//       {/* Featured Image */}
//       <label className="block mb-2 font-medium">Featured Image</label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//         className="border p-3 mb-6 rounded w-full"
//       />

//       {/* Editor */}
//       <label className="block mb-2 font-medium text-lg">Content</label>
//       <div className="flex-1 mb-6">
//         <Editor
//           apiKey="zrn265fgazv3jihesr1af9uw4eszqvcsezl3ynygtx6mlevi"
//           value={content}
//           onEditorChange={(newValue) => setContent(newValue)}
//           init={{
//             height: 600,
//             menubar: false,
//             plugins: [
//               "advlist",
//               "autolink",
//               "lists",
//               "link",
//               "charmap",
//               "preview",
//               "anchor",
//               "searchreplace",
//               "visualblocks",
//               "code",
//               "fullscreen",
//               "insertdatetime",
//               "table",
//             ],
//             toolbar:
//               "undo redo | formatselect | bold italic underline | " +
//               "alignleft aligncenter alignright alignjustify | " +
//               "bullist numlist outdent indent | link | removeformat",
//           }}
//         />
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         className="px-8 py-2 rounded text-white bg-green-600 hover:bg-green-700"
//         disabled={loading}
//       >
//         {loading ? "Creating..." : "Create Post"}
//       </button>
//     </form>
//   );
// };

// export default CreatePost;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, getPostById } from "../api/postApi";
import { Editor } from "@tinymce/tinymce-react";

declare global {
  interface Window {
    tinymce: any;
  }
}


const CreatePost = () => {
  const { id } = useParams(); // Edit mode if id exists
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Load post for editing
  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const post = await getPostById(id!);
          setTitle(post.title);
          setContent(post.content);
          setExistingImage(post.image || null);
        } catch {
          setError("Failed to load post details");
        }
      };
      fetchPost();
    }
  }, [id, isEditing]);

  // 👉 CLEAR FIELDS WHEN SWITCHING TO CREATE POST
  useEffect(() => {
    if (!isEditing) {
      setTitle("");
      setContent("");
      setSelectedFile(null);
      setExistingImage(null);

      // Reset TinyMCE editor if loaded
      if (window.tinymce) {
        const editors = window.tinymce.editors;
        if (editors && editors.length > 0) {
          editors[0].setContent("");
        }
      }
    }
  }, [isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    setLoading(true);

    try {
      if (isEditing) {
        await updatePost(id!, formData);
      } else {
        await createPost(formData);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">

      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        {isEditing ? "Edit Your Post" : "Create a New Post"}
      </h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title Input */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Post Title</label>
          <input
            type="text"
            placeholder="Enter your post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 rounded-lg w-full text-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Existing Image Display (Edit Mode) */}
        {existingImage && (
          <div className="mb-4">
            <p className="font-medium mb-2 text-gray-700">Current Image</p>
            <img
              src={existingImage}
              alt="Current Post"
              className="w-48 rounded-lg shadow-md"
            />
          </div>
        )}

        {/* File Upload */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="border p-3 rounded-lg w-full shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-lg">
            Post Content
          </label>
          <Editor
            apiKey="zrn265fgazv3jihesr1af9uw4eszqvcsezl3ynygtx6mlevi"
            value={content}
            onEditorChange={(newValue) => setContent(newValue)}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "table",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link | removeformat",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Post"
            : "Create Post"}
        </button>
      </form>
    </div>
  </div>
);

};

export default CreatePost;




