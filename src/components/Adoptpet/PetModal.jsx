import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function PetModal({ isOpen, onClose, pet }) {
  if (!pet) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Pet Details"
      className="bg-white rounded-xl p-6 max-w-lg mx-auto mt-20 outline-none shadow-2xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-3xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center backdrop-blur-sm"
      closeTimeoutMS={300} // smooth closing animation
      style={{
        content: {
          perspective: "1000px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          borderRadius: "1rem",
        }
      }}
    >
      <h2 className="text-3xl font-extrabold mb-4 text-gray-900">{pet.petname}</h2>
      <img
        src={pet.image || "https://via.placeholder.com/272x200"}
        alt={pet.petname}
        className="rounded-lg mb-4 shadow-lg"
        style={{ width: "100%", height: "12.5rem", objectFit: "cover", transformStyle: "preserve-3d", boxShadow: "0 6px 15px rgba(0,0,0,0.25)" }}
      />
      <div className="space-y-1 text-gray-700">
        <p><strong>Owner:</strong> {pet.ownername}</p>
        <p><strong>Contact:</strong> {pet.contactNumber}</p>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Breed:</strong> {pet.breed || "N/A"}</p>
        <p><strong>Color:</strong> {pet.colour}</p>
        <p><strong>Medical Issue:</strong> {pet.medicalIssue}</p>
        <p><strong>Address:</strong> {pet.address}</p>
        <p className="mt-3"><strong>Description:</strong> {pet.description}</p>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md transition duration-200"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
}

export default PetModal;
