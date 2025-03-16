import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import axios from "axios"

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length
}

export function earnPoints_Number(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0)
}

export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50) / 100 < earnPoints /** earn 50% marks */
}

/** check user auth  */
export function CheckUserExist({ children }) {
  const auth = useSelector((state) => state.result.userId)
  return auth ? children : <Navigate to={"/"} replace={true}></Navigate>
}

/** get server data with better error handling */
export async function getServerData(url, callback) {
  try {
    console.log("Fetching data from:", url)
    const response = await axios.get(url)
    const data = response.data
    return callback ? callback(data) : data
  } catch (error) {
    console.error("API Error:", error)
    // Return a structured error
    const errorData = {
      error: true,
      message: error.response?.data?.error || error.message || "Unknown error occurred",
    }
    return callback ? callback(errorData) : errorData
  }
}

/** post server data with better error handling */
export async function postServerData(url, result, callback) {
  try {
    console.log("Posting data to:", url)
    const response = await axios.post(url, result)
    const data = response.data
    return callback ? callback(data) : data
  } catch (error) {
    console.error("API Error:", error)
    // Return a structured error
    const errorData = {
      error: true,
      message: error.response?.data?.error || error.message || "Unknown error occurred",
    }
    return callback ? callback(errorData) : errorData
  }
}

