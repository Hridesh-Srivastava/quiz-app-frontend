"use client"

import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserId, setUserData } from "../redux/result_reducer.js"
import axios from "axios"

export default function SignIn({ setError }) {
  const [loading, setLoading] = useState(false)
  const [signInMethod, setSignInMethod] = useState("email") // "email" or "regNumber"
  const emailRef = useRef(null)
  const regNumberRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    // Prevent default form submission which might cause page reload
    if (e) {
      e.preventDefault()
    }

    setLoading(true)

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
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/user/verify`,
        credentials,
        { timeout: 5000 },
      )

      if (response.data) {
        console.log("User verified successfully:", response.data)

        // Set both userId and userData in Redux
        dispatch(setUserId(response.data._id))
        dispatch(
          setUserData({
            username: response.data.username,
            email: response.data.email,
            registrationNumber: response.data.registrationNumber,
            courseYear: response.data.courseYear || "",
            section: response.data.section || "",
          }),
        )

        // Store registration number for later cleanup
        localStorage.setItem("lastRegistrationNumber", response.data.registrationNumber)

        // Use a small timeout to ensure state is updated before navigation
        setTimeout(() => {
          navigate("/quiz")
        }, 100)
      }
    } catch (err) {
      console.error("Error signing in:", err)

      if (err.response?.status === 404) {
        setError("User not found. Please check your credentials or register.")
      } else {
        setError("Failed to sign in. Please try again.")
      }
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
        </div>
      )}

      <button type="submit" className="btn btn-primary sign-in-button" disabled={loading}>
        {loading ? (
          <>
            <span className="loading"></span>
            Signing In...
          </>
        ) : (
          <>
            Continue Quiz
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

