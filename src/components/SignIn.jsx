// "use client"

// import { useState, useRef } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setUserId, setUserData } from "../redux/result_reducer.js"
// import axios from "axios"

// export default function SignIn({ setError }) {
//   const [loading, setLoading] = useState(false)
//   const [signInMethod, setSignInMethod] = useState("email") // "email" or "regNumber"
//   const emailRef = useRef(null)
//   const regNumberRef = useRef(null)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleSignIn = async (e) => {
//     // Prevent default form submission which might cause page reload
//     if (e) {
//       e.preventDefault()
//     }

//     setLoading(true)

//     try {
//       // Prepare credentials based on sign-in method
//       const credentials = {}
//       if (signInMethod === "email") {
//         credentials.email = emailRef.current.value
//       } else {
//         credentials.registrationNumber = regNumberRef.current.value
//       }

//       console.log("Verifying user with credentials:", credentials)

//       // Verify user
//       const response = await axios.post(
//         `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user/verify`,
//         credentials,
//         { timeout: 5000 },
//       )

//       if (response.data) {
//         console.log("User verified successfully:", response.data)

//         // Set both userId and userData in Redux
//         dispatch(setUserId(response.data._id))
//         dispatch(
//           setUserData({
//             username: response.data.username,
//             email: response.data.email,
//             registrationNumber: response.data.registrationNumber,
//             courseYear: response.data.courseYear || "",
//             section: response.data.section || "",
//           }),
//         )

//         // Store registration number for later cleanup
//         localStorage.setItem("lastRegistrationNumber", response.data.registrationNumber)

//         // Use a small timeout to ensure state is updated before navigation
//         setTimeout(() => {
//           navigate("/quiz")
//         }, 100)
//       }
//     } catch (err) {
//       console.error("Error signing in:", err)

//       if (err.response?.status === 404) {
//         setError("User not found. Please check your credentials or register.")
//       } else {
//         setError("Failed to sign in. Please try again.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSignIn} className="sign-in-form">
//       <div className="sign-in-method-toggle">
//         <button
//           type="button"
//           className={`method-btn ${signInMethod === "email" ? "active" : ""}`}
//           onClick={() => setSignInMethod("email")}
//         >
//           Sign in with Email
//         </button>
//         <button
//           type="button"
//           className={`method-btn ${signInMethod === "regNumber" ? "active" : ""}`}
//           onClick={() => setSignInMethod("regNumber")}
//         >
//           Sign in with Registration Number
//         </button>
//       </div>

//       {signInMethod === "email" ? (
//         <div className="form-group">
//           <label htmlFor="email">Email Address</label>
//           <input
//             ref={emailRef}
//             id="email"
//             className="form-control"
//             type="email"
//             placeholder="Enter your email address"
//             required
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="form-icon"
//           >
//             <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//             <polyline points="22,6 12,13 2,6"></polyline>
//           </svg>
//         </div>
//       ) : (
//         <div className="form-group">
//           <label htmlFor="regNumber">Registration Number</label>
//           <input
//             ref={regNumberRef}
//             id="regNumber"
//             className="form-control"
//             type="text"
//             placeholder="Enter your registration number"
//             required
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="form-icon"
//           >
//             <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//             <line x1="16" y1="2" x2="16" y2="6"></line>
//             <line x1="8" y1="2" x2="8" y2="6"></line>
//             <line x1="3" y1="10" x2="21" y2="10"></line>
//           </svg>
//         </div>
//       )}

//       <button type="submit" className="btn btn-primary sign-in-button" disabled={loading}>
//         {loading ? (
//           <>
//             <span className="loading"></span>
//             <span>Signing In...</span>
//           </>
//         ) : (
//           <>
//             <span>Continue Quiz</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="5" y1="12" x2="19" y2="12"></line>
//               <polyline points="12 5 19 12 12 19"></polyline>
//             </svg>
//           </>
//         )}
//       </button>
//     </form>
//   )
// }
"use client"

import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserData } from "../redux/result_reducer.js"
import axios from "axios"

