import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Card from "./Card";
import PetModal from "./PetModal";

function AdoptPet() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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
    <div className="relative flex flex-col items-center justify-start min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#e0fff4] via-[#f9ffef] to-[#d0f5c5] overflow-hidden">
      {/* Main content wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        {/* Page Header */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-[#24aeb1] mb-6 text-center drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          Adopt a Pet 🐾
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Find your new best friend today! Each pet is looking for a loving home.
          Explore the adorable furry friends waiting to meet you.
        </motion.p>

        {/* Pet Cards Grid */}
        {loading ? (
          <div className="text-lg text-gray-600 font-medium text-center animate-pulse">
            Loading pets...
          </div>
        ) : pets.length > 0 ? (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {pets.map((pet) => (
              <motion.div
                key={pet._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card pet={pet} onMoreInfo={() => openModal(pet)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-gray-500 mt-10 text-lg text-center">
            No pets available for adoption right now 🐕🐈
          </div>
        )}
      </div>

      {/* Modal */}
      <PetModal isOpen={modalIsOpen} onClose={closeModal} pet={selectedPet} />

      {/* Decorative Floating Elements */}
      <motion.div
        className="fixed top-10 left-10 w-16 h-16 bg-[#24aeb1]/20 rounded-full blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 right-20 w-24 h-24 bg-[#f8cdda]/30 rounded-full blur-2xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
    </div>
  );
}

export default AdoptPet;
