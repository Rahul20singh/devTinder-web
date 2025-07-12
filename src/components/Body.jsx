import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      const fetchUser = async () => {
        try {
          const userProfile = await axios.get(BASE_URL + "/profile", {
            withCredentials: true,
          });
          if (userProfile.data) {
            dispatch(addUser(userProfile.data));
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      };

      fetchUser();
    }
  }, [userData, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <NavBar />

      {/* Main Content - grows to push footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
};

export default Body;
