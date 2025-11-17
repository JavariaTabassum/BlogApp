// import { Link } from "react-router-dom";

// interface PostProps {
//   post: {
//     _id: string;
//     title: string;
//     content: string;
//     image?: string;
//     author: {
//       _id: string;
//       username: string;
//       email: string;
//     } | null;
//     createdAt: string;
//   };
// }

// const PostCard = ({ post }: PostProps) => {
//   return (
//     <Link to={`/post/${post._id}`} className="block">
//       <div className="bg-white rounded-xl shadow-md border hover:shadow-lg transition cursor-pointer w-full max-w-[320px]">

//         {/* IMAGE WITH SIDE PADDING */}
//         {post.image && (
//           <div className="p-2">
//             <div className="w-full aspect-square bg-gray-100 overflow-hidden rounded-lg">
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         )}

//         <div className="px-3 pb-3">

//           {/* TITLE */}
//           <h2 className="text-lg font-semibold mb-1 line-clamp-1">
//             {post.title}
//           </h2>

//           {/* CONTENT PREVIEW - MAX 3 LINES */}
//           <div
//             className="text-gray-600 text-sm mb-2 line-clamp-3 break-all"
//             dangerouslySetInnerHTML={{ __html: post.content }}
//           />

//           {/* READ MORE BUTTON */}
//           <Link
//             to={`/post/${post._id}`}
//             className="text-blue-600 text-xs font-medium underline block mb-2"
//           >
//             Read More →
//           </Link>

//           {/* AUTHOR */}
//           <p className="text-xs text-gray-500">
//             ✍️ {post.author?.username || "Unknown"}
//           </p>

//           {/* DATE */}
//           <p className="text-xs text-gray-400">
//             {new Date(post.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PostCard;

// import { Link } from "react-router-dom";


// interface PostProps {
//   post: {
//     _id: string;
//     title: string;
//     content: string;
//     image?: string;
//     author: {
//       _id: string;
//       username: string;
//       email: string;
//     } | null;
//     createdAt: string;
//   };
//   showActions?: boolean; // will show edit/delete when true (View My Posts)
//   fromMyPosts?: boolean; // Used to display edit/delete in My Posts
// }

// const PostCard = ({ post, showActions = false }: PostProps) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md border hover:shadow-lg transition w-full max-w-[320px] p-2">

//       {/* Image */}
//       {post.image && (
//         <div className="w-full aspect-square overflow-hidden rounded-lg mb-2">
//           <img
//             src={post.image}
//             alt={post.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       {/* Entire card clickable except buttons */}
//       <Link to={`/post/${post._id}`} state={{ fromMyPosts: showActions }} className="block">
//         <h2 className="text-lg font-semibold mb-1 line-clamp-1">{post.title}</h2>

//         <div
//           className="text-gray-600 text-sm mb-2 line-clamp-3 break-all"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />

//         <p className="text-xs text-gray-500">
//           ✍️ {post.author?.username || "Unknown"}
//         </p>
//         <p className="text-xs text-gray-400">
//           {new Date(post.createdAt).toLocaleDateString()}
//         </p>
//       </Link>

//       {/* {showActions && (
//         <div className="flex justify-between mt-3">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               navigate(`/edit/${post._id}`);
//             }}
//             className="text-blue-600 text-sm font-medium"
//           >
//             Edit
//           </button>

//           <button
//             onClick={handleDelete}
//             className="text-red-600 text-sm font-medium"
//           >
//             Delete
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default PostCard;

import { Link } from "react-router-dom";

interface PostProps {
  post: {
    _id: string;
    title: string;
    content: string;
    image?: string;
    author: {
      _id: string;
      username: string;
      email: string;
    } | null;
    createdAt: string;
  };
  showActions?: boolean; 
  fromMyPosts?: boolean;
}

const PostCard = ({ post, showActions = false }: PostProps) => {
  return (
    <div className="
      bg-white 
      rounded-2xl 
      shadow-md 
      hover:shadow-xl 
      border 
      hover:border-blue-300 
      transition-all 
      duration-200 
      w-full 
      max-w-[350px] 
      p-4
      cursor-pointer
    ">

      {/* Image Section */}
      {post.image && (
        <div className="w-full h-48 rounded-xl overflow-hidden mb-3">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Clickable Content */}
      <Link 
        to={`/post/${post._id}`} 
        state={{ fromMyPosts: showActions }} 
        className="block"
      >
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {post.title}
        </h2>

        {/* Content Preview */}
        <div
          className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3 break-word"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Meta Info */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>✍️ {post.author?.username || "Unknown"}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </Link>

    </div>
  );
};

export default PostCard;
