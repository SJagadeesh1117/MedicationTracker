import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/background.mp4";
import Confetti from "react-confetti";
import useWindowSize from "../hooks/useWindowSize"; // adjust path if needed


const API_BASE = "http://127.0.0.1:8000/api"; // adjust if needed

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    user_type: "guardian", // default
  });



  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [messageType, setMessageType] = useState(""); // "success" or "error"


//   useEffect(() => {
//   setShowConfetti(true);

//   // Stop confetti after 5 seconds
//   const timer = setTimeout(() => setShowConfetti(false), 10000);

//   return () => clearTimeout(timer);
// }, []);



    useEffect(() => {
      setTimeout(() => setAnimate(true), 100);
    }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        formData.user_type === "guardian"
          ? `${API_BASE}/guardian/register/`
          : `${API_BASE}/elderly/register/`;

      const res = await axios.post(endpoint, formData);

          // 👇 If no error is thrown, registration succeeded
    setMessage(`✅ ${formData.user_type} "${formData.name}" registered successfully!`);
    setShowConfetti(true);
    




    //   setMessage(`✅ ${formData.user_type} "${formData.name}" registered successfully!`);
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        gender: "",
        user_type: "guardian",
      });

      setTimeout(() => setShowConfetti(false), 10000);
      // Redirect to login after success
    //   setTimeout(()=> navigate("/"), 1500);
    } catch (error) {
      console.error("Error registering user", error);
      if (error.response?.data?.error) {
        setMessage(`❌ Failed: ${error.response.data.error}`);
      } else {
        setMessage("❌ Failed to register. Please try again.");
      }
    }
  };


    const [dobError, setDobError] = useState("");
    







  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* 🎉 Confetti */}
        {showConfetti && <Confetti width={width} height={height} />}

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





        <div className={`w-96 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 transform transition-all duration-1000 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
>

        <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
        User Registration
        </h1>




        {/* {message && (
          <p className="mb-4 text-center text-sm font-medium text-red-600">
            {message}
          </p>
        )} */}

        {message && (
            <p
                className={`mb-4 text-center text-sm font-semibold transition-all ${
                messageType === "success"
                    ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md"
                    : "text-red-500"
                }`}
            >
                {message}
            </p>
            )}


        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            // className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
          />

          {/* <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 r
            ounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
          /> */}

          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number (10 digits)"
            value={formData.phone_number}
            onChange={(e) => {
                // only allow digits and limit length
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData({ ...formData, phone_number: val });
            }}
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
          />




            <input
            type="text"
            name="date_of_birth"
            placeholder="DD-MM-YYYY"
            value={formData.date_of_birth}
            onChange={(e) => {
                let val = e.target.value.replace(/\D/g, ""); // digits only
                if (val.length > 8) val = val.slice(0, 8); // cap at 8 digits

                // Insert hyphens automatically
                if (val.length >= 5) {
                val = `${val.slice(0, 2)}-${val.slice(2, 4)}-${val.slice(4)}`;
                } else if (val.length >= 3) {
                val = `${val.slice(0, 2)}-${val.slice(2)}`;
                }

                setFormData({ ...formData, date_of_birth: val });
                setDobError(""); // reset error

                // Only validate when full length
                if (val.length === 10) {
                const [dayStr, monthStr, yearStr] = val.split("-");
                const day = parseInt(dayStr, 10);
                const month = parseInt(monthStr, 10);
                const year = parseInt(yearStr, 10);
                const currentYear = new Date().getFullYear();

                if (day < 1 || day > 31) {
                    setDobError("❌ Enter valid details");
                } else if (month < 1 || month > 12) {
                    setDobError("❌ Enter valid details");
                } else if (year > currentYear) {
                    setDobError("❌ Enter valid details");
                }
                }
            }}
            required
            maxLength={10}
            className={`w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border ${
                dobError ? "border-red-500" : "border-gray-200"
            } shadow-md focus:outline-none focus:ring-2 ${
                dobError ? "focus:ring-red-500" : "focus:ring-blue-500"
            } transition mb-2`}
            />

            {dobError && (
            <p className="text-red-500 text-sm mb-4">{dobError}</p>
            )}





          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-5"
>
            <option value="guardian">Register as Guardian</option>
            <option value="elderly">Register as Elderly</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
        >
            Register
          </button>
        </form>
                <div className="mt-4 flex justify-end">
          <Link
            to="/"
            className="text-blue-300 text-sm font-medium hover:underline hover:text-blue-400 transition"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
