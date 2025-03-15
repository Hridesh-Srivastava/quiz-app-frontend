"use client"

import { useState, useEffect } from "react"
import Questions from "./Questions"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { moveNextAction, movePrevAction } from "../redux/question_reducer"
import { pushResultAction } from "../redux/result_reducer"
import { useFetchQuestion } from "../hooks/FetchQuestion"

export default function Quiz() {
  const [checked, setChecked] = useState(undefined)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { queue, trace } = useSelector((state) => state.questions)
  const result = useSelector((state) => state.result.result)
  const dispatch = useDispatch()
  const [{ isLoading, apiData, serverError }] = useFetchQuestion()

  useEffect(() => {
    setChecked(result[trace])
  }, [trace, result])

  function onNext() {
    if (checked !== undefined) {
      dispatch(pushResultAction({ trace, checked }))

      if (trace === queue.length - 1) {
        if (isAllAnswered()) {
          setIsSubmitted(true)
        }
      } else {
        dispatch(moveNextAction())
        setChecked(undefined)
      }
    }
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(movePrevAction())
    }
  }

  function onChecked(value) {
    setChecked(value)
  }

  function isAllAnswered() {
    return result.length === queue.length && !result.includes(undefined)
  }

  if (isLoading)
    return (
      <div className="container">
        <h3 className="text-light">Loading...</h3>
      </div>
    )
  if (serverError)
    return (
      <div className="container">
        <h3 className="text-light">Error: {serverError.message}</h3>
      </div>
    )
  if (isSubmitted) return <Navigate to={"/result"} replace={true} />

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      {queue && queue[trace] ? (
        <Questions onChecked={onChecked} />
      ) : (
        <div className="text-light">No Questions Available</div>
      )}

      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Previous
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext} disabled={checked === undefined}>
          {trace === queue.length - 1
            ? isAllAnswered()
              ? "Submit Quiz"
              : "Answer all questions to submit"
            : "Next Question"}
        </button>
      </div>
    </div>
  )
}

