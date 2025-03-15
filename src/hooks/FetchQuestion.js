// import { useEffect, useState } from "react"
// import { useDispatch } from "react-redux"; /*useDispatch can only be accessible inside a hook(hook inside hook) but not inside the function */
// import { getServerData } from "../helper/helper.jsx";

// /* redux actions */
// import * as Action from '../redux/question_reducer.js'

// /* fetch question hook to fetch api data and set value to store */
// export const useFetchQuestion = () => {
//     const dispatch = useDispatch();   
//     const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

//     useEffect(() => {
//         setGetData(prev => ({...prev, isLoading : true}));

//         /* async function to fetch backend data */
//         (async () => {
//             try {
//                 const [{ questions, answers }] = await getServerData(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                
//                 if(questions.length > 0){
//                     setGetData(prev => ({...prev, isLoading : false}));
//                     setGetData(prev => ({...prev, apiData : questions}));

//                     /* dispatch an action */
//                     dispatch(Action.startExamAction({ question : questions, answers }))

//                 } else{
//                     throw new Error("No Questions Available!");
//                 }
//             } catch (error) {
//                 setGetData(prev => ({...prev, isLoading : false}));
//                 setGetData(prev => ({...prev, serverError : error}));
//             }
//         })();
//     }, [dispatch]);

//     return [getData, setGetData];
// }


// /* MoveAction Dispatch function */
// export const MoveNextQuestion = () => async (dispatch) => {
//     try {
//         dispatch(Action.moveNextAction()); /** increase trace by 1 */
//     } catch (error) {
//         console.log(error)
//     }
// }

// /* PrevAction Dispatch function */
// export const MovePrevQuestion = () => async (dispatch) => {
//     try {
//         dispatch(Action.movePrevAction()); /** decrease trace by 1 */
//     } catch (error) {
//         console.log(error)
//     }
// }


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from '../redux/question_reducer';

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        (async () => {
            try {
                const data = await getServerData(`${import.meta.env.VITE_REACT_APP_SERVER_HOSTNAME}/api/questions`);
                const { questions, answers } = data;

                if (questions && questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false, apiData: questions }));
                    dispatch(Action.startExamAction({ questions, answers }));
                } else {
                    throw new Error("No Questions Available!");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.error("Error moving to next question:", error);
    }
};

export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.error("Error moving to previous question:", error);
    }
};