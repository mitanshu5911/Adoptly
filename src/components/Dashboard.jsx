import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Adoptpet/Card";
import PetModal from "./Adoptpet/PetModal";

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // fetch pets only if logged in
      const fetchPets = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/getpet"); // ✅ backend URL
          if (Array.isArray(res.data)) {
            setPets(res.data);
          }
        } catch (err) {
          console.error("Error fetching pets:", err);
        }
      };
      fetchPets();
    }
  }, [isAuthenticated, navigate]);

    const openModal = (pet) => {
    setSelectedPet(pet);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPet(null);
  };


  return (
    <div className="p-4 " style={{ backgroundColor: "#DBF2AB" }}>
      <h1 className="text-2xl font-bold mb-4">Adopt Pet</h1>

      {/* Preview pets */}
      <div className="flex flex-wrap">
        {pets.slice(0, 4).map((pet) => (
          <Card key={pet._id} pet={pet} onMoreInfo={() => openModal(pet)}/>
        ))}
      </div>
        <PetModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                pet={selectedPet}
              />
      {/* See More button */}
      {pets.length > 4 && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate("/adoptpet")}
          >
            See More Pets →
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
