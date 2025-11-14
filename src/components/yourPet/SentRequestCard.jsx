// SentRequestCard.jsx
import React from "react";
import { MessageCircle, Phone, XCircle, CheckCircle, Clock } from "lucide-react";

const SentRequestCard = ({ request, onChat, onCancel }) => {
  const { petName, status } = request;

  const getStatusColor = () => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={18} />;
      case "rejected":
        return <XCircle size={18} />;
      default:
        return <Clock size={18} />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 bg-white shadow-lg border rounded-2xl">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          You requested to adopt <span className="text-[#24aeb1]">{petName}</span>
        </h2>
      </div>

      <div className="flex justify-between items-center p-4">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          {status}
        </div>

        <button
          onClick={() => onChat(request)}
          className="flex items-center gap-1 border border-[#24aeb1] text-[#24aeb1] px-3 py-1 rounded-lg hover:bg-[#24aeb1] hover:text-white"
        >
          <MessageCircle size={18} /> Chat
        </button>
      </div>

      {status === "pending" && (
        <div className="p-3 border-t flex justify-center">
          <button
            onClick={() => onCancel(request)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <XCircle size={18} /> Cancel Request
          </button>
        </div>
      )}
    </div>
  );
};

export default SentRequestCard;
