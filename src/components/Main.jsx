// "use client"

// import { useRef, useState, useEffect } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setUserId, setUserData } from "../redux/result_reducer.js"
// import "../styles/main.css"
// import axios from "axios"
// import SignIn from "./SignIn.jsx"

// export default function Main() {
//   const nameRef = useRef(null)
//   const regNumberRef = useRef(null)
//   const emailRef = useRef(null)
//   const courseYearRef = useRef(null)
//   const sectionRef = useRef(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [showSignIn, setShowSignIn] = useState(false)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   // Clear any existing timer data when returning to registration page
//   useEffect(() => {
//     const clearPreviousTimer = async () => {
//       const regNumber = localStorage.getItem("lastRegistrationNumber")
//       if (regNumber) {
//         try {
//           await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${regNumber}`, {
//             timeout: 3000,
//           })
//           localStorage.removeItem("lastRegistrationNumber")
//         } catch (error) {
//           console.log("Error clearing previous timer (non-critical):", error.message)
//           localStorage.removeItem("lastRegistrationNumber")
//         }
//       }
//     }

//     clearPreviousTimer()
//   }, [])

//   async function startQuiz(event) {
//     // Prevent default form submission which might cause page reload
//     if (event) {
//       event.preventDefault()
//     }

//     const userData = {
//       username: nameRef.current.value,
//       email: emailRef.current.value,
//       registrationNumber: regNumberRef.current.value,
//       courseYear: courseYearRef.current.value,
//       section: sectionRef.current.value,
//     }

//     if (Object.values(userData).every((value) => value)) {
//       setLoading(true)
//       setError(null)

//       try {
//         const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user`, userData, {
//           timeout: 5000,
//         })

//         if (response.data) {
//           console.log("User registered successfully:", response.data)

//           // Set both userId and userData in Redux
//           dispatch(setUserId(response.data._id))
//           dispatch(
//             setUserData({
//               username: userData.username,
//               email: userData.email,
//               registrationNumber: userData.registrationNumber,
//               courseYear: userData.courseYear,
//               section: userData.section,
//             }),
//           )

//           // Store registration number for later cleanup
//           localStorage.setItem("lastRegistrationNumber", userData.registrationNumber)

//           // Use a small timeout to ensure state is updated before navigation
//           setTimeout(() => {
//             navigate("/quiz")
//           }, 100)
//         }
//       } catch (err) {
//         console.error("Error registering user:", err)

//         // Check for specific error types
//         if (err.response?.data?.error && err.response.status === 409) {
//           setError(err.response.data.error)
//         } else {
//           setError("Failed to register user. Please try again.")
//         }
//         setLoading(false)
//       }
//     } else {
//       setError("Please fill out all fields correctly.")
//     }
//   }

//   const toggleSignIn = () => {
//     setShowSignIn(!showSignIn)
//     setError(null) // Clear any errors when switching forms
//   }

//   return (
//     <div className="container">
//       <h1 className="title">HSST TechQuiz Hub</h1>

//       <div className="welcome-section">
//         <div className="rules-card">
//           <h2>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//               <polyline points="14 2 14 8 20 8"></polyline>
//               <line x1="16" y1="13" x2="8" y2="13"></line>
//               <line x1="16" y1="17" x2="8" y2="17"></line>
//               <polyline points="10 9 9 9 8 9"></polyline>
//             </svg>
//             HSST Quiz Guidelines
//           </h2>
//           <ul className="rules-list">
//             <li>You will be asked questions one after another.</li>
//             <li>5 points are awarded for each correct answer.</li>
//             <li>Each question should be answered in an order.</li>
//             <li>You can review and change answers before final submission.</li>
//             <li>The quiz has a time limit of {import.meta.env.VITE_QUIZ_DURATION_MINUTES || 30} minutes.</li>
//             <li>The result will be declared at the end of the quiz.</li>
//           </ul>
//         </div>
//       </div>

//       {error && <div className="error">{error}</div>}

//       <div className="auth-container">
//         <div className="auth-toggle">
//           <button
//             type="button"
//             className={`toggle-btn ${!showSignIn ? "active" : ""}`}
//             onClick={() => setShowSignIn(false)}
//           >
//             Register
//           </button>
//           <button
//             type="button"
//             className={`toggle-btn ${showSignIn ? "active" : ""}`}
//             onClick={() => setShowSignIn(true)}
//           >
//             Sign In
//           </button>
//           <div className="slider"></div>
//         </div>

//         {showSignIn ? (
//           <div className="auth-card">
//             <SignIn setError={setError} />
//           </div>
//         ) : (
//           <div className="auth-card">
//             <form id="form" onSubmit={startQuiz}>
//               <div className="form-group">
//                 <label htmlFor="name">Full Name</label>
//                 <input
//                   ref={nameRef}
//                   id="name"
//                   className="form-control"
//                   type="text"
//                   placeholder="Enter your full name"
//                   required
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="form-icon"
//                 >
//                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                   <circle cx="12" cy="7" r="4"></circle>
//                 </svg>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="regNumber">Registration Number</label>
//                 <input
//                   ref={regNumberRef}
//                   id="regNumber"
//                   className="form-control"
//                   type="text"
//                   placeholder="Enter your registration number"
//                   required
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="form-icon"
//                 >
//                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                   <line x1="16" y1="2" x2="16" y2="6"></line>
//                   <line x1="8" y1="2" x2="8" y2="6"></line>
//                   <line x1="3" y1="10" x2="21" y2="10"></line>
//                 </svg>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email Address</label>
//                 <input
//                   ref={emailRef}
//                   id="email"
//                   className="form-control"
//                   type="email"
//                   placeholder="Enter your email address"
//                   required
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="form-icon"
//                 >
//                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                   <polyline points="22,6 12,13 2,6"></polyline>
//                 </svg>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="courseYear">Course/Year</label>
//                 <input
//                   ref={courseYearRef}
//                   id="courseYear"
//                   className="form-control"
//                   type="text"
//                   placeholder="Enter your course and year"
//                   required
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="form-icon"
//                 >
//                   <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
//                 </svg>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="section">Section</label>
//                 <input
//                   ref={sectionRef}
//                   id="section"
//                   className="form-control"
//                   type="text"
//                   placeholder="Enter your section"
//                   required
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="form-icon"
//                 >
//                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                   <circle cx="8.5" cy="7" r="4"></circle>
//                   <line x1="20" y1="8" x2="20" y2="14"></line>
//                   <line x1="23" y1="11" x2="17" y2="11"></line>
//                 </svg>
//               </div>

