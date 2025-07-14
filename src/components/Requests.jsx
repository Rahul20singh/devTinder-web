import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      let res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));

      console.log("res::::::::::::", res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    if (requests) return;
    try {
      const allRequests = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );
      console.log("aaaaaaaaaaaaaaa", allRequests);
      const data = allRequests.data.result.map((req) => {
        return {
          _id: req._id,
          toUserId: req.toUserId,
        };
      });

      dispatch(addRequest(data));
    } catch (error) {
      console.error("Error fetching requests", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return <h1 className="flex justify-center my-10">No request Found</h1>;

  return (
    <div className="min-h-screen px-4">
      <h1 className="text-2xl font-bold text-center mt-6">
        Connections Requests
      </h1>

      <div className="flex flex-col items-center gap-6 mt-6">
        {requests &&
          requests.map((user) => (
            <div
              key={user.toUserId._id}
              className="card card-side bg-base-100 shadow-md"
            >
              <figure className="w-20 h-full overflow-hidden">
                <img
                  src={
                    user?.toUserId?.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  }
                  alt="User"
                  className="object-cover w-full h-full rounded-l-lg"
                />
              </figure>

              <div className="card-body p-3 text-sm w-full">
                <div className="flex items-center justify-between h-full w-full">
                  {/* Text section */}
                  <div className="flex flex-col justify-center gap-1">
                    <h5 className="font-semibold text-sm">
                      {user.toUserId.firstName} {user.toUserId.lastName}
                    </h5>
                    <p className="text-xs text-gray-700">
                      {user.toUserId.age} • {user.toUserId.gender}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {user.toUserId.about || "No bio provided."}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-10">
                    <button
                      onClick={() => reviewRequest("accepted", user._id)}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => reviewRequest("rejected", user._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Requests;
