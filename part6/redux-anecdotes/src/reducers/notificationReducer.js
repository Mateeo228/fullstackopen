import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      console.log('hii3')
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const { newNotification, removeNotification } = notificationSlice.actions

export const setNotification = ( message, seconds ) => {
  return async dispatch => {
    dispatch(newNotification(message))
    setTimeout( () => {
      dispatch(removeNotification(null))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer