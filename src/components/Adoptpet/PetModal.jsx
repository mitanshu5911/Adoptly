import React from "react";
import Modal from "react-modal";
import { FaPaw, FaHeart, FaDog, FaCat, FaInfoCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

Modal.setAppElement("#root");

function PetModal({ isOpen, onClose, pet }) {
  if (!pet) return null;
  const {user} = useAuth();
  const getSpeciesIcon = (species) => {
    if (!species) return <FaPaw className="text-pink-400 text-3xl" />;
    return species.toLowerCase().includes("cat") ? (
      <FaCat className="text-orange-400 text-3xl" />
    ) : (
      <FaDog className="text-blue-400 text-3xl" />
    );
  };

  const handleRequest = async () =>{
    try {
        const requestData = {
          petId : pet._id,
          ownerId : pet.userId,
          requesterId : user._id,
          petName : pet.petname,
          RequesterName : user.name,
        }
        const response = await axios.post('http://localhost:5000/api/postRequest',requestData);

        if (response.data.success) {
        alert(`Request sent for adopting ${pet.petname}! 💖`);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending request");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Pet Details"
      className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 max-w-5xl w-[90%] mx-auto my-16 shadow-2xl outline-none transition-all duration-300 ease-in-out"
      overlayClassName="fixed inset-0 flex items-center justify-center z-50 bg-transparent"
      closeTimeoutMS={300}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center gap-3">
          {getSpeciesIcon(pet.species)}
          <h2 className="text-4xl font-extrabold text-gray-800">
            {pet.petname}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition text-2xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Layout - Wide two-column */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={pet.image || "https://via.placeholder.com/600x400?text=Adopt+Me!"}
            alt={pet.petname}
            className="rounded-2xl w-full h-[24rem] object-cover shadow-lg border border-gray-200"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 space-y-4 text-gray-700 text-lg">
          <div className="flex items-center gap-2">
            <FaInfoCircle className="text-blue-500 text-xl" />
            <p><strong>Species:</strong> {pet.species}</p>
          </div>

          <div className="flex items-center gap-2">
            <FaHeart className="text-pink-500 text-xl" />
            <p><strong>Age:</strong> {pet.age} years</p>
          </div>

          <div className="flex items-center gap-2">
            <FaPaw className="text-purple-500 text-xl" />
            <p><strong>Breed:</strong> {pet.breed || "Unknown"}</p>
          </div>

          <div className="flex items-center gap-2">
            <FaPaw className="text-green-500 text-xl" />
            <p><strong>Color:</strong> {pet.colour || "Not specified"}</p>
          </div>

          {pet.medicalIssue && (
            <div className="flex items-center gap-2">
              <FaInfoCircle className="text-red-500 text-xl" />
              <p><strong>Medical Issue:</strong> {pet.medicalIssue}</p>
            </div>
          )}

          {pet.description && (
            <p className="mt-3 text-gray-800">
              <strong>Description:</strong> {pet.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-start gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-300 transition duration-200"
            >
              Close
            </button>

            <button
              onClick={handleRequest}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg shadow-lg hover:opacity-90 transition duration-200 flex items-center gap-2"
            >
              <FaHeart /> Request for Pet
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PetModal;
