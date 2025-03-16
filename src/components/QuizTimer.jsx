"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"

export default function QuizTimer() {
  const durationMinutes = Number.parseInt(import.meta.env.VITE_QUIZ_DURATION_MINUTES) || 30
  const durationSeconds = durationMinutes * 60

  const [timeLeft, setTimeLeft] = useState(durationSeconds)
  const [isActive, setIsActive] = useState(true)
  const [timerError, setTimerError] = useState(false)
  const navigate = useNavigate()
  const { registrationNumber } = useSelector((state) => state.result)

  // Initialize timer locally without relying on server
  useEffect(() => {
    setTimeLeft(durationSeconds)

    // Only try to sync with server if we have a registration number
    if (registrationNumber) {
      const syncTimerWithServer = async () => {
        try {
          // Try to get existing timer
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`,
          )

          if (response.data && response.data.timeLeft > 0) {
            setTimeLeft(response.data.timeLeft)
          } else {
            // If no timer exists or time is up, create a new one
            await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer`, {
              registrationNumber,
              timeLeft: durationSeconds,
              startTime: Date.now(),
            })
          }
        } catch (error) {
          console.log("Timer initialization will use local state only:", error.message)
          setTimerError(true)
        }
      }

      syncTimerWithServer()
    }
  }, [registrationNumber, durationSeconds])

  // Timer countdown effect
  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1

          // Only try to update server every 15 seconds to reduce API calls
          if (!timerError && registrationNumber && newTime % 15 === 0) {
            axios
              .put(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`, {
                timeLeft: newTime,
              })
              .catch((err) => {
                console.log("Using local timer only:", err.message)
                setTimerError(true)
              })
          }

          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimeUp()
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, registrationNumber, timerError])

  // Handle time up
  const handleTimeUp = async () => {
    setIsActive(false)

    // Try to clean up timer data, but don't block navigation if it fails
    if (registrationNumber) {
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`)
      } catch (error) {
        console.log("Error clearing timer data:", error.message)
      }
    }

    navigate("/result")
  }

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="quiz-timer">
      <div className={`timer-display ${timeLeft < 60 ? "timer-warning" : ""}`}>
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
          className="timer-icon"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span className="timer-text">{formatTime()}</span>
      </div>
    </div>
  )
}

