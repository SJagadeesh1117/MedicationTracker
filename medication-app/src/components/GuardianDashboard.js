import React, { useEffect, useState } from "react";
import { getGuardianElderlyDetails, getElderlyMedications, addMedication } from "../api";
import { useNavigate } from "react-router-dom"; // ✅ make sure this is imported
import { useLocation } from "react-router-dom";
import backgroundVideo from "../assets/background.mp4";

function GuardianDashboard() {
  const [elderlies, setElderlies] = useState([]);
  const [selectedElderly, setSelectedElderly] = useState(null);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false);
  const [newMedication, setNewMedication] = useState({
    medication_name: "",
    dosage: "",
    instructions: ""
  });

  const navigate = useNavigate(); // ✅ initialize navigate
  const location = useLocation();

  // Hybrid approach: get from Router state first, fallback to localStorage
  const guardianId = location.state?.guardianId || localStorage.getItem("guardian_id");


    useEffect(() => {
      setTimeout(() => setAnimate(true), 100);
    }, []);

// ✅ Connect to WebSocket when component mounts
  useEffect(() => {
    if (!guardianId) return;

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/guardian/${guardianId}/`);

    ws.onopen = () => {
      console.log("✅ WebSocket connected for guardian:", guardianId);
    };

    ws.onmessage = (event) => {
      console.log("📩 Live update received:", event.data);
      const data = JSON.parse(event.data);
      console.log("📩 Live update:", data);

      // Update medications list in real time
      setMedications((prev) =>
        prev.map((med) =>
          med.elder_id === data.elder_id ? { ...med, status: data.status } : med
        )
      );

      setMessage(`🔄 Status update: ${data.name} updated the status of medicine: "${data.medication_name}" to ${data.status}`);
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("⚠️ WebSocket closed");
    };

    // Cleanup when component unmounts
    return () => ws.close();
  }, [guardianId]);



















  // Fetch elderlies on load
  // 👇 This useEffect triggers API call on component mount
  useEffect(() => {
    const fetchElderlies = async () => {
      try {
        console.log("Fetching elderlies for guardian:", guardianId);
        const res = await getGuardianElderlyDetails(guardianId);
        console.log("API Response:", res.data);
        setElderlies(res.data.elderlies || []);
      } catch (error) {
        console.error("Error fetching elderly list", error);
        setMessage("❌ Failed to load elderly list.");
      }
    };

    fetchElderlies();
  }, [guardianId]); // runs whenever guardianId changes






  // Handle elderly click
const handleSelectElderly = (elder) => {
  setSelectedElderly(elder); 
  fetchMedications(elder.elder_id); // ✅ only pass elder_id to the API
};




// const fetchMedications = async (elderId) => {
//   try {
//     const res = await getElderlyMedications(elderId);
//     setMedications(res.data.medications || []);
//   } catch (error) {
//     console.error("Error fetching medications", error);
//   }
// };


const fetchMedications = async (elderId) => {
  try {
    const id = elderId || selectedElderly?.elder_id; // fallback to selectedElderly
    if (!id) {
      setMessage("⚠️ Please select an Elderly first.");
      return;
    }

    const res = await getElderlyMedications(id);
    setMedications(res.data.medications || []);
  } catch (error) {
    console.error("Error fetching medications", error);
  }
};








  // Add medication
  const handleAddMedication = async () => {
  console.log("Add Medication button clicked ✅");

  if (!selectedElderly) {
    setMessage("⚠️ Please select an Elderly first.");
    return;
  }

  try {
    const payload = {
      elder_id: selectedElderly.elder_id,
      guardian_id: guardianId,
      medication_name: newMedication.medication_name,
      dosage: newMedication.dosage,
      instructions: newMedication.instructions,
    };

    // console.log("Sending request:", payload);

    const res = await addMedication(payload);

    // setMessage(`✅ Medication "${newMedication.medication_name}" added!`);
    // console.log("API Response:", res.data);

if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to add medication");
    }

    setMessage(`✅ Medication "${newMedication.medication_name}" added!`);
    console.log("API Response:", res.data);

    // refresh the medication list
    // ✅ pass elderId explicitly
    await fetchMedications(selectedElderly.elder_id);

    // reset inputs
    setNewMedication({ medication_name: "", dosage: "", instructions: "" });

  } catch (error) {
    console.error("Error adding medication", error);
    setMessage("❌ Failed to add medication.");
  }
};



const handleLogout = () => {
  localStorage.removeItem("guardian_id"); // remove guardian login
  localStorage.removeItem("elderly_id");  // optional: clear elderly login too
  window.location.href = "/"; // redirect to login
};







  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl max-w-4xl mx-auto mt-8">
            {/* <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden"> */}
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
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
            Logout
        </button>

      <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
        Guardian Dashboard 🛡️
      </h2>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

      {message && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
          {message}
        </div>
      )}



      <button
        onClick={() => navigate("/guardian/add-elderly")}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        ➕ Add Elderly
      </button>




      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Your Elderly Users
      </h3>



 {elderlies.length === 0 ? (
  <p className="text-gray-600 text-center">No elderlies linked yet.</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    {elderlies.map((elder) => (
      <div
        key={elder.elder_id}
        onClick={() => handleSelectElderly(elder)}  // ✅ pass whole object
        className={`p-5 border rounded-xl cursor-pointer transition transform hover:scale-105 ${
          selectedElderly?.elder_id === elder.elder_id
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-white"
        }`}
      >
        <p className="font-bold text-lg">{elder.name || "Unnamed Elderly"}</p>
        <p className="text-sm text-gray-600">ID: {elder.elder_id}</p>
        <p className="text-sm text-gray-600">Age: {elder.age}</p>
      </div>
    ))}
  </div>
)}





      {loading && <p className="text-center text-gray-600">Loading medications...</p>}





  {selectedElderly && (
        <div className="mt-6 p-6 bg-gray-50 border rounded-2xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Add Medication for {selectedElderly.name}
          </h3>
          <input
            type="text"
            placeholder="Medication Name"
            value={newMedication.medication_name}
            onChange={(e) =>
              setNewMedication({ ...newMedication, medication_name: e.target.value })
            }
            className="w-full p-3 mb-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={newMedication.dosage}
            onChange={(e) =>
              setNewMedication({ ...newMedication, dosage: e.target.value })
            }
            className="w-full p-3 mb-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Instructions"
            value={newMedication.instructions}
            onChange={(e) =>
              setNewMedication({ ...newMedication, instructions: e.target.value })
            }
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <button
            onClick={handleAddMedication}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700"
          >
            Add Medication
          </button>
        </div>
      )}




      {selectedElderly && (
  <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-300">
    <h3 className="text-2xl font-semibold text-yellow-800 mb-4">
      Medications for {selectedElderly.name}
    </h3>

    {medications.length === 0 ? (
      <p className="text-gray-600 text-center text-lg py-6">
        ⚠️ No medications added yet.
      </p>
    ) : (
      medications.map((med) => (
        <div
          key={med.med_id}
          className="p-4 mb-4 border rounded-xl bg-white shadow hover:shadow-lg"
        >
          <p className="font-bold text-xl">{med.medication_name}</p>
          <p className="text-sm text-gray-600">
            Dosage: {med.dosage} | Instructions: {med.instructions}
          </p>
          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`font-semibold ${
                med.status === "TAKEN" ? "text-green-600" : "text-red-600"
              }`}
            >
              {med.status || "NOT_TAKEN"}
            </span>
          </p>
        </div>
      ))
    )}
  </div>
)}

    </div>
  );
}

export default GuardianDashboard;
