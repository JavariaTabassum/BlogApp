// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPostById } from "../api/postApi"; // you'll define this

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState<any>(null);

//   useEffect(() => {
//   const fetchPost = async () => {
//     try {
//       const data = await getPostById(id!);
//       console.log("Fetched post:", data);
//       setPost(data);
//     } catch (err) {
//       console.error("Error fetching post:", err);
//     }
//   };
//   fetchPost();
// }, [id]);

//   if (!post) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <p className="text-sm text-gray-500 mb-2">
//         ✍️ {post.author?.username || "Unknown"} —{" "}
//         {new Date(post.createdAt).toLocaleDateString()}
//       </p>
//       <div
//         className="text-gray-700 mt-4 wrap-break-word"
//         dangerouslySetInnerHTML={{ __html: post.content }}
//       />
//     </div>
//   );
// };

// export default PostDetail;

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getPostById, deletePost } from "../api/postApi";
import { AuthContext } from "../context/AuthContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();  // <-- Using this to access state

  const fromMyPosts = location.state?.fromMyPosts || false;  // Get from state

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id!);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    await deletePost(id!);
    navigate("/");
  };

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">

      {/* TITLE + ACTION ICONS */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* EDIT + DELETE (only for my posts) */}
        {fromMyPosts && user?._id === post.author?._id && (
          <div className="flex gap-5 text-2xl">
            <FiEdit
              className="cursor-pointer text-gray-600 hover:text-blue-600 transition"
              onClick={() => navigate(`/edit/${id}`)}
            />
            <FiTrash2
              className="cursor-pointer text-gray-600 hover:text-red-600 transition"
              onClick={handleDelete}
            />
          </div>
        )}
      </div>

      {/* AUTHOR & DATE */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
          {post.author?.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-gray-700 font-medium">
            {post.author?.username}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed prose-img:rounded-xl prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

    </div>
  </div>
);

};

export default PostDetail;
