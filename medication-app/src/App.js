// // import React, { useState } from "react";
// // import ElderlyDashboard from "./components/ElderlyDashboard";
// // import GuardianDashboard from "./components/GuardianDashboard";
// // import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// // import AddElderly from "./components/AddElderly";

// // function App() {
// //   const [viewMode, setViewMode] = useState(null);
// //   const elderId = "ELD-806A18"; // Example, later from API
// //   const guardianId = "GDN-117EF2FE"; // Example, later from login

// //   if (!viewMode) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
// //         <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
// //           <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
// //             Welcome! 👋
// //           </h1>
// //           <p className="text-lg text-gray-600 mb-8">
// //             Please select your role to continue:
// //           </p>
// //           <div className="space-y-6">
// //             <button
// //               onClick={() => setViewMode("elderly")}
// //               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-2xl shadow hover:opacity-90"
// //             >
// //               I am an Elderly Person
// //             </button>
// //             <button
// //               onClick={() => setViewMode("guardian")}
// //               className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-2xl shadow hover:opacity-90"
// //             >
// //               I am a Guardian
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/guardian" element={<GuardianDashboard guardianId={guardianId} />} />
// //         <Route path="/add-elderly" element={<AddElderly guardianId={guardianId} />} />
// //         <Route
// //           path="/"
// //           element={
// //             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
// //               <h1 className="text-4xl font-bold mb-6">Welcome 🚀</h1>
// //               <Link
// //                 to="/guardian"
// //                 className="bg-purple-600 text-white px-6 py-3 rounded-xl"
// //               >
// //                 Go to Guardian Dashboard
// //               </Link>
// //             </div>
// //           }
// //         />
// //       </Routes>
// //     </Router>
// //   );

// //   if (viewMode === "elderly") {
// //     return <ElderlyDashboard elderId={elderId} />;
// //   }

// //   if (viewMode === "guardian") {
// //     return <GuardianDashboard guardianId={guardianId} />;
// //   }
// // }

// // export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import GuardianDashboard from "./components/GuardianDashboard";
// import AddElderly from "./components/AddElderly";
// import ElderlyDashboard from "./components/ElderlyDashboard";

// function App() {
//   const [role, setRole] = useState(null);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Routes>
//           {/* Landing Page */}
//           <Route
//             path="/"
//             element={
//               <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//                 <h1 className="text-4xl font-bold mb-8">Welcome 🚀</h1>
//                 <div className="space-y-6">
//                   <Link
//                     to="/elderly"
//                     className="bg-blue-600 text-white py-4 px-6 rounded-xl"
//                   >
//                     I am an Elderly
//                   </Link>
//                   <Link
//                     to="/guardian"
//                     className="bg-purple-600 text-white py-4 px-6 rounded-xl"
//                   >
//                     I am a Guardian
//                   </Link>
//                 </div>
//               </div>
//             }
//           />

//           {/* Elderly Dashboard */}
//           <Route path="/elderly" element={<ElderlyDashboard elderId="ELD-9A221B" />} />

//           {/* Guardian Dashboard */}
//           <Route
//             path="/guardian"
//             element={<GuardianDashboard guardianId="GDN-117EF2FE" />}
//           />

//           {/* Add Elderly Page */}
//           <Route
//             path="/guardian/add-elderly"
//             element={<AddElderly guardianId="GDN-117EF2FE" />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;






import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "./components/LaunchPage";
import GuardianDashboard from "./components/GuardianDashboard";
import ElderlyDashboard from "./components/ElderlyDashboard";
import AddElderly from "./components/AddElderly";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationPage from "./components/RegistrationPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/register" element={<RegistrationPage />} />
                {/* <Route path="/register" element={<ProtectedRoute allowedKey="guardian_id"><RegistrationPage /></ProtectedRoute>} /> */}
        <Route path="/guardian-dashboard" element={<ProtectedRoute allowedKey="guardian_id"><GuardianDashboard /></ProtectedRoute>} />
        <Route path="/elderly-dashboard" element={<ProtectedRoute allowedKey="elderly_id"><ElderlyDashboard /></ProtectedRoute>} />
        <Route path="guardian/add-elderly" element={<ProtectedRoute allowedKey="guardian_id"><AddElderly /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
