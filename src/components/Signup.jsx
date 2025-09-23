import { useState } from "react";
import Image from "../assets/SignUp.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
      });
      alert(response.data.msg || "Signup successful!"); // or wherever you want to redirect
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div
      className="w-full flex-grow flex justify-center items-center"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-[40rem] h-[25rem] rounded-xl flex flex-col justify-center items-center p-6 border-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderColor: "rgba(0, 0, 0, 0.13)",
        }}
      >
        <h2 className="text-gray-700 text-lg mb-2">JOIN THE ADVENTURE</h2>
        <h1 className="text-gray-800 text-3xl font-bold mb-6">Signup Form</h1>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-96">
          {/* Name Input */}
          <div className="relative flex items-center border border-gray-300 rounded-lg has-[:focus]:ring-2 has-[:focus]:ring-gray-800 transition-all">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg p-2 pr-10 focus:outline-none bg-transparent"
              placeholder="Name"
              required
            />
            <UserIcon className="h-5 w-5 absolute right-3 text-gray-500 pointer-events-none" />
          </div>

          {/* Email Input */}
          <div className="relative flex items-center border border-gray-300 rounded-lg has-[:focus]:ring-2 has-[:focus]:ring-gray-800 transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg p-2 pr-10 focus:outline-none bg-transparent"
              placeholder="Email"
              required
            />
            <EnvelopeIcon className="h-5 w-5 absolute right-3 text-gray-500 pointer-events-none" />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center border border-gray-300 rounded-lg has-[:focus]:ring-2 has-[:focus]:ring-gray-800 transition-all">
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
          </div>
          <button
            type="submit"
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-gray-900 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
