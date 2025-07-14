import React from "react";

const Ucard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoUrl, age, gender, about } = user;

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
            <button className="btn btn-success btn-sm">Interested</button>
            <button className="btn btn-outline btn-error btn-sm">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ucard;
