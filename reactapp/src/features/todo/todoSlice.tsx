import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodoState {
    value: Todo
  }

const initialState: TodoState = {
    value:  {id: 0, attributes: {description:'', completed: false}},
  }

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        todoReducer: (state, action: PayloadAction<Todo>) => {

            state.value = action.payload
        }
    }

})


export const {todoReducer} = todoSlice.actions

export default todoSlice.reducer