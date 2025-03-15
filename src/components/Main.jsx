// "use client"

// import { useRef, useState } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setUserId } from "../redux/result_reducer.js"
// import "../styles/Main.css"
// import axios from "axios"

// export default function Main() {
//   const nameRef = useRef(null)
//   const regNumberRef = useRef(null)
//   const emailRef = useRef(null)
//   const courseYearRef = useRef(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   async function startQuiz(event) {
//     event.preventDefault() // Prevent default form submission
//     const name = nameRef.current.value
//     const registrationNumber = regNumberRef.current.value
//     const email = emailRef.current.value
//     const courseYear = courseYearRef.current.value

//     if (name && registrationNumber && email && courseYear) {
//       setLoading(true)
//       setError(null)

//       try {
//         // Make API call to store user data
//         const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user`, {
//           name,
//           email,
//           registrationNumber,
//           courseYear,
//         })

//         if (response.data) {
//           console.log("User registered successfully:", response.data)
//           // Store user ID in Redux
//           dispatch(setUserId(name))
//           // Navigate to quiz
//           navigate("/quiz")
//         }
//       } catch (err) {
//         console.error("Error registering user:", err)
//         setError(err.response?.data?.error || "Failed to register user. Please try again.")
//       } finally {
//         setLoading(false)
//       }
//     } else {
//       setError("Please fill out all fields correctly.")
//     }
//   }

//   return (
//     <div className="container">
//       <h1 className="title text-light">Quiz App</h1>

//       <ol>
//         <li>You've to solve the questions one by one carrying equal marks.</li>
//         <li>5 points are awarded for each correct one.</li>
//         <li>This is the aptitude round test.</li>
//         <li>You can review and edit your answers before the quiz finishes.</li>
//         <li>The result will be declared after the successful completion.</li>
//       </ol>

//       {error && <div className="error">{error}</div>}

//       <form id="form" onSubmit={startQuiz}>
//         <div>
//           <input name="name" ref={nameRef} className="userid" type="text" placeholder="Your Name" required />
//         </div>
//         <div>
//           <input
//             name="regNumber"
//             ref={regNumberRef}
//             className="userid"
//             type="text"
//             placeholder="Registration Number"
//             required
//           />
//         </div>
//         <div>
//           <input name="email" ref={emailRef} className="userid" type="email" placeholder="Email" required />
//         </div>
//         <div>
//           <input name="course" ref={courseYearRef} className="userid" type="text" placeholder="Course/Year" required />
//         </div>
//         <div className="start">
//           <button type="submit" className="btn" disabled={loading}>
//             {loading ? "Registering..." : "Start Quiz →"}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

"use client"

import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserId } from "../redux/result_reducer.js"
import "../styles/Main.css"
import axios from "axios"

export default function Main() {
  const nameRef = useRef(null)
  const regNumberRef = useRef(null)
  const emailRef = useRef(null)
  const courseYearRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function startQuiz(event) {
    event.preventDefault() // Prevent default form submission
    const name = nameRef.current.value
    const registrationNumber = regNumberRef.current.value
    const email = emailRef.current.value
    const courseYear = courseYearRef.current.value

    if (name && registrationNumber && email && courseYear) {
      setLoading(true)
      setError(null)

      try {
        // Make API call to store user data
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user`, {
          name,
          email,
          registrationNumber,
          courseYear,
        })

        if (response.data) {
          console.log("User registered successfully:", response.data)
          // Store user ID in Redux
          dispatch(setUserId(name))
          // Navigate to quiz
          navigate("/quiz")
        }
      } catch (err) {
        console.error("Error registering user:", err)
        setError(err.response?.data?.error || "Failed to register user. Please try again.")
      } finally {
        setLoading(false)
      }
    } else {
      setError("Please fill out all fields correctly.")
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz App</h1>

      <ol>
        <li>You've to solve the questions one by one carrying equal marks.</li>
        <li>5 points are awarded for each correct one.</li>
        <li>This is the aptitude round test.</li>
        <li>You can review and edit your answers before the quiz finishes.</li>
        <li>The result will be declared after the successful completion.</li>
      </ol>

      {error && <div className="error">{error}</div>}

      <form id="form" onSubmit={startQuiz}>
        <div>
          <input name="name" ref={nameRef} className="userid" type="text" placeholder="Your Name" required />
        </div>
        <div>
          <input
            name="regNumber"
            ref={regNumberRef}
            className="userid"
            type="text"
            placeholder="Registration Number"
            required
          />
        </div>
        <div>
          <input name="email" ref={emailRef} className="userid" type="email" placeholder="Email" required />
        </div>
        <div>
          <input name="course" ref={courseYearRef} className="userid" type="text" placeholder="Course/Year" required />
        </div>
        <div className="start">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Start Quiz →"}
          </button>
        </div>
      </form>
    </div>
  )
}