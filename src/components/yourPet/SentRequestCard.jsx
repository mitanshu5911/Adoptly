import React from "react";
import { Phone, MessageCircle, XCircle, CheckCircle, Clock } from "lucide-react";

const SentRequestCard = ({ request, onChat, onCall, onCancel }) => {
  const { petName, RequesterName, status } = request;

  // Colorized status
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
    <div className="w-full max-w-md mx-auto my-4 bg-gradient-to-br from-white to-cyan-50 border border-cyan-200 shadow-lg rounded-2xl transition-all hover:shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-cyan-100">
        <h2 className="text-lg font-semibold text-gray-800">
          You requested to adopt{" "}
          <span className="text-[#24aeb1] font-bold">{petName}</span>
        </h2>
      </div>

      {/* Status and actions */}
      <div className="flex items-center justify-between p-4">
        <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1 border rounded-full ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="capitalize">{status}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onChat(request)}
            className="flex items-center gap-1 border border-[#24aeb1] text-[#24aeb1] hover:bg-[#24aeb1] hover:text-white transition-all rounded-lg px-3 py-1"
          >
            <MessageCircle size={18} /> Chat
          </button>

          <button
            onClick={() => onCall(request)}
            className="flex items-center gap-1 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all rounded-lg px-3 py-1"
          >
            <Phone size={18} /> Call
          </button>
        </div>
      </div>

      {/* Footer (Cancel button only if pending) */}
      {status === "pending" && (
        <div className="p-3 border-t border-cyan-100 flex justify-center">
          <button
            onClick={() => onCancel(request)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            <XCircle size={18} /> Cancel Request
          </button>
        </div>
      )}
    </div>
  );
};

export default SentRequestCard;
