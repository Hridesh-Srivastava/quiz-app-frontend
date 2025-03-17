"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"

export default function QuizTimer() {
  const durationMinutes = Number.parseInt(import.meta.env.VITE_QUIZ_DURATION_MINUTES) || 30
  const durationSeconds = durationMinutes * 60

  const [timeLeft, setTimeLeft] = useState(durationSeconds)
  const [isActive, setIsActive] = useState(true)
  const [timerError, setTimerError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { registrationNumber } = useSelector((state) => state.result)
  const timerRef = useRef(null)
  const lastSyncRef = useRef(Date.now())
  const syncIntervalRef = useRef(15) // Sync every 15 seconds
  const retryCountRef = useRef(0)
  const maxRetries = 3

  // Initialize timer locally without relying on server
  useEffect(() => {
    setTimeLeft(durationSeconds)
    let isMounted = true

    // Only try to sync with server if we have a registration number
    if (registrationNumber) {
      const syncTimerWithServer = async () => {
        if (retryCountRef.current >= maxRetries) {
          console.log("Max retries reached, using local timer only")
          if (isMounted) setTimerError(true)
          return
        }

        try {
          console.log(`Attempting to sync timer (attempt ${retryCountRef.current + 1}/${maxRetries})`)
          // Try to get existing timer with increased timeout
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`,
            { timeout: 8000 }, // Increased timeout to 8 seconds
          )

          if (response.data && response.data.timeLeft > 0 && isMounted) {
            setTimeLeft(response.data.timeLeft)
            console.log("Timer synced with server:", response.data.timeLeft)
            retryCountRef.current = 0 // Reset retry counter on success
          } else if (isMounted) {
            // If no timer exists or time is up, create a new one
            const createResponse = await axios.post(
              `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer`,
              {
                registrationNumber,
                timeLeft: durationSeconds,
                startTime: Date.now(),
              },
              { timeout: 8000 },
            )
            console.log("New timer created:", createResponse.data)
            retryCountRef.current = 0 // Reset retry counter on success
          }
          if (isMounted) setTimerError(false)
        } catch (error) {
          retryCountRef.current++
          console.log(`Timer initialization error (attempt ${retryCountRef.current}/${maxRetries}):`, error.message)

          if (isMounted) {
            setTimerError(true)

            // Retry with exponential backoff if we haven't reached max retries
            if (retryCountRef.current < maxRetries) {
              const backoffTime = Math.min(1000 * Math.pow(2, retryCountRef.current), 10000)
              console.log(`Retrying in ${backoffTime}ms...`)
              setTimeout(syncTimerWithServer, backoffTime)
            } else {
              console.log("Using local timer only after max retries")
            }
          }
        }
      }

      syncTimerWithServer()
    }

    return () => {
      isMounted = false
    }
  }, [registrationNumber, durationSeconds])

  // Timer countdown effect
  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1

          // Check if we need to sync with server
          const now = Date.now()
          const timeSinceLastSync = (now - lastSyncRef.current) / 1000

          // Only try to update server periodically to reduce API calls
          // And only if we're not in error state
          if (!timerError && registrationNumber && timeSinceLastSync >= syncIntervalRef.current) {
            lastSyncRef.current = now

            axios
              .put(
                `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`,
                {
                  timeLeft: newTime,
                },
                { timeout: 5000 },
              ) // 5 second timeout
              .then(() => {
                // Reset sync interval on success
                syncIntervalRef.current = 15
              })
              .catch((err) => {
                console.log("Using local timer only:", err.message)
                setTimerError(true)

                // Increase sync interval on error to reduce failed requests
                syncIntervalRef.current = Math.min(syncIntervalRef.current * 2, 60) // Exponential backoff up to 60 seconds
              })
          }

          return newTime
        })
      }, 1000)

      timerRef.current = interval
    } else if (timeLeft === 0 && !isSubmitting) {
      handleTimeUp()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, registrationNumber, timerError, isSubmitting])

  // Handle time up
  const handleTimeUp = async () => {
    if (isSubmitting) return // Prevent multiple submissions

    setIsActive(false)
    setIsSubmitting(true)

    console.log("Time's up! Submitting quiz...")

    // Clear any existing intervals
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Try to clean up timer data, but don't block navigation if it fails
    if (registrationNumber) {
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`, {
          timeout: 5000,
        })
        console.log("Timer data cleared successfully")
      } catch (error) {
        console.log("Error clearing timer data (continuing anyway):", error.message)
      }
    }

    // Small delay to ensure we don't have race conditions
    setTimeout(() => {
      navigate("/result")
    }, 500)
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
        {timerError && (
          <span className="timer-offline-indicator" title="Using local timer (offline mode)">
            ⚠️
          </span>
        )}
      </div>
    </div>
  )
}

