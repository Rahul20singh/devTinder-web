import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userData || Object.keys(userData).length === 0) {
        try {
          const userProfile = await axios.get(BASE_URL + "/profile", {
            withCredentials: true,
          });
          if (userProfile.data) {
            dispatch(addUser(userProfile.data));
          }
        } catch (error) {
          console.error("error:::", error);
          navigate("/login");
        }
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 🔁 Runs only once when Body mounts

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
