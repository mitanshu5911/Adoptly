
import React from "react";
import { FaComments, FaPhoneAlt, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const RequestCard = ({ request, onAccept, onReject, onChat, onCall }) => {
  const { RequesterName, petName, status } = request;

  // ✅ Status color helper
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
    <div className="w-full max-w-md mx-auto my-4 p-5 bg-white rounded-2xl shadow-md border border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 leading-snug">
          <span className="text-[#24aeb1]">{RequesterName}</span>{" "}
          <span className="text-gray-600">is requesting to adopt</span>{" "}
          <span className="text-[#24aeb1] font-bold">{petName}</span>
        </h2>
      </div>

      {/* Status + Chat/Call buttons */}
      <div className="flex justify-between items-center mt-3">
        <div
          className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusStyle()}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onChat(request)}
            className="flex items-center gap-1 border border-[#24aeb1] text-[#24aeb1] px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#24aeb1] hover:text-white transition"
          >
            <FaComments className="text-sm" /> Chat
          </button>

          <button
            onClick={() => onCall(request)}
            className="flex items-center gap-1 border border-green-600 text-green-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-600 hover:text-white transition"
          >
            <FaPhoneAlt className="text-sm" /> Call
          </button>
        </div>
      </div>

      {/* Accept / Reject or Status Footer */}
      {status === "pending" ? (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onAccept(request)}
            className="flex items-center justify-center gap-1 w-[48%] bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition font-medium"
          >
            <FaCheckCircle /> Accept
          </button>

          <button
            onClick={() => onReject(request)}
            className="flex items-center justify-center gap-1 w-[48%] bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition font-medium"
          >
            <FaTimesCircle /> Reject
          </button>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center gap-2 mt-5 px-3 py-2 rounded-md font-medium ${getStatusStyle()}`}
        >
          {status === "accepted" ? (
            <FaCheckCircle className="text-green-600" />
          ) : status === "rejected" ? (
            <FaTimesCircle className="text-red-600" />
          ) : (
            <FaClock className="text-yellow-600" />
          )}
          <span>
            {status === "accepted"
              ? "Request Accepted"
              : status === "rejected"
              ? "Request Rejected"
              : "Pending Approval"}
          </span>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
