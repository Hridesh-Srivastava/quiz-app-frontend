import { postServerData } from "../helper/helper"
import * as Action from "../redux/result_reducer"

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result))
  } catch (error) {
    console.log(error)
  }
}

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index))
  } catch (error) {
    console.log(error)
  }
}

export const usePublishResult = (resultData) => {
  const { result, username, email, registrationNumber, courseYear, section } = resultData
  ;(async () => {
    try {
      if (!result.length || !username) {
        throw new Error("Couldn't get Result")
      }

      const response = await postServerData(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/result`, resultData)

      if (!response) {
        throw new Error("Failed to save result")
      }

      console.log("Result saved successfully:", response)
    } catch (error) {
      console.error("Error saving result:", error)
    }
  })()
}

