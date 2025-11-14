// RequestCard.jsx
import React from "react";
import { FaComments, FaPhoneAlt, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const RequestCard = ({ request, onAccept, onReject, onChat }) => {
  const { RequesterName, petName, status } = request;

  const getStatusStyle = () => {
    switch (status) {
      case "accepted":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-yellow-600 bg-yellow-50";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 p-5 bg-white rounded-2xl shadow-md border hover:scale-[1.02] transition-transform">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          <span className="text-[#24aeb1]">{RequesterName}</span> wants to adopt{" "}
          <span className="text-[#24aeb1] font-bold">{petName}</span>
        </h2>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusStyle()}`}>
          {status}
        </div>

        <button
          onClick={() => onChat(request)}
          className="flex items-center gap-1 border border-[#24aeb1] text-[#24aeb1] px-3 py-1.5 rounded-md hover:bg-[#24aeb1] hover:text-white transition"
        >
          <FaComments /> Chat
        </button>
      </div>

      {status === "pending" ? (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onAccept(request)}
            className="w-[48%] bg-green-600 text-white py-2 rounded-md hover:bg-green-700 flex items-center justify-center gap-1"
          >
            <FaCheckCircle /> Accept
          </button>
          <button
            onClick={() => onReject(request)}
            className="w-[48%] bg-red-600 text-white py-2 rounded-md hover:bg-red-700 flex items-center justify-center gap-1"
          >
            <FaTimesCircle /> Reject
          </button>
        </div>
      ) : (
        <div
          className={`mt-4 px-3 py-2 rounded-md text-center flex items-center justify-center gap-2 ${getStatusStyle()}`}
        >
          {status === "accepted" ? <FaCheckCircle /> : status === "rejected" ? <FaTimesCircle /> : <FaClock />}
          {status}
        </div>
      )}
    </div>
  );
};

export default RequestCard;
