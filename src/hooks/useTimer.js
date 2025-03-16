"use client"

import { useState, useEffect } from "react"

export default function useTimer(initialTime, onTimeUp) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && onTimeUp) {
      onTimeUp()
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, onTimeUp])

  const pauseTimer = () => setIsActive(false)
  const resumeTimer = () => setIsActive(true)
  const resetTimer = () => {
    setTimeLeft(initialTime)
    setIsActive(false)
  }

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return {
    timeLeft,
    isActive,
    pauseTimer,
    resumeTimer,
    resetTimer,
    formatTime,
  }
}

