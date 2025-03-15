import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserData } from "../redux/result_reducer.js"
import "../styles/Main.css"
import axios from "axios"

export default function Main() {
  const nameRef = useRef(null)
  const regNumberRef = useRef(null)
  const emailRef = useRef(null)
  const courseYearRef = useRef(null)
  const sectionRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function startQuiz(event) {
    event.preventDefault()
    const userData = {
      name: nameRef.current.value,
      registrationNumber: regNumberRef.current.value,
      email: emailRef.current.value,
      courseYear: courseYearRef.current.value,
      section: sectionRef.current.value
    }

    if (Object.values(userData).every(value => value)) {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user`, userData)

        if (response.data) {
          console.log("User registered successfully:", response.data)
          dispatch(setUserData(userData))
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
        <li>You will be asked questions one after another.</li>
        <li>5 points are awarded for each correct answer.</li>
        <li>Each question can be answered in any order.</li>
        <li>You can review and change answers before final submission.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      {error && <div className="error">{error}</div>}

      <form id="form" onSubmit={startQuiz}>
        <input 
          ref={nameRef} 
          className="userid" 
          type="text" 
          placeholder="Your Name" 
          required
        />
        <input
          ref={regNumberRef}
          className="userid"
          type="text"
          placeholder="Registration Number"
          required
        />
        <input 
          ref={emailRef} 
          className="userid" 
          type="email" 
          placeholder="Email" 
          required
        />
        <input
          ref={courseYearRef}
          className="userid"
          type="text"
          placeholder="Course/Year"
          required
        />
        <input
          ref={sectionRef}
          className="userid"
          type="text"
          placeholder="Section"
          required
        />
        <div className="start">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Start Quiz →"}
          </button>
        </div>
      </form>
    </div>
  )
}