//               <button type="submit" className="start-button" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <span className="loading"></span>
//                     <span>Registering...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Start Quiz</span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="5" y1="12" x2="19" y2="12"></line>
//                       <polyline points="12 5 19 12 12 19"></polyline>
//                     </svg>
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserId, setUserData } from "../redux/result_reducer.js"
import "../styles/main.css"
import axios from "axios"
import SignIn from "./SignIn.jsx"

export default function Main() {
  const nameRef = useRef(null)
  const regNumberRef = useRef(null)
  const emailRef = useRef(null)
  const courseYearRef = useRef(null)
  const sectionRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Clear any existing timer data when returning to registration page
  useEffect(() => {
    const clearPreviousTimer = async () => {
      const regNumber = localStorage.getItem("lastRegistrationNumber")
      if (regNumber) {
        try {
          await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${regNumber}`, {
            timeout: 3000,
          })
          localStorage.removeItem("lastRegistrationNumber")
        } catch (error) {
          console.log("Error clearing previous timer (non-critical):", error.message)
          localStorage.removeItem("lastRegistrationNumber")
        }
      }
    }

    clearPreviousTimer()
  }, [])

  async function startQuiz(event) {
    // Prevent default form submission which might cause page reload
    if (event) {
      event.preventDefault()
    }

    const userData = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      registrationNumber: regNumberRef.current.value,
      courseYear: courseYearRef.current.value,
      section: sectionRef.current.value,
    }

    if (Object.values(userData).every((value) => value)) {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user`, userData, {
          timeout: 5000,
        })

        if (response.data) {
          console.log("User registered successfully:", response.data)

          // Set both userId and userData in Redux
          dispatch(setUserId(response.data._id))
          dispatch(
            setUserData({
              username: userData.username,
              email: userData.email,
              registrationNumber: userData.registrationNumber,
              courseYear: userData.courseYear,
              section: userData.section,
            }),
          )

          // Store registration number for later cleanup
          localStorage.setItem("lastRegistrationNumber", userData.registrationNumber)

          // Use a small timeout to ensure state is updated before navigation
          setTimeout(() => {
            navigate("/quiz")
          }, 100)
        }
      } catch (err) {
        console.error("Error registering user:", err)

        // Check for specific error types
        if (err.response?.data?.error && err.response.status === 409) {
          setError(err.response.data.error)
        } else {
          setError("Failed to register user. Please try again.")
        }
        setLoading(false)
      }
    } else {
      setError("Please fill out all fields correctly.")
    }
  }

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn)
    setError(null) // Clear any errors when switching forms
  }

  return (
    <div className="container">
      <h1 className="title">HSST TechQuiz Hub</h1>

      <div className="welcome-section">
        <div className="rules-card">
          <h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            HSST Quiz Guidelines
          </h2>
          <ul className="rules-list">
            <li>You will be asked questions one after another.</li>
            <li>5 points are awarded for each correct answer.</li>
            <li>Each question should be answered in an order.</li>
            <li>You can review and change answers before final submission.</li>
            <li>The quiz has a time limit of {import.meta.env.VITE_QUIZ_DURATION_MINUTES || 30} minutes.</li>
            <li>The result will be declared at the end of the quiz.</li>
          </ul>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="auth-container">
        <div className="auth-toggle">
          <button
            type="button"
            className={`toggle-btn ${!showSignIn ? "active" : ""}`}
            onClick={() => setShowSignIn(false)}
          >
            Register
          </button>
          <button
            type="button"
            className={`toggle-btn ${showSignIn ? "active" : ""}`}
            onClick={() => setShowSignIn(true)}
          >
            Sign In
          </button>
          <div className="slider"></div>
        </div>

        {showSignIn ? (
          <div className="auth-card">
            <SignIn setError={setError} />
          </div>
        ) : (
          <div className="auth-card">
            <form id="form" onSubmit={startQuiz}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  ref={nameRef}
                  id="name"
                  className="form-control"
                  type="text"
                  placeholder="Enter your full name"
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>

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

              <div className="form-group">
                <label htmlFor="courseYear">Course/Year</label>
                <input
                  ref={courseYearRef}
                  id="courseYear"
                  className="form-control"
                  type="text"
                  placeholder="Enter your course and year"
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
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>

              <div className="form-group">
                <label htmlFor="section">Section</label>
                <input
                  ref={sectionRef}
                  id="section"
                  className="form-control"
                  type="text"
                  placeholder="Enter your section"
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>

              <button type="submit" className="start-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading"></span>
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Start Quiz</span>
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
          </div>
        )}
      </div>
    </div>
  )
}



