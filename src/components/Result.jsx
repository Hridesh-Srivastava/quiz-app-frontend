import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { attempts_Number, earnPoints_Number } from '../helper/helper'
import { usePublishResult } from '../hooks/setResult'

export default function Result() {
    const dispatch = useDispatch()
    const { 
        questions: { queue, answers },
        result: { result, userId, email, registrationNumber, courseYear, section }
    } = useSelector(state => state)

    const totalPoints = queue.length * 5
    const attempts = attempts_Number(result)
    const earnPoints = earnPoints_Number(result, answers, 5)
    const flag = earnPoints >= totalPoints * 0.5

    usePublishResult({
        result,
        username: userId,
        email,
        registrationNumber,
        courseYear,
        section,
        attempts,
        points: earnPoints,
        achieved: flag ? "Passed" : "Failed"
    })

    function onRestart() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Results</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username:</span>
                    <span className='bold'>{userId || ""}</span>
                </div>
                <div className='flex'>
                    <span>Registration Number:</span>
                    <span className='bold'>{registrationNumber || ""}</span>
                </div>
                <div className='flex'>
                    <span>Email:</span>
                    <span className='bold'>{email || ""}</span>
                </div>
                <div className='flex'>
                    <span>Course/Year:</span>
                    <span className='bold'>{courseYear || ""}</span>
                </div>
                <div className='flex'>
                    <span>Section:</span>
                    <span className='bold'>{section || ""}</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points:</span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions:</span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts:</span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points:</span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
            </div>
        </div>
    )
}