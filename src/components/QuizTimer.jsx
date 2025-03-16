"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { QUIZ_CONFIG } from "../../../../backend/config/quizConfig"
import axios from "axios"

export default function QuizTimer() {
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.DURATION_SECONDS)
  const [isActive, setIsActive] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { result, userId, registrationNumber } = useSelector((state) => state.result)
  const { queue, answers } = useSelector((state) => state.questions)

  // Initialize timer from server or set to configured duration
  useEffect(() => {
    const fetchTimerState = async () => {
      if (!registrationNumber) return

      try {
        // Try to get timer state from server
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`,
        )

        if (response.data && response.data.timeLeft > 0) {
          // If timer exists on server, use that value
          setTimeLeft(response.data.timeLeft)
        } else {
          // Otherwise initialize with default duration
          setTimeLeft(QUIZ_CONFIG.DURATION_SECONDS)
          // Save initial timer state to server
          await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer`, {
            registrationNumber,
            timeLeft: QUIZ_CONFIG.DURATION_SECONDS,
            startTime: Date.now(),
          })
        }
      } catch (error) {
        console.error("Error fetching timer state:", error)
        // Fallback to default duration if server request fails
        setTimeLeft(QUIZ_CONFIG.DURATION_SECONDS)
      }
    }

    fetchTimerState()
  }, [registrationNumber])

  // Timer countdown effect
  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1

          // Update timer on server every 5 seconds to reduce API calls
          if (registrationNumber && newTime % 5 === 0) {
            axios
              .put(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`, {
                timeLeft: newTime,
              })
              .catch((err) => console.error("Error updating timer:", err))
          }

          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0) {
      // Time's up - submit quiz automatically
      handleTimeUp()
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, registrationNumber])

  // Handle time up
  const handleTimeUp = async () => {
    setIsActive(false)

    // Clear timer data from server
    if (registrationNumber) {
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`)
      } catch (error) {
        console.error("Error clearing timer data:", error)
      }
    }

    // Navigate to result page
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

