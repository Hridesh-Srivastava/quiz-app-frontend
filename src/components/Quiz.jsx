"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { moveNextAction, movePrevAction } from "../redux/question_reducer"
import { pushResultAction } from "../redux/result_reducer"
import { useFetchQuestion } from "../hooks/FetchQuestion"
import "../styles/quiz.css"

export default function Quiz() {
  const [checked, setChecked] = useState(undefined)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { queue, trace } = useSelector((state) => state.questions)
  const result = useSelector((state) => state.result.result)
  const dispatch = useDispatch()
  const [{ isLoading, serverError }] = useFetchQuestion()

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
      <h1 className="title">HSST Quiz in Progress</h1>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {queue && queue[trace] ? (
        <div className="card question-card">
          <div className="question-header">
            <span className="question-number">
              Question {trace + 1} of {queue.length}
            </span>
          </div>

          <h2 className="question-text">{queue[trace].question}</h2>

          <ul className="options-list">
            {queue[trace].options.map((option, i) => (
              <li key={i} className="option-item">
                <input
                  type="radio"
                  id={`q${i}-option`}
                  name="options"
                  value={false}
                  checked={checked === i}
                  onChange={() => onChecked(i)}
                  className="option-input"
                />
                <label htmlFor={`q${i}-option`} className="option-label">
                  {option}
                </label>
              </li>
            ))}
          </ul>
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
            Previous
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn btn-primary next-button" onClick={onNext} disabled={checked === undefined}>
          {trace === queue.length - 1 ? (
            isAllAnswered() ? (
              "Submit Quiz"
            ) : (
              "Answer all questions to submit"
            )
          ) : (
            <>
              Next Question
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

