// "use client"

// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"

// export default function Questions({ onChecked }) {
//   const [selected, setSelected] = useState(undefined)
//   const { queue, trace } = useSelector((state) => state.questions)
//   const result = useSelector((state) => state.result.result)

//   const question = queue[trace]

//   useEffect(() => {
//     // Reset selected when moving to a new question
//     setSelected(result[trace])
//   }, [trace])

//   function onSelect(i) {
//     setSelected(i)
//     onChecked(i)
//   }

//   if (!question) {
//     return <div className="text-center">No Question Available</div>
//   }

//   return (
//     <div className="questions">
//       <h2 className="question-text">{question.question}</h2>
//       <ul className="options-list">
//         {question.options.map((q, i) => (
//           <li key={i} className="option-item">
//             <input
//               type="radio"
//               value={false}
//               name="options"
//               id={`q${i}-option`}
//               onChange={() => onSelect(i)}
//               checked={selected === i}
//               className="option-input"
//             />
//             <label className="option-label" htmlFor={`q${i}-option`}>
//               {q}
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Questions({ onChecked }) {
  const [selected, setSelected] = useState(undefined)
  const { queue, trace } = useSelector((state) => state.questions)
  const result = useSelector((state) => state.result.result)

  const question = queue[trace]

  useEffect(() => {
    // Reset selected when moving to a new question
    setSelected(result[trace])
  }, [trace, result])

  function onSelect(i) {
    setSelected(i)
    onChecked(i)
  }

  if (!question) {
    return <div className="text-center">No Question Available</div>
  }

  return (
    <div className="questions">
      <h2 className="question-text">{question.question}</h2>
      <ul className="options-list">
        {question.options.map((q, i) => (
          <li key={i} className="option-item">
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
              checked={selected === i}
              className="option-input"
            />
            <label className="option-label" htmlFor={`q${i}-option`}>
              {q}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

