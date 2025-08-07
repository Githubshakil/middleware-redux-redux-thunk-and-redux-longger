import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../redux/features/todos/todoSlice'
import { createLogger } from 'redux-logger'


//creat a logger middleware

const logger = createLogger()


const store = configureStore({
  reducer: {
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
export default store