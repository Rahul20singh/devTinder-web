import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const Ucard = ({ user }) => {
  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (id, status) => {
    try {
      let sendRequest = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log("sssssssssss", sendRequest);
      dispatch(removeFeed(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-100 shadow-xl w-80 overflow-hidden rounded-xl mt-100">
        {/* Strict container to bound the image */}
        <div className="h-48 w-full overflow-hidden flex justify-center items-center bg-gray-100">
          <img
            src={photoUrl || "https://i.pravatar.cc/300?img=12"}
            alt={`${firstName}'s profile`}
            className="h-full object-cover"
          />
        </div>

        <div className="card-body">
          <h2 className="card-title text-lg">
            {firstName} {lastName}
            <div className="badge badge-secondary capitalize">{gender}</div>
          </h2>
          <p className="text-sm text-gray-600">Age: {age}</p>
          <p className="text-sm">{about || "No bio added yet."}</p>

          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleSendRequest(_id, "intersted")}
            >
              Interested
            </button>
            <button
              className="btn btn-outline btn-error btn-sm"
              onClick={() => handleSendRequest(_id, "ignored")}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ucard;
