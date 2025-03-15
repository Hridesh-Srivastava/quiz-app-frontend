const initialState = {
    queue: [],
    answers: [],
    trace: 0,
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_EXAM':
            return {
                ...state,
                queue: action.payload.questions,
                answers: action.payload.answers,
            };
        case 'MOVE_NEXT':
            return {
                ...state,
                trace: state.trace + 1,
            };
        case 'MOVE_PREV':
            return {
                ...state,
                trace: state.trace - 1,
            };
        case 'RESET_ALL':
            return initialState;
        default:
            return state;
    }
};

// Action creators
export const startExamAction = (payload) => ({
    type: 'START_EXAM',
    payload,
});

export const moveNextAction = () => ({
    type: 'MOVE_NEXT',
});

export const movePrevAction = () => ({
    type: 'MOVE_PREV',
});

export const resetAllAction = () => ({
    type: 'RESET_ALL',
});

export default questionReducer;