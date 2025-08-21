// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


// const LaunchPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState(""); // guardian / elderly

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!userType) {
//       setMessage("⚠️ Please select Guardian or Elderly.");
//       return;
//     }

//     // try {
//     //   const response = await axios.post("http://127.0.0.1:8000/api/guardian/login/", {
//     //     email,
//     //     password,
//     //   });

//      try {
//       const endpoint =
//         userType === "guardian"
//           ? "http://127.0.0.1:8000/api/guardian/login/"
//           : "http://127.0.0.1:8000/api/elderly/login/";

//       const response = await axios.post(endpoint, {
//         email,
//         password,
//       });

//       console.log("Login success:", response.data);

//       const data = response.data;

//     if (data.guardian_id) {
//         localStorage.setItem("guardian_id", data.guardian_id);
//         navigate("/guardian-dashboard", { state: { guardianId: data.guardian_id } });
//       } else if (data.elderly_id) {
//         localStorage.setItem("elderly_id", data.elderly_id);
//         navigate("/elderly-dashboard", { state: { elderlyId: data.elderly_id } });
//       } else {
//         setMessage("❌ No guardian_id or elderly_id found in response.");
//       }

//     } catch (error) {
//       console.error("Login failed", error);
//       setMessage("❌ Invalid email or password.");
//     }
//   };












//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Guardian / Elderly Login</h2>

//         {message && (
//           <p className="mb-4 text-center text-red-600 font-medium">{message}</p>
//         )}

//           <div className="mb-4">
//           <label className="block text-gray-700">Select User Type</label>
//           <select
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//             required
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             <option value="">-- Select --</option>
//             <option value="guardian">Guardian</option>
//             <option value="elderly">Elderly</option>
//           </select>
//         </div>



//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             placeholder="Enter your password"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </form>
// <div className="mt-4 flex justify-end">
//           <Link
//             to="/register"
//             className="text-blue-600 text-sm font-medium hover:underline"
//           >
//             New User? Register Here
//           </Link>
//         </div>
//     </div>
//   );
// };

// export default LaunchPage;






//version2

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const LaunchPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState(""); // guardian / elderly

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!userType) {
//       setMessage("⚠️ Please select Guardian or Elderly.");
//       return;
//     }

//     try {
//       const endpoint =
//         userType === "guardian"
//           ? "http://127.0.0.1:8000/api/guardian/login/"
//           : "http://127.0.0.1:8000/api/elderly/login/";

//       const response = await axios.post(endpoint, {
//         email,
//         password,
//       });

//       const data = response.data;
//       console.log("Login success:", data);

//       if (data.guardian_id) {
//         localStorage.setItem("guardian_id", data.guardian_id);
//         navigate("/guardian-dashboard", { state: { guardianId: data.guardian_id } });
//       } else if (data.elderly_id) {
//         localStorage.setItem("elderly_id", data.elderly_id);
//         navigate("/elderly-dashboard", { state: { elderlyId: data.elderly_id } });
//       } else {
//         setMessage("❌ No guardian_id or elderly_id found in response.");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//       setMessage("❌ Invalid email or password.");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
//       {/* Futuristic floating background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-ping"></div>
//       </div>

//       <form
//         onSubmit={handleLogin}
//         className="relative z-10 bg-white/10 backdrop-blur-xl border border-gray-700 p-10 rounded-3xl shadow-2xl w-96 text-white"
//       >
//         <h2 className="text-3xl font-extrabold text-center mb-8 tracking-wide">
//           🔐 Guardian / Elderly Login
//         </h2>

//         {message && (
//           <p className="mb-4 text-center text-red-400 font-medium">{message}</p>
//         )}

//         <div className="mb-5">
//           <label className="block mb-2 text-gray-300 font-medium">
//             Select User Type
//           </label>
//           <select
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//             required
//             className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select --</option>
//             <option value="guardian">Guardian</option>
//             <option value="elderly">Elderly</option>
//           </select>
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 text-gray-300 font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="mb-8">
//           <label className="block mb-2 text-gray-300 font-medium">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your password"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:opacity-90 transition-transform transform hover:scale-105"
//         >
//           🚀 Login
//         </button>

//         <div className="mt-6 text-center">
//           <Link
//             to="/register"
//             className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
//           >
//             ✨ New User? Register Here
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LaunchPage;




// //version 3
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import pill1 from "../assets/pill1.svg";
// import pill2 from "../assets/pill2.svg";
// import tablet from "../assets/tablet.avif";

// const LaunchPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!userType) return setMessage("⚠️ Please select Guardian or Elderly.");
//     setLoading(true);

//     try {
//       const endpoint =
//         userType === "guardian"
//           ? "http://127.0.0.1:8000/api/guardian/login/"
//           : "http://127.0.0.1:8000/api/elderly/login/";

//       const { data } = await axios.post(endpoint, { email, password });

//       if (data.guardian_id) {
//         localStorage.setItem("guardian_id", data.guardian_id);
//         navigate("/guardian-dashboard", { state: { guardianId: data.guardian_id } });
//       } else if (data.elderly_id) {
//         localStorage.setItem("elderly_id", data.elderly_id);
//         navigate("/elderly-dashboard", { state: { elderlyId: data.elderly_id } });
//       } else {
//         setMessage("❌ No guardian_id or elderly_id found in response.");
//       }
//     } catch {
//       setMessage("❌ Invalid email or password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 bg-[length:200%_200%] animate-gradient-x relative overflow-hidden">
//       {/* Floating Pills */}
//       <img src={pill1} alt="pill" className="absolute top-[10%] left-[15%] w-20 opacity-70 animate-float" />
//       <img src={pill2} alt="pill" className="absolute bottom-[20%] right-[10%] w-16 opacity-70 animate-float delay-2000" />
//       <img src={tablet} alt="pill" className="absolute top-[50%] left-[70%] w-24 opacity-70 animate-float delay-1000" />

//       {/* Glassmorphic Login Card */}
//       <form
//         onSubmit={handleLogin}
//         className="relative z-10 bg-white/10 backdrop-blur-2xl border border-purple-700/40 p-10 rounded-3xl shadow-[0_0_30px_rgba(147,51,234,0.7)] w-96 text-white"
//       >
//         <h2 className="text-3xl font-extrabold text-center mb-8 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-pulse">
//           ⚡ Cyber‑Medic Login
//         </h2>

//         {message && <p className="mb-4 text-center text-red-400 font-medium">{message}</p>}

//         <div className="mb-5">
//           <label className="block mb-2 text-gray-300 font-medium">Select User Type</label>
//           <select
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//             required
//             className="w-full p-3 bg-black/60 border border-purple-500/40 rounded-xl text-gray-200 focus:ring-2 focus:ring-pink-500 transition"
//           >
//             <option value="">-- Select --</option>
//             <option value="guardian">Guardian</option>
//             <option value="elderly">Elderly</option>
//           </select>
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 text-gray-300 font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-3 bg-black/60 border border-purple-500/40 rounded-xl text-gray-200 focus:ring-2 focus:ring-blue-500 transition"
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="mb-8">
//           <label className="block mb-2 text-gray-300 font-medium">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full p-3 bg-black/60 border border-purple-500/40 rounded-xl text-gray-200 focus:ring-2 focus:ring-pink-500 transition"
//             placeholder="Enter your password"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.8)] hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//           {loading ? "Logging in..." : "🚀 Login"}
//         </button>

//         <div className="mt-6 text-center">
//           <Link to="/register" className="text-pink-400 hover:text-blue-400 transition-colors font-medium">
//             ✨ New User? Register Here
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LaunchPage;



//version 4
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import backgroundVideo from "../assets/background.mp4";

const LaunchPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userType) {
      setMessage("⚠️ Please select Guardian or Elderly.");
      return;
    }

    try {
      const endpoint =
        userType === "guardian"
          ? "http://127.0.0.1:8000/api/guardian/login/"
          : "http://127.0.0.1:8000/api/elderly/login/";

      const response = await axios.post(endpoint, { email, password });
      const data = response.data;

      if (data.guardian_id) {
        localStorage.setItem("guardian_id", data.guardian_id);
        navigate("/guardian-dashboard", { state: { guardianId: data.guardian_id } });
      } else if (data.elderly_id) {
        localStorage.setItem("elderly_id", data.elderly_id);
        navigate("/elderly-dashboard", { state: { elderlyId: data.elderly_id } });
      } else {
        setMessage("❌ No guardian_id or elderly_id found in response.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden">
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

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

      {/* Login Form with fade-in */}
      <form
        onSubmit={handleLogin}
        className={`w-96 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 transform transition-all duration-1000 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          🚀 Guardian / Elderly Login
        </h2>

        {message && (
          <p className="mb-4 text-center text-red-400 font-medium">{message}</p>
        )}

        <div className="mb-5">
          <label className="block text-gray-300 mb-2 font-semibold">
            Select User Type
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
            className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="" className="text-gray-700">-- Select --</option>
            <option value="guardian" className="text-gray-700">Guardian</option>
            <option value="elderly" className="text-gray-700">Elderly</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-gray-300 mb-2 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-blue-300 text-sm font-medium hover:underline hover:text-blue-400 transition"
          >
            🌟 New User? Register Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LaunchPage;
