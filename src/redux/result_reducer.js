import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId: null,
        email: null,
        registrationNumber: null,
        courseYear: null,
        section: null,
        result: [],
        answers: []
    },
    reducers : {
        setUserData : (state, action) => {
            const { name, email, registrationNumber, courseYear, section } = action.payload
            state.userId = name
            state.email = email
            state.registrationNumber = registrationNumber
            state.courseYear = courseYear
            state.section = section
        },
        pushResultAction : (state, action) => {
            const { trace, checked } = action.payload
            state.result[trace] = checked
        },
        resetResultAction : () => {
            return {
                userId: null,
                email: null,
                registrationNumber: null,
                courseYear: null,
                section: null,
                result: [],
                answers: []
            }
        }
    }
})

export const { setUserData, pushResultAction, resetResultAction } = resultReducer.actions
export default resultReducer.reducer