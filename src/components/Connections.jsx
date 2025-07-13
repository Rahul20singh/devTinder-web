import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const allConnections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(allConnections.data.data));
    } catch (error) {
      console.error("Error fetching connections", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen px-4">
      <h1 className="text-2xl font-bold text-center mt-6">Connections</h1>

      <div className="flex flex-col items-center gap-6 mt-6">
        {connections &&
          connections.map((user) => (
            <div
              key={user._id}
              className="card card-side bg-base-100 shadow-md"
            >
              <figure className="w-24 h-full overflow-hidden">
                <img
                  src={
                    user?.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  }
                  alt="User"
                  className="object-cover w-full h-full rounded-l-lg"
                />
              </figure>
              <div className="card-body p-3 text-sm flex flex-col justify-center gap-1">
                <h2 className="font-semibold text-sm">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-xs text-gray-700">
                  {user.age} • {user.gender}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {user.about || "No bio provided."}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connections;
