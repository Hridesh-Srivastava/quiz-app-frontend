"use client"

import { useEffect, useState } from "react"
import { getServerData } from "../helper/helper"
import "../styles/result.css"

export default function ResultTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getServerData(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex-center" style={{ padding: "2rem" }}>
        <div className="loading"></div>
        <span style={{ marginLeft: "10px" }}>Loading results...</span>
      </div>
    )
  }

  return (
    <div className="result-table-container">
      <h3 className="result-table-title">Recent Quiz Results</h3>

      {data.length === 0 ? (
        <div className="no-data">No results found</div>
      ) : (
        <div className="table-responsive">
          <table className="result-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Registration Number</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username || "N/A"}</td>
                  <td>{item.registrationNumber || "N/A"}</td>
                  <td>
                    {item.points || 0} / {(item.result?.length || 0) * 5}
                  </td>
                  <td>
                    <span className={item.achived === "Passed" ? "status-pass" : "status-fail"}>
                      {item.achived || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

