import React, { useEffect, useState } from "react";
import Ucard from "./Ucard";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [userUpdated, SetUserUpdate] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    city: "",
    skills: "",
    about: "",
    photoUrl: "",
  });

  // Fetch user on mount if not already available
  useEffect(() => {
    const fetchUser = async () => {
      console.log("got me here:::::::::::::::::::::::::::");
      try {
        const response = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });

        if (response.data) {
          setFormData({
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            age: response.data.age || "",
            gender: response.data.gender || "male",
            city: response.data.city || "",
            skills: response.data.skills?.join(", ") || "",
            about: response.data.about || "",
            photoUrl: response.data.photoUrl || "",
          });
          dispatch(addUser(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    console.log("johnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    if (!user) {
      fetchUser();
    } else {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "male",
        city: user.city || "",
        skills: user.skills?.join(", ") || "",
        about: user.about || "",
        photoUrl: user.photoUrl || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      console.log("33333333333333333333333", res.data);
      dispatch(addUser(res.data.user)); // update global state with new data
      SetUserUpdate(true);
      // Hide the toast after 3 seconds
      setTimeout(() => {
        SetUserUpdate(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading user profile...
      </div>
    );
  }

  return (
    formData &&
    formData.firstName && (
      <div className="flex justify-center items-start gap-10 p-6 flex-wrap md:flex-nowrap">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 p-6 shadow-xl rounded-2xl w-[350px] flex flex-col space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-violet-700">
            Edit Your Profile
          </h2>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <textarea
            name="about"
            placeholder="About you"
            value={formData.about}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
          <input
            type="text"
            name="photoUrl"
            placeholder="Profile Photo URL"
            value={formData.photoUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="btn px-6 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-semibold text-sm rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 tracking-wide"
            >
              Save Changes
            </button>
          </div>
        </form>
        {/* User Card */}
        <div className="flex justify-center items-start pt-6">
          <Ucard user={formData} />
        </div>
        {userUpdated && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
            <div className="alert alert-success shadow-lg">
              <span>User successfully updated.</span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditProfile;
