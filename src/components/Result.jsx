import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import {  useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/* actions  */
import { usePublishResult } from '../hooks/setResult.js';

export default function Result() {

    const queue = useSelector(state => state.questions.queue);
    const answers = useSelector(state => state.questions.answers);
    const result = useSelector(state => state.result.result);
    const userId = useSelector(state => state.result.userId);

    const totalPoints = queue.length * 5; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 5) /*5 points for each correct one */
    const flag = flagResult(totalPoints, earnPoints)

    /** store user result */
    usePublishResult({ 
        result, 
        username : userId,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" });


  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz App</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Your Name:</span>
                <span className='bold'>{userId || ""}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions Attempted : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
        </div>

        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>
    </div>
  )
}