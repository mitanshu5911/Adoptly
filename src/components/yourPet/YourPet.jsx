import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { PawPrint, MapPin, Trash2, Heart, Calendar, Dog } from "lucide-react";

const YourPet = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);

  // ✅ Fetch only user's pets
  useEffect(() => {
    const fetchUserPets = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get("http://localhost:5000/api/mypets", {
          params: { userId: user._id },
        });
        setPets(res.data);
      } catch (error) {
        console.error("Error fetching your pets:", error);
      }
    };
    fetchUserPets();
  }, [user]);

  // ✅ Delete pet
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7f8] to-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#24aeb1] tracking-wide">
        🐾 Your Adorable Pets
      </h1>

      {pets.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven’t posted any pets yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="relative bg-white w-full max-w-[380px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.petname}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Dog size={22} className="text-[#24aeb1]" />
                    {pet.petname}
                  </h2>
                  <Heart
                    size={22}
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  />
                </div>

                <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                  <PawPrint size={18} className="text-[#24aeb1]" />
                  <strong>Species:</strong> {pet.species}
                </p>
                <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                  <Calendar size={18} className="text-[#24aeb1]" />
                  <strong>Age:</strong> {pet.age}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Breed:</strong> {pet.breed || "Not specified"}
                </p>
                <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-[#24aeb1]" />
                  <strong>Location:</strong> {pet.address}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all shadow-md"
                  >
                    <Trash2 size={18} /> Delete
                  </button>

                  <span className="text-sm text-gray-400">
                    Posted on{" "}
                    {(() => {
                      const d = new Date(pet.createdAt);
                      const day = String(d.getDate()).padStart(2, "0");
                      const month = String(d.getMonth() + 1).padStart(2, "0");
                      const year = d.getFullYear();
                      return `${day}/${month}/${year}`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourPet;
