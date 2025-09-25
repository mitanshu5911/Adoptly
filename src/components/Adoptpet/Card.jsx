import React from "react";

function Card({ pet, onMoreInfo }) {
  return (
    <div
      className="border rounded-lg shadow-md flex flex-col items-center p-2 m-2 transition-transform"
      style={{ width: "17rem" }}
    >
      <img
        src={pet.image || "https://via.placeholder.com/272x200"}
        alt={pet.petname}
        className="rounded-md mb-2"
        style={{ width: "100%", height: "12.5rem", objectFit: "cover" }}
      />

      <h2 className="font-bold text-lg">{pet.petname}</h2>
      <span>Owner: {pet.ownername}</span>
      <span>Contact: {pet.contactNumber}</span>

      <button
        onClick={onMoreInfo}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        More Info
      </button>
    </div>
  );
}

export default Card;
