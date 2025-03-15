"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getServerData } from "../helper/helper"
import * as Action from "../redux/question_reducer"

export const useFetchQuestion = () => {
  const dispatch = useDispatch()
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  })

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }))
    ;(async () => {
      try {
        const response = await getServerData(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/questions`)

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
        setGetData((prev) => ({ ...prev, isLoading: false, serverError: error }))
      }
    })()
  }, [dispatch])

  return [getData, setGetData]
}

