import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//async thunk to fetch data from api
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const data = await response.json();
  return data;
});

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },

    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
