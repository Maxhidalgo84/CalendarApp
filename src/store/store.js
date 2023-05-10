import { configureStore } from '@reduxjs/toolkit'
//import { authSlice } from './auth/authSlice'
import { uiSlice } from './ui/uiSlice'
import { calendarSlice } from './calendar/calendarSlice'
//import { journalSlice } from './journal/journalSlice'

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
        })
    
})