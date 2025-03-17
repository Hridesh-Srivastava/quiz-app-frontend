"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { moveNextAction, movePrevAction } from "../redux/question_reducer"
import { pushResultAction } from "../redux/result_reducer"
import { useFetchQuestion } from "../hooks/FetchQuestion"
import QuizTimer from "./QuizTimer"
import Questions from "./Questions"
import axios from "axios"
import "../styles/quiz.css"

export default function Quiz() {
  const [checked, setChecked] = useState(undefined)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { queue, trace } = useSelector((state) => state.questions)
  const { result, registrationNumber, userId } = useSelector((state) => state.result)
  const dispatch = useDispatch()
  const [{ isLoading, serverError }] = useFetchQuestion()

  useEffect(() => {
    if (queue && queue.length > 0) {
      setChecked(result[trace])
    }
  }, [trace, result, queue])

  // Redirect if no userId is set
  if (!userId) {
    return <Navigate to={"/"} replace={true} />
  }

  async function onNext() {
    if (checked !== undefined) {
      dispatch(pushResultAction({ trace, checked }))

      if (trace === queue.length - 1) {
        if (isAllAnswered()) {
          setIsSubmitting(true)
          setIsSubmitted(true)
          // Clear timer data on manual submission - don't block if it fails
          if (registrationNumber) {
            try {
              await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/timer/${registrationNumber}`, {
                timeout: 3000,
              })
              console.log("Timer data cleared successfully on quiz submission")
            } catch (error) {
              console.log("Error clearing timer data (non-critical):", error.message)
            }
          }
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
        <div className="flex-center" style={{ height: "100vh" }}>
          <div className="loading" style={{ width: "40px", height: "40px" }}></div>
          <h3>Loading questions...</h3>
        </div>
      </div>
    )

  if (serverError)
    return (
      <div className="container">
        <div className="card">
          <h3 className="text-center">Error: {serverError.message}</h3>
        </div>
      </div>
    )

  if (isSubmitted) return <Navigate to={"/result"} replace={true} />

  const progressPercentage = ((trace + 1) / queue.length) * 100

  return (
    <div className="container quiz-container">
      <h1 className="title">Quiz in Progress</h1>

      {/* Timer component */}
      <QuizTimer />

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="progress-text">
          <span>
            Question {trace + 1} of {queue.length}
          </span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      {queue && queue[trace] ? (
        <div className="question-card">
          <div className="question-header">
            <span className="question-number">Question {trace + 1}</span>
          </div>

          <Questions onChecked={onChecked} />
        </div>
      ) : (
        <div className="card">
          <div className="text-center">No Questions Available</div>
        </div>
      )}

      <div className="navigation-buttons">
        {trace > 0 ? (
          <button className="btn btn-outline prev-button" onClick={onPrev}>
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Previous</span>
          </button>
        ) : (
          <div></div>
        )}
        <button
          className="btn btn-primary next-button"
          onClick={onNext}
          disabled={checked === undefined || isSubmitting}
        >
          {trace === queue.length - 1 ? (
            isAllAnswered() ? (
              isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <span>Submit Quiz</span>
              )
            ) : (
              <span>Answer all questions to submit</span>
            )
          ) : (
            <>
              <span>Next Question</span>
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

