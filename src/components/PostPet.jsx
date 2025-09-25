import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function PostPet() {
  const { isAuthenticated, user,token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    userId: "",
    petname: "",
    ownername: "",
    species: "",
    age: "",
    breed: "",
    image: "",
    description: "",
    contactNumber: "",
    colour: "",
    medicalIssue: "",
    address: "",
  });

  useEffect(() => {
    console.log("User from AuthContext:", user);
    if (user._id) {
      setFormData((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadToCloudinary = async (file, upload_preset) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dww5caj7u/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // gives url, secure_url, etc.
    } catch (error) {
      console.error(
        "Error uploading to Cloudinary:",
        error.response?.data || error.message
      );
      throw new Error("Cloudinary upload failed");
    }
  };

  const uploadPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const uploadData = await uploadToCloudinary(file, "Adoptly");

      setFormData((prev) => ({
        ...prev,
        image: uploadData.secure_url,
      }));
    } catch (error) {
      console.error("Failed to upload ID card:", error);
      alert("Error uploading ID card. Please try again.");
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        console.log("Submitting form data: ", formData);
        const response = await axios.post("http://localhost:5000/api/post",formData, { headers: { "x-auth-token": token } });
        console.log("Profile created successfully:", response.data);
      alert("Post successfully");
    } catch (error) {
        console.error(
        "Error creating profile:",
        error.response?.data || error.message
      );
      alert("Error creating profile. Please try again.");
    }
  }
  return (
    <>
      <div className="p-20" style={{ backgroundColor: "#DBF2AB" }}>
        <h2 className="text-4xl font-semibold mb-10">Post about Your Pet</h2>

        <form className="w-full" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Pet Name"
              name="petname"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
              required
            />
            <input
              type="text"
              placeholder="Owner Name"
              name="ownername"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
              required
            />

            <input
              type="text"
              placeholder="Species"
              name="species"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
              required
            />

            <input
              type="text"
              placeholder="Age of Pet"
              name="age"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
            />

            <input
              type="text"
              placeholder="Breed"
              name="breed"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
            />

            <input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
            />

            <input
              type="text"
              placeholder="ConTact Number"
              name="contactNumber"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
              required
            />

            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
              required
            />

            <input
              type="text"
              placeholder="Colour"
              name="colour"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
              required
            />

            <input
              type="text"
              placeholder="Medical issue if any"
              name="medicalIssue"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 pl-5 w-full mb-3 bg-white"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              className="input-field border border-gray-300 rounded-lg col-span-2 py-2 px-3"
            />
            {formData.image && (
                <img
                  src={formData.image}
                  className="w-52 h-52 object-cover mt-2 border-2 border-gray-300 rounded-lg"
                />
              )}

            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition w-full mt-5"
            >
              Post Pet
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostPet;
