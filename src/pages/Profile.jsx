import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Profile</h1>

      <div className="bg-white p-4 rounded shadow w-80">
        <p><b>Name:</b> {user?.name || "User"}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>
    </div>
  );
}

export default Profile;