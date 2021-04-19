

/* USER_LOADING ACTIONS: */
export const SET_USER_DATA = "SET_USER_DATA"


export const setUserData = (userData) => {
    console.log("action to set user data:")
    console.log(userData)
    return {
        type: SET_USER_DATA,
        payload: userData,
    }
}
export const setCurState = (newState) => {
    console.log("action to set new state:")
    console.log(newState)
    return {
        type: SET_USER_DATA,
        payload: newState,
    }
}