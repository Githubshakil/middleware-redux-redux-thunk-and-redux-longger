import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../redux/features/todos/todoSlice'

const store =configureStore({
  reducer: {
    todos:todoReducer
  }
})

export default store