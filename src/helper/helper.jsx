// import { useSelector } from "react-redux"
// import { Navigate } from "react-router-dom"
// import axios from "axios"

// export function attempts_Number(result) {
//   return result.filter((r) => r !== undefined).length
// }

// export function earnPoints_Number(result, answers, point) {
//   return result
//     .map((element, i) => answers[i] === element)
//     .filter((i) => i)
//     .map((i) => point)
//     .reduce((prev, curr) => prev + curr, 0)
// }

// export function flagResult(totalPoints, earnPoints) {
//   return (totalPoints * 50) / 100 < earnPoints /** earn 50% marks */
// }

// /** check user auth  */
// export function CheckUserExist({ children }) {
//   const auth = useSelector((state) => state.result.userId)
//   return auth ? children : <Navigate to={"/"} replace={true}></Navigate>
// }

// /** get server data with better error handling */
// export async function getServerData(url, callback) {
//   try {
//     console.log("Fetching data from:", url)

//     const response = await axios.get(url, {
//       timeout: 8000, // 8 second timeout
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })

//     const data = response.data
//     return callback ? callback(data) : data
//   } catch (error) {
//     console.error("API Error:", error)

//     // Return a structured error
//     const errorData = {
//       error: true,
//       message: error.response?.data?.error || error.message || "Unknown error occurred",
//       status: error.response?.status,
//     }

//     return callback ? callback(errorData) : errorData
//   }
// }

// /** post server data with better error handling */
// export async function postServerData(url, result, options = {}, callback) {
//   try {
//     console.log("Posting data to:", url)

//     const response = await axios.post(url, result, {
//       timeout: options.timeout || 8000, // 8 second timeout by default
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       ...options,
//     })

//     const data = response.data
//     return callback ? callback(data) : data
//   } catch (error) {
//     console.error("API Error:", error)

//     // Return a structured error
//     const errorData = {
//       error: true,
//       message: error.response?.data?.error || error.message || "Unknown error occurred",
//       status: error.response?.status,
//     }

//     return callback ? callback(errorData) : errorData
//   }
// }

// // Helper to check if all questions are answered
// export function isAllAnswered(result, queueLength) {
//   return result.length === queueLength && !result.includes(undefined)
// }

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

    const response = await axios.get(url, {
      timeout: 8000, // 8 second timeout
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    const data = response.data
    return callback ? callback(data) : data
  } catch (error) {
    console.error("API Error:", error)

    // Return a structured error
    const errorData = {
      error: true,
      message: error.response?.data?.error || error.message || "Unknown error occurred",
      status: error.response?.status,
    }

    return callback ? callback(errorData) : errorData
  }
}

/** post server data with better error handling */
export async function postServerData(url, result, options = {}, callback) {
  try {
    console.log("Posting data to:", url)

    const response = await axios.post(url, result, {
      timeout: options.timeout || 8000, // 8 second timeout by default
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...options,
    })

    const data = response.data
    return callback ? callback(data) : data
  } catch (error) {
    console.error("API Error:", error)

    // Return a structured error
    const errorData = {
      error: true,
      message: error.response?.data?.error || error.message || "Unknown error occurred",
      status: error.response?.status,
    }

    return callback ? callback(errorData) : errorData
  }
}

// Helper to check if all questions are answered
export function isAllAnswered(result, queueLength) {
  return result.length === queueLength && !result.includes(undefined)
}

