// import React, { useEffect, useState } from "react";
// import { getElderlyMedications } from "../api";

// function ElderlyDashboard({ elderId }) {
//   const [elderlyName, setElderlyName] = useState("Loading...");
//   const [medications, setMedications] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getElderlyMedications(elderId);
//         setElderlyName(res.data.elderly_name || "Elderly User");
//         setMedications(res.data.medications || []);
//       } catch (error) {
//         console.error("Error fetching medications", error);
//       }
//     };
//     fetchData();
//   }, [elderId]);

//   return (
//     <div className="p-8 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto mt-8">
//       <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
//         Hello, {elderlyName} 👋
//       </h2>
//       <p className="text-center text-gray-600 mb-6">
//         Share this ID with your guardian:
//         <span className="font-mono bg-blue-100 text-blue-700 px-3 py-2 rounded-xl block mt-2">
//           {elderId}
//         </span>
//       </p>

//       <h3 className="text-xl font-semibold mb-4 text-gray-700">
//         Your Medications
//       </h3>
//       {medications.length === 0 ? (
//         <p className="text-gray-600 text-center">No medications yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {medications.map((med) => (
//             <li
//               key={med.med_id}
//               className="p-4 border rounded-xl shadow hover:shadow-lg transition"
//             >
//               <p className="font-bold">{med.medication_name}</p>
//               <p className="text-sm text-gray-600">
//                 Dosage: {med.dosage} | Instructions: {med.instructions}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ElderlyDashboard;





import React, { useEffect, useState } from "react";
import { getElderlyMedications, markMedicationTaken } from "../api";
import { useLocation } from "react-router-dom";
import backgroundVideo from "../assets/background.mp4";


const ElderlyDashboard = () => {
  const [elderlyName, setElderlyName] = useState("Loading...");
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [message, setMessage] = useState("");
  const location = useLocation();

    // Hybrid approach: get from Router state first, fallback to localStorage
  const elderId = location.state?.elderId || localStorage.getItem("elderly_id");

  useEffect(() => {
    fetchMedications();
  }, [elderId]);

  const fetchMedications = async () => {
    try {
      const res = await getElderlyMedications(elderId);
      setElderlyName(res.data.elderly_name || "Elderly User");
      setMedications(res.data.medications || []);
    } catch (error) {
      console.error("Error fetching medications", error);
    }
  };


  const handleMarkStatus = async (status) => {
  try {
    // Build request body exactly as backend expects
    const requestBody = {
      med_id: selectedMedication.med_id,
      status: status,
    };

    await markMedicationTaken(requestBody);

    setMessage(`✅ ${selectedMedication.medication_name} marked as ${status}`);
    setSelectedMedication(null);
    fetchMedications(); // reload after update
  } catch (error) {
    setMessage("❌ Failed to update medication status.");
  }
};




const handleLogout = () => {
  localStorage.removeItem("guardian_id"); // remove guardian login
  localStorage.removeItem("elderly_id");  // optional: clear elderly login too
  window.location.href = "/"; // redirect to login
};




  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg max-w-3xl mx-auto mt-8">

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
         Hello, {elderlyName} 👋
      </h2>
      <p className="text-center text-gray-600 mb-6">
         Share this ID with your guardian:
         <span className="font-mono bg-blue-100 text-blue-700 px-3 py-2 rounded-xl block mt-2">
           {elderId}
         </span>
       </p>

       <h3 className="text-xl font-semibold mb-4 text-gray-700">
         Your Medications
       </h3>

      {/* {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded-lg mb-6 text-center">
          {message}
        </div>
      )} */}

            {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

      {medications.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No medications assigned yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {medications.map((med) => (
            <div
              key={med.med_id}
              className={`p-6 border rounded-2xl shadow-sm cursor-pointer ${
                selectedMedication?.med_id === med.med_id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => setSelectedMedication(med)}
            >
              <p className="font-bold text-xl text-gray-800">{med.medication_name}</p>
              <p className="text-sm text-gray-600">
                Dosage: <span className="font-medium">{med.dosage}</span>
              </p>
              <p className="text-sm text-gray-600">
                Instructions:{" "}
                <span className="font-medium">{med.instructions}</span>
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-bold ${
                    med.status === "TAKEN"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {med.status || "NOT_TAKEN"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedMedication && (
        <div className="mt-6 p-6 bg-gray-50 rounded-2xl border">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Update Status: {selectedMedication.name}
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleMarkStatus("TAKEN")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
            >
              Mark as TAKEN
            </button>
            <button
              onClick={() => handleMarkStatus("NOT_TAKEN")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
            >
              Mark as NOT TAKEN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElderlyDashboard;
