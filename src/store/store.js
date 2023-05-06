import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { jorunalSlice } from './journal/sliceJournal'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, 
    journal: jorunalSlice.reducer,
  },
})

