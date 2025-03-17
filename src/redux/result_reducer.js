// import { createSlice } from "@reduxjs/toolkit"

// export const resultReducer = createSlice({
//     name: 'result',
//     initialState : {
//         userId: null,
//         email: null,
//         registrationNumber: null,
//         courseYear: null,
//         section: null,
//         result: [],
//         answers: []
//     },
//     reducers : {
//         setUserData : (state, action) => {
//             const { name, email, registrationNumber, courseYear, section } = action.payload
//             state.userId = name
//             state.email = email
//             state.registrationNumber = registrationNumber
//             state.courseYear = courseYear
//             state.section = section
//         },
//         pushResultAction : (state, action) => {
//             const { trace, checked } = action.payload
//             state.result[trace] = checked
//         },
//         resetResultAction : () => {
//             return {
//                 userId: null,
//                 email: null,
//                 registrationNumber: null,
//                 courseYear: null,
//                 section: null,
//                 result: [],
//                 answers: []
//             }
//         }
//     }
// })

// export const { setUserData, pushResultAction, resetResultAction } = resultReducer.actions
// export default resultReducer.reducer


import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    username: "",
    email: "",
    registrationNumber: "",
    courseYear: "",
    section: "",
    result: [],
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setUserData: (state, action) => {
      state.username = action.payload.username || action.payload.name
      state.email = action.payload.email
      state.registrationNumber = action.payload.registrationNumber
      state.courseYear = action.payload.courseYear || ""
      state.section = action.payload.section || ""
    },
    pushResultAction: (state, action) => {
      if (typeof action.payload === "object" && "trace" in action.payload) {
        state.result[action.payload.trace] = action.payload.checked
      } else {
        state.result.push(action.payload)
      }
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload
      state.result[trace] = checked
    },
    resetResultAction: (state) => {
      state.userId = null
      state.username = ""
      state.email = ""
      state.registrationNumber = ""
      state.courseYear = ""
      state.section = ""
      state.result = []
    },
  },
})

export const { setUserId, setUserData, pushResultAction, updateResultAction, resetResultAction } = resultReducer.actions

export default resultReducer.reducer

