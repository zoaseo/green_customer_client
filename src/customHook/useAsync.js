import { useReducer, useEffect } from 'react';
const initialState = {
    loading: false,
    data: null,
    error: null,
}

function reducer(state, action){
    switch(action.type){
        case "LOADING":
            return {
                ...initialState,
                loading: true,
            }
        case "SUCCESS":
            return {
                ...initialState,
                data: action.data,
            }
        case "ERROR":
            return {
                ...initialState,
                error: action.error,
            }
        default:
            return state;
    }
}
function useAsync(callback, deps=[]){
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const fetchDate = async () => {
        dispatch({type: "LOADING"});
        try {
            const data = await callback();
            dispatch({
                type: "SUCCESS",
                data: data,
            })
        }
        catch(e) {
            dispatch({
                type: "ERROR",
                error: e,
            })
        }
    }
    useEffect(()=>{
        fetchDate();
        // eslint-disable-next-line
    },deps);
    return [ state, fetchDate ];
}
export default useAsync;