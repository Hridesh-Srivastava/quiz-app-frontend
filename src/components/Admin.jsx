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
      <h1 className="title">Admin Dashboard</h1>

      <div className="card admin-card">
        <div className="admin-header">
          <h2 className="admin-title">Quiz Management</h2>
          <p className="admin-subtitle">Manage your quiz questions and data</p>
        </div>

        <div className="admin-actions">
          <button onClick={syncQuestions} className="btn btn-primary admin-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading"></span>
                Syncing Questions...
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
                Sync Questions to Database
              </>
            )}
          </button>
        </div>

        {message && <div className={`message ${messageType}`}>{message}</div>}
      </div>
    </div>
  )
}

