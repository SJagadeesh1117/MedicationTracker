import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ make sure this is imported
import backgroundVideo from "../assets/background.mp4";

const API_BASE = "http://127.0.0.1:8000/api";

function AddElderly() {
  const [elderId, setElderId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

    const navigate = useNavigate(); // ✅ initialize navigate
    const location = useLocation();

  // Hybrid approach: get from Router state first, fallback to localStorage
  const guardianId = location.state?.guardianId || localStorage.getItem("guardian_id");

  const handleAddElderly = async () => {
    try {
      const res = await axios.post(`${API_BASE}/add_elderly_by_guardian/`, {
        guardian_id: guardianId,
        elder_id: elderId,
        name,
      });
      setMessage(`✅ Elderly "${res.data.name}" added successfully!`);
      setElderId("");
      setName("");
    } catch (error) {
    console.error("Error adding elderly", error);

    if (error.response && error.response.data?.error) {
      setMessage(`❌ Failed to add: ${error.response.data.error}`);
    } else {
      setMessage("❌ Failed to add elderly. Please try again.");
    }
  }
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl max-w-lg mx-auto mt-12">

        
    
    {/* Background video with Tailwind zoom animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 animate-zoom-slow"
        >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    
     <button
        onClick={() => navigate("/guardian-dashboard/")}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Return to Dashboard
      </button>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

      <h2 className="text-2xl font-bold mb-6 text-center">Add Elderly 👵👴</h2>
      {message && (
        <p className="mb-4 text-center text-blue-700 bg-blue-100 p-3 rounded-lg">
          {message}
        </p>
      )}
      <input
        type="text"
        placeholder="Elderly ID"
        value={elderId}
        onChange={(e) => setElderId(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg"
      />
      <input
        type="text"
        placeholder="Elderly Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg"
      />
      <button
        onClick={handleAddElderly}
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
      >
        Add Elderly
      </button>
    </div>
  );
}

export default AddElderly;
