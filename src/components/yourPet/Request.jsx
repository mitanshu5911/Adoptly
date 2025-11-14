import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import RequestCard from "./RequestCard"; // For received requests
import SentRequestCard from "./SentRequestCard"; // ✅ New card for sent requests
import { motion } from "framer-motion";

function Request() {
  const { user } = useAuth();
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [activeTab, setActiveTab] = useState("received");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch all requests once
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user || !user._id) return;
      setLoading(true);
      setError("");

      try {
        const res = await axios.get("http://localhost:5000/api/getRequest", {
          params: { userId: user._id },
        });

        if (res.data && res.data.success) {
          const allRequests = res.data.data || [];
          setRequestsReceived(
            allRequests.filter(
              (r) => (r.ownerId?._id || r.ownerId) === user._id
            )
          );
          setRequestsSent(
            allRequests.filter(
              (r) => (r.requesterId?._id || r.requesterId) === user._id
            )
          );
        } else {
          setError(res.data.message || "Failed to fetch requests");
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(
          err.response?.data?.message ||
            "An unexpected error occurred while fetching requests"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // ✅ Actions
  const handleAccept = async (req) => {
    try {
      await axios.patch(`http://localhost:5000/api/request/${req._id}`, {
        status: "accepted",
      });
      setRequestsReceived((prev) =>
        prev.map((r) => (r._id === req._id ? { ...r, status: "accepted" } : r))
      );
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  const handleReject = async (req) => {
    try {
      await axios.patch(`http://localhost:5000/api/request/${req._id}`, {
        status: "rejected",
      });
      setRequestsReceived((prev) =>
        prev.map((r) => (r._id === req._id ? { ...r, status: "rejected" } : r))
      );
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  const handleCancel = async (req) => {
    try {
      await axios.delete(`http://localhost:5000/api/request/${req._id}`);
      setRequestsSent((prev) => prev.filter((r) => r._id !== req._id));
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  const handleChat = (req) => {
    console.log("Chat with:", req.RequesterName);
  };

  const handleCall = (req) => {
    console.log("Call to:", req.RequesterName);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading requests...</p>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4">
      {/* 🔘 Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-5 py-2 rounded-l-lg font-medium border transition-all ${
            activeTab === "received"
              ? "bg-[#24aeb1] text-white border-[#24aeb1]"
              : "bg-white text-[#24aeb1] border-[#24aeb1]"
          }`}
          onClick={() => {setActiveTab("received");
                  fetchRequests(); }}
        >
          Requests You Received
        </button>
        <button
          className={`px-5 py-2 rounded-r-lg font-medium border transition-all ${
            activeTab === "sent"
              ? "bg-[#24aeb1] text-white border-[#24aeb1]"
              : "bg-white text-[#24aeb1] border-[#24aeb1]"
          }`}
          onClick={() => {setActiveTab("sent"); fetchRequests();}}
        >
          Requests You Sent
        </button>
      </div>

      {/* 🧾 Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        {activeTab === "received" ? (
          requestsReceived.length > 0 ? (
            requestsReceived.map((req) => (
              <RequestCard
                key={req._id}
                request={req}
                onAccept={handleAccept}
                onReject={handleReject}
                onChat={handleChat}
                onCall={handleCall}
              />
            ))
          ) : (
            <p className="text-gray-500 mt-4">No requests received yet.</p>
          )
        ) : requestsSent.length > 0 ? (
          requestsSent.map((req) => (
            <SentRequestCard
              key={req._id}
              request={req}
              onChat={handleChat}
              onCall={handleCall}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-4">
            You haven’t sent any requests yet.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Request;
