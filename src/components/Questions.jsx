import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Questions({ onChecked }) {
    const [selected, setSelected] = useState(undefined)
    const { queue, trace } = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    
    const question = queue[trace]

    useEffect(() => {
        // Reset selected when moving to a new question
        setSelected(result[trace])
    }, [trace])

    function onSelect(i) {
        setSelected(i)
        onChecked(i)
    }

    if (!question) {
        return <div className='text-light'>No Question Available</div>
    }

    return (
        <div className='questions'>
            <h2 className='text-light'>{question.question}</h2>
            <ul key={question.id}>
                {question.options.map((q, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                            checked={selected === i}
                        />
                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${selected === i ? 'checked' : ''}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}