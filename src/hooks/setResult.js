import { postServerData } from "../helper/helper"
import * as Action from "../redux/result_reducer"

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result))
  } catch (error) {
    console.error("Error in PushAnswer:", error)
  }
}

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.pushResultAction(index))
  } catch (error) {
    console.error("Error in updateResult:", error)
  }
}

export const usePublishResult = (resultData) => {
  const { result, username, email, registrationNumber, courseYear, section } = resultData
  ;(async () => {
    try {
      if (!result.length || !username) {
        throw new Error("Couldn't get Result")
      }

      console.log(
        "Publishing result data:",
        JSON.stringify({
          username,
          email,
          registrationNumber,
          courseYear,
          section,
          resultLength: result.length,
        }),
      )

      const apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/result`
      console.log("Posting to URL:", apiUrl)

      const response = await postServerData(apiUrl, resultData, { timeout: 8000 })

      if (response?.error) {
        throw new Error(response.message || "Failed to save result")
      }

      console.log("Result saved successfully:", response)
    } catch (error) {
      console.error("Error saving result:", error)

      // Retry once after a short delay with exponential backoff
      setTimeout(async () => {
        try {
          console.log("Retrying result submission...")
          const apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/result`
          const response = await postServerData(apiUrl, resultData, { timeout: 10000 }) // Longer timeout for retry
          console.log("Retry result:", response)
        } catch (retryError) {
          console.error("Retry failed:", retryError)
        }
      }, 3000) // 3 second delay before retry
    }
  })()
}

