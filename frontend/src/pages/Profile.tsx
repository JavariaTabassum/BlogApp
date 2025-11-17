import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="text-center mt-10">Not logged in.</p>;

 return (
  <div className="h-[673px] bg-gray-100 flex items-center justify-center px-4 py-10">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-fadeIn">

      {/* Avatar */}
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
        <span className="text-4xl font-bold text-white">
          {user.username?.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
        My Profile
      </h2>

      {/* Info Card */}
      <div className="text-left space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-600 text-sm font-semibold">Username</p>
          <p className="text-gray-900 text-lg font-medium">{user.username}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-600 text-sm font-semibold">Email</p>
          <p className="text-gray-900 text-lg font-medium">{user.email}</p>
        </div>
      </div>
    </div>
  </div>
);

};

export default Profile;
