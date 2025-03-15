"use client"

import { useState } from "react"
import axios from "axios"

export default function Admin() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function syncQuestions() {
    setLoading(true)
    setMessage("")

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/questions`)

      setMessage(`Success! ${response.data.count} questions synced to database.`)
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Admin Panel</h1>

      <div className="flex-center">
        <button onClick={syncQuestions} className="btn" disabled={loading}>
          {loading ? "Syncing..." : "Sync Questions to Database"}
        </button>

        {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}
      </div>
    </div>
  )
}

