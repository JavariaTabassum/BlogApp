// import { useEffect, useState } from "react";
// import { getPosts } from "../api/postApi";
// import PostCard from "../components/PostCard";

// const Home = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [showMyPosts, setShowMyPosts] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchPosts = async (mine = false) => {
//     setLoading(true);
//     try {
//       const { data } = await getPosts(mine);
//       setPosts(data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(false); // load all posts initially
//   }, []);

//   return (
//     <div className="mt-6 p-4">

//       {/* Toggle Buttons */}
//       <div className="text-center mb-6 flex justify-center gap-4">
//         {!showMyPosts ? (
//           <button
//             onClick={() => {
//               setShowMyPosts(true);
//               fetchPosts(true);
//             }}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
//           >
//             View My Posts
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               setShowMyPosts(false);
//               fetchPosts(false);
//             }}
//             className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
//           >
//             Back to All Posts
//           </button>
//         )}
//       </div>

//       {/* Posts Section */}
//       {loading ? (
//         <p className="text-center text-gray-500">Loading posts...</p>
//       ) : posts.length > 0 ? (
//         <div
//           className="grid 
//           grid-cols-1 
//           sm:grid-cols-2 
//           md:grid-cols-3 
//           gap-6
//           place-items-center"
//         >
//           {posts.map((post) => (
//             <PostCard
//               key={post._id}
//               post={post}
//               showActions={showMyPosts}       // Only show edit/delete in My Posts
//               fromMyPosts={showMyPosts}       // Pass info to PostDetail
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center">
//           {showMyPosts ? "You have no posts yet." : "No posts available."}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Home;

// import { useEffect, useState } from "react";
// import { getPosts } from "../api/postApi";
// import PostCard from "../components/PostCard";

// const Home = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [showMyPosts, setShowMyPosts] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchPosts = async (mine = false) => {
//     setLoading(true);
//     try {
//       const { data } = await getPosts(mine);
//       setPosts(data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(false);
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-linear-to-br from-blue-50 to-blue-100 px-6 py-10">

//       {/* Page Title */}
//       <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
//         {showMyPosts ? "My Posts" : "All Posts"}
//       </h1>

//       {/* Toggle Buttons */}
//       <div className="text-center mb-10 flex justify-center">
//         {!showMyPosts ? (
//           <button
//             onClick={() => {
//               setShowMyPosts(true);
//               fetchPosts(true);
//             }}
//             className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-md transition-all active:scale-95"
//           >
//             View My Posts
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               setShowMyPosts(false);
//               fetchPosts(false);
//             }}
//             className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl shadow-md transition-all active:scale-95"
//           >
//             Back to All Posts
//           </button>
//         )}
//       </div>

//       {/* Posts Section */}
//       {loading ? (
//         <p className="text-center text-gray-600 text-lg">Loading posts...</p>
//       ) : posts.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
//           {posts.map((post) => (
//             <PostCard
//               key={post._id}
//               post={post}
//               showActions={showMyPosts}
//               fromMyPosts={showMyPosts}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600 text-lg">
//           {showMyPosts ? "You have no posts yet." : "No posts available."}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Home;

// import { useEffect, useState, useContext } from "react";
// import { getPosts } from "../api/postApi";
// import PostCard from "../components/PostCard";
// import { AuthContext } from "../context/AuthContext"; // 👈 added

// const Home = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [showMyPosts, setShowMyPosts] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { user } = useContext(AuthContext); // 👈 get logged-in user

//   const fetchPosts = async (mine = false) => {
//     setLoading(true);
//     try {
//       const { data } = await getPosts(mine);
//       setPosts(data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(false);
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-linear-to-br from-blue-50 to-blue-100 px-6 py-10">
      
//       {/* Page Title */}
//       <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
//         {showMyPosts ? "My Posts" : "All Posts"}
//       </h1>

//       {/* Toggle Buttons (shown only when user is logged in) */}
//       <div className="text-center mb-10 flex justify-center">
//         {user && !showMyPosts && (
//           <button
//             onClick={() => {
//               setShowMyPosts(true);
//               fetchPosts(true);
//             }}
//             className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-md transition-all active:scale-95"
//           >
//             View My Posts
//           </button>
//         )}

//         {user && showMyPosts && (
//           <button
//             onClick={() => {
//               setShowMyPosts(false);
//               fetchPosts(false);
//             }}
//             className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl shadow-md transition-all active:scale-95"
//           >
//             Back to All Posts
//           </button>
//         )}
//       </div>

//       {/* Posts Section */}
//       {loading ? (
//         <p className="text-center text-gray-600 text-lg">Loading posts...</p>
//       ) : posts.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
//           {posts.map((post) => (
//             <PostCard
//               key={post._id}
//               post={post}
//               showActions={showMyPosts}
//               fromMyPosts={showMyPosts}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600 text-lg">
//           {showMyPosts ? "You have no posts yet." : "No posts available."}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Home;

// 

import { useEffect, useState, useContext } from "react";
import { getPosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchPosts = async (mine = false) => {
    setLoading(true);
    try {
      const { data } = await getPosts(mine);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(false);
  }, []);

  return (
    <div className="h-[673px] w-full flex flex-col bg-linear-to-br from-blue-50 to-blue-100 px-6 py-6">

      {/* ===== Top Right Button ===== */}
      {user && (
        <div className="flex justify-end mb-4">
          {!showMyPosts ? (
            <button
              onClick={() => {
                setShowMyPosts(true);
                fetchPosts(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition active:scale-95"
            >
              View My Posts
            </button>
          ) : (
            <button
              onClick={() => {
                setShowMyPosts(false);
                fetchPosts(false);
              }}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition active:scale-95"
            >
              View All Posts
            </button>
          )}
        </div>
      )}

      {/* ===== Intro Section ===== */}
      <div className="flex-none text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to MERN Blog
        </h1>

        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
          This is a modern MERN stack blogging platform where users can create, edit, 
          and share posts with the world. Explore posts from different users, write 
          your own articles, and enjoy a smooth and interactive reading experience.
        </p>
      </div>

      {/* ===== Posts Section (Scrollable) ===== */}
      <div className="flex-1 overflow-y-auto mt-4 pb-6">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                showActions={showMyPosts}
                fromMyPosts={showMyPosts}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            {showMyPosts ? "You have no posts yet." : "No posts available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;








