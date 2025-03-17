"use client"

import { useState } from "react"
import axios from "axios"
import "../styles/admin.css"

export default function Admin() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [messageType, setMessageType] = useState("")

  async function syncQuestions() {
    setLoading(true)
    setMessage("")
    setMessageType("")

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/questions`)

      setMessage(`Success! ${response.data.count} questions synced to database.`)
      setMessageType("success")
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`)
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container admin-container">
      <h1 className="title">HSST Quiz Admin Dashboard</h1>

      <div className="admin-card">
        <div className="admin-header">
          <h2 className="admin-title">HSST Quiz Management</h2>
          <p className="admin-subtitle">Manage HSST TechQuiz questions and student data</p>
        </div>

        <div className="admin-actions">
          <button onClick={syncQuestions} className="admin-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading"></span>
                <span>Syncing Questions...</span>
              </>
            ) : (
              <>
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
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>Sync Questions to Database</span>
              </>
            )}
          </button>
        </div>

        {message && (
          <div className={`message ${messageType}`}>
            {messageType === "success" ? (
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

