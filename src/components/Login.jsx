import React, { useState } from "react";
import Image from "../assets/Login.jpg";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion"; // ✅ for animations
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/login",{
            email,
            password
        });
        const {token,user} = response.data;
        console.log(user._id);
        alert("Logedd in");
        login(user,token);
        navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data?.msg || "Login failed. Please try again.");   
    }
  }
  return (
    <div
      className="w-full  flex flex-grow justify-end items-center px-5 relative overflow-hidden"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Animated floating leaf elements */}
      

      {/* Login card */}
      <motion.div
        className="w-[30rem] h-[25rem] rounded-2xl flex flex-col p-6 border-10 justify-center items-center shadow-2xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderColor: "rgba(0, 0, 0, 0.13)",
        }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          rotateY: 5,
          rotateX: 5,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <motion.h2
          className="text-gray-700 text-lg mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Welcome Again
        </motion.h2>
        <motion.h1
          className="text-gray-800 text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Login
        </motion.h1>

        <motion.form
          className="flex flex-col gap-4 w-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onSubmit={handleSubmit}
        >
          {/* Email input */}
          <motion.div
            className="relative flex items-center border border-gray-300 rounded-lg has-[:focus]:ring-2 has-[:focus]:ring-gray-800 transition-all"
            whileFocus={{ scale: 1.03 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg p-2 pr-10 focus:outline-none bg-transparent"
              placeholder="Email"
              required
            />
            <EnvelopeIcon className="h-5 w-5 absolute right-3 text-gray-500 pointer-events-none" />
          </motion.div>

          {/* Password input */}
          <motion.div
            className="relative flex items-center border border-gray-300 rounded-lg has-[:focus]:ring-2 has-[:focus]:ring-gray-700 transition-all"
            whileFocus={{ scale: 1.03 }}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg p-2 pr-10 focus:outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </span>
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

          <motion.div
            onClick={() =>navigate("/signup")}
            className="cursor-pointer text-gray-500 m-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New User?<u> Register Now</u>          
            </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
