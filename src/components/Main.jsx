"use client"

import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserData } from "../redux/result_reducer.js"
import "../styles/main.css"
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

  // Clear any existing timer data when returning to registration page
  useEffect(() => {
    const clearPreviousTimer = async () => {
      const regNumber = localStorage.getItem("lastRegistrationNumber")
      if (regNumber) {
        try {
          await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${regNumber}`)
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
    event.preventDefault()
    const userData = {
      name: nameRef.current.value,
      registrationNumber: regNumberRef.current.value,
      email: emailRef.current.value,
      courseYear: courseYearRef.current.value,
      section: sectionRef.current.value,
    }

    if (Object.values(userData).every((value) => value)) {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user`, userData)

        if (response.data) {
          console.log("User registered successfully:", response.data)
          dispatch(setUserData(userData))

          // Store registration number for later cleanup
          localStorage.setItem("lastRegistrationNumber", userData.registrationNumber)

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
            <h2>All the very best!</h2>
          </ul>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

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
        </div>

        <button type="submit" className="btn btn-primary start-button" disabled={loading}>
          {loading ? (
            <>
              <span className="loading"></span>
              Registering...
            </>
          ) : (
            <>
              Start Quiz
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
  )
}

