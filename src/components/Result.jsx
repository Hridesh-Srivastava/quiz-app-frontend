"use client"

import "../styles/result.css"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { attempts_Number, earnPoints_Number } from "../helper/helper"
import { usePublishResult } from "../hooks/setResult"

export default function Result() {
  const {
    questions: { queue, answers },
    result: { result, userId, username, email, registrationNumber, courseYear, section },
  } = useSelector((state) => state)

  const totalPoints = queue.length * 5
  const attempts = attempts_Number(result)
  const earnPoints = earnPoints_Number(result, answers, 5)
  const flag = earnPoints >= totalPoints * 0.5
  const percentage = (earnPoints / totalPoints) * 100

  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Thank you for your participation!")
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  usePublishResult({
    result,
    username: username || userId,
    email,
    registrationNumber,
    courseYear,
    section,
    attempts,
    points: earnPoints,
    achieved: flag ? "Passed" : "Failed",
  })

  return (
    <div className="container result-container">
      <div className="result-header">
        <h1 className="result-title">Quiz Results</h1>
        <p className="result-subtitle">Your TechQuiz Performance</p>
      </div>

      <div className="result-card">
        <div className="score-display">
          <div className="score-circle">
            <svg width="200" height="200" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--bg-tertiary)" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={flag ? "var(--success)" : "var(--danger)"}
                strokeWidth="12"
                strokeDasharray="339.292"
                strokeDashoffset={339.292 * (1 - percentage / 100)}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="score-value">{Math.round(percentage)}%</div>
            <div className="score-label">{flag ? "Passed" : "Failed"}</div>
          </div>
        </div>

        <div className="user-details">
          <div className="detail-item">
            <div className="detail-label">Name</div>
            <div className="detail-value">{username || userId || "N/A"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Registration Number</div>
            <div className="detail-value">{registrationNumber || "N/A"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Email</div>
            <div className="detail-value">{email || "N/A"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Course/Year</div>
            <div className="detail-value">{courseYear || "N/A"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Section</div>
            <div className="detail-value">{section || "N/A"}</div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{earnPoints}</div>
            <div className="stat-label">Points Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalPoints}</div>
            <div className="stat-label">Max Points</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{queue.length}</div>
            <div className="stat-label">Total Questions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{attempts}</div>
            <div className="stat-label">Questions Attempted</div>
          </div>
        </div>
      </div>
    </div>
  )
}