// Create axios instance with better timeout and error handling
const api = axios.create({
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default function SignIn({ setError }) {
  const [loading, setLoading] = useState(false)
  const [signInMethod, setSignInMethod] = useState("email") // "email" or "regNumber"
  const emailRef = useRef(null)
  const regNumberRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Check for pre-filled values from registration
  useEffect(() => {
    const prefillData = localStorage.getItem("prefillSignIn")
    if (prefillData) {
      try {
        const data = JSON.parse(prefillData)
        if (data.type === "email") {
          setSignInMethod("email")
          // We'll set the value in the next render when the ref is available
        } else if (data.type === "registrationNumber") {
          setSignInMethod("regNumber")
        }

        // Remove the stored data
        localStorage.removeItem("prefillSignIn")
      } catch (e) {
        console.error("Error parsing prefill data:", e)
      }
    }
  }, [])

  // Set pre-filled values after refs are available
  useEffect(() => {
    const prefillData = localStorage.getItem("prefillSignIn")
    if (prefillData && emailRef.current && regNumberRef.current) {
      try {
        const data = JSON.parse(prefillData)
        if (data.type === "email" && emailRef.current) {
          emailRef.current.value = data.value
        } else if (data.type === "registrationNumber" && regNumberRef.current) {
          regNumberRef.current.value = data.value
        }

        // Remove the stored data
        localStorage.removeItem("prefillSignIn")
      } catch (e) {
        console.error("Error setting prefill data:", e)
      }
    }
  }, [signInMethod, emailRef, regNumberRef])

  const handleSignIn = async (e) => {
    // Prevent default form submission which might cause page reload
    if (e) {
      e.preventDefault()
    }

    setLoading(true)
    setError(null)

    try {
      // Prepare credentials based on sign-in method
      const credentials = {}
      if (signInMethod === "email") {
        credentials.email = emailRef.current.value
      } else {
        credentials.registrationNumber = regNumberRef.current.value
      }

      console.log("Verifying user with credentials:", credentials)

      // Verify user
      const response = await api.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user/verify`, credentials)

      if (response.data) {
        console.log("User verified successfully:", response.data)

        // Set user data in Redux
        dispatch(
          setUserData({
            userId: response.data._id,
            username: response.data.username || response.data.name,
            email: response.data.email,
            registrationNumber: response.data.registrationNumber,
            courseYear: response.data.courseYear || "",
            section: response.data.section || "",
          }),
        )

        // Store registration number for later cleanup
        localStorage.setItem("lastRegistrationNumber", response.data.registrationNumber)

        // Navigate to quiz
        navigate("/quiz")
      }
    } catch (err) {
      console.error("Error signing in:", err)

      if (err.response?.status === 404) {
        setError("User not found. Please check your credentials or register.")
      } else if (err.response?.status === 401) {
        setError("Invalid credentials. Please try again.")
      } else {
        setError(err.response?.data?.error || "Failed to sign in. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignIn} className="sign-in-form">
      <div className="sign-in-method-toggle">
        <button
          type="button"
          className={`method-btn ${signInMethod === "email" ? "active" : ""}`}
          onClick={() => setSignInMethod("email")}
        >
          Sign in with Email
        </button>
        <button
          type="button"
          className={`method-btn ${signInMethod === "regNumber" ? "active" : ""}`}
          onClick={() => setSignInMethod("regNumber")}
        >
          Sign in with Registration Number
        </button>
      </div>

      {signInMethod === "email" ? (
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            ref={emailRef}
            id="email"
            className="form-control"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="form-icon"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="regNumber">Registration Number</label>
          <input
            ref={regNumberRef}
            id="regNumber"
            className="form-control"
            type="text"
            placeholder="Enter your registration number"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="form-icon"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      )}

      <button type="submit" className="btn btn-primary sign-in-button" disabled={loading}>
        {loading ? (
          <>
            <span className="loading"></span>
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <span>Continue Quiz</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </>
        )}
      </button>
    </form>
  )
}


