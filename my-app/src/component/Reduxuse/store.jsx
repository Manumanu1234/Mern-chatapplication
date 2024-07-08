import { configureStore } from '@reduxjs/toolkit'
import ThemeSliceReducer  from './Themeslicer'
export const store=configureStore({
  reducer: {
    key:ThemeSliceReducer,
  },
})