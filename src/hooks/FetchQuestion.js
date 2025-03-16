"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as Action from "../redux/question_reducer"

// Create a helper for API calls with error handling
const fetchFromAPI = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export const useFetchQuestion = () => {
  const dispatch = useDispatch()
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  })

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }))

    const fetchData = async () => {
      try {
        // Log the URL for debugging
        const apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/questions`
        console.log("Fetching questions from:", apiUrl)

        const response = await fetchFromAPI(apiUrl)

        if (!response) {
          throw new Error("No response from server")
        }

        const { questions, answers } = response

        if (questions && Array.isArray(questions) && questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false, apiData: questions }))
          dispatch(Action.startExamAction({ questions, answers }))
        } else {
          throw new Error("No Questions Available!")
        }
      } catch (error) {
        console.error("Error fetching questions:", error)
        setGetData((prev) => ({ ...prev, isLoading: false, serverError: error }))
      }
    }

    fetchData()
  }, [dispatch])

  return [getData, setGetData]
}

