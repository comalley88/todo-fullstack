import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { todoReducer } from '../features/todo/todoSlice'

interface Props {
  todo: Todo;
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ListItem: React.FC<Props> = ({ todo, setModalOpen, deleteTodo, toggleTodo }) => {

  const dispatch = useDispatch()

  return (
    <div className='item-container'>
      <div>
        <FontAwesomeIcon onClick={() => toggleTodo(todo)} className='icon' style={{ color: todo.attributes.completed ? 'green' : undefined }} icon={faCheckCircle} />
        <span style={{ textDecoration: todo.attributes.completed ? 'line-through' : undefined }}>{todo.attributes.description}</span>
      </div>
      <div className='edit-icons'>
        <FontAwesomeIcon  onClick={() => {
          dispatch(todoReducer(todo))
          setModalOpen(true)
        }
        } className='icon' icon={faEdit} />
        <FontAwesomeIcon onClick={() => deleteTodo(todo)} className='icon' icon={faTrashAlt} />
      </div>
    </div>
  )
}

export default ListItem;
