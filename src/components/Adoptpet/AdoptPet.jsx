import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import PetModal from "./PetModal";

function AdoptPet() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getpet");
        if (Array.isArray(res.data)) {
          setPets(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setPets([]);
        }
      } catch (err) {
        console.error("Error fetching pets:", err);
      }
    };
    fetchPets();
  }, []);

  const openModal = (pet) => {
    setSelectedPet(pet);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPet(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Adopt a Pet</h1>
      <div className="flex flex-wrap">
        {pets.map((pet) => (
          <Card key={pet._id} pet={pet} onMoreInfo={() => openModal(pet)} />
        ))}
      </div>

      {/* Modal Component */}
      <PetModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        pet={selectedPet}
      />
    </div>
  );
}

export default AdoptPet;
