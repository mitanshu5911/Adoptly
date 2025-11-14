import React from "react";
import { motion } from "framer-motion";

function Card({ pet, onMoreInfo }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl shadow-xl p-4 m-3 w-72 bg-gradient-to-br from-[#ffffffaa] to-[#e0fff4] backdrop-blur-md border border-white/30 flex flex-col items-center"
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#24aeb1] via-[#9cf3e3] to-[#f8cdda] opacity-30 blur-2xl -z-10"></div>

      {/* Pet Image */}
      <motion.img
        src={pet.image || "https://via.placeholder.com/272x200"}
        alt={pet.petname}
        className="rounded-2xl shadow-md mb-3"
        style={{ width: "100%", height: "12rem", objectFit: "cover" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Pet Name */}
      <h2 className="font-extrabold text-xl text-gray-800 mt-1 tracking-wide drop-shadow-sm">
        {pet.petname}
      </h2>

      {/* Pet Details */}
      <div className="text-center text-gray-700 mt-3 space-y-1 text-sm font-medium">
        <p>
          <span className="text-[#24aeb1] font-semibold">Species:</span>{" "}
          {pet.species}
        </p>
        <p>
          <span className="text-[#24aeb1] font-semibold">Age:</span> {pet.age}
        </p>
        <p>
          <span className="text-[#24aeb1] font-semibold">Breed:</span>{" "}
          {pet.breed || "Not specified"}
        </p>
        <p>
          <span className="text-[#24aeb1] font-semibold">Owner:</span>{" "}
          {pet.ownername}
        </p>
      </div>

      {/* More Info Button */}
      <motion.button
        onClick={onMoreInfo}
        className="mt-5 px-5 py-2 bg-gradient-to-r from-[#24aeb1] to-[#68d8d6] text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:from-[#1b8e90] hover:to-[#4ec4c3] transition-all duration-300"
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        More Info
      </motion.button>
    </motion.div>
  );
}

export default Card;
