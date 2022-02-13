import React, { useState, useEffect } from 'react';
import './App.css';
import '../src/Styles/Style.css'
import { ListItem } from './Components/ListItem'
import { FilterButton } from './Components/Button'
import Modal from './Components/Modal'
import SubmitTodo from './Components/SubmitTodo';
import { DeleteButton } from './Components/Button';


const url = 'http://localhost:1337/api/todos'


function App() {

  const [listTodo, setlistTodo] = useState<Todo[] | undefined>(undefined)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [reload, setReload] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

// on initialise 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResponse = await fetch(url)
        const response = await rawResponse.json()
        setlistTodo(response.data)
      } catch (error: any) {
        setError(error)
      }

    }
    fetchData()
  }, [reload]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResponse = await fetch(url)
        const response = await rawResponse.json()
        if (filter === 'Completed') {
          let filteredList = response?.data?.filter((item: { attributes: { completed: boolean; }; }) => item.attributes.completed)
          setlistTodo([...filteredList])

        } else if (filter === 'Outstanding') {
          let filteredList = response?.data?.filter((item: { attributes: { completed: boolean; }; }) => item.attributes.completed === false)
          setlistTodo([...filteredList])
        } else if (filter === 'All') {
          setlistTodo(response.data)
        }
      } catch (error: any) {
        setError(error)
      }

    }
    fetchData()
  }, [filter]);

// to submit new toDo

  const handleSubmit = async (text: string) => {
    const postInfo = { description: text, completed: false }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: postInfo })
    };
    try {
      await fetch('http://localhost:1337/api/todos', options);
    } catch (error: any) {
      setError(error)
    }
    setReload(!reload)
  }
// to toggle todo item complete: true/ false
  const toggleTodo = async (todo: Todo) => {
    const update = { completed: !todo.attributes.completed }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: update })
    };
    try {
      const rawResponse = await fetch(`http://localhost:1337/api/todos/${todo.id}`, options);
      const response = await rawResponse.json()
      console.log('updated item is', response)
    } catch (error: any) {
      setError(error)
    }
    setReload(!reload)
  }

// to edit list item description
  const clickEdit = async (Modaltext: string, todo: Todo) => {
    const update = { description: Modaltext }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: update })
    };
    try {
      await fetch(`http://localhost:1337/api/todos/${todo.id}`, options);
    } catch (error: any) {
      setError(error)
    }
    setReload(!reload)
    setModalOpen(false)
  }
// to delete single todo list item
  const clickDelete = async (todo: Todo) => {

    await fetch(`http://localhost:1337/api/todos/${todo.id}`, {
      method: 'DELETE'
    })
    setReload(!reload)
  }
// to delete 'all to do' or 'all tasks'
  const clickBulkDelete = async (option: string) => {

    let filteredList: any = []
    if (option === 'Delete done tasks') {
      filteredList = listTodo?.filter(todo => todo.attributes.completed).map(todo => todo.id)
      console.log('delete todos are', filteredList)
    }
    else if (option === 'Delete all tasks') {
      filteredList = listTodo?.map(todo => todo.id)
      console.log('delete todos are', filteredList)
    }

    for (let i = 0; i < filteredList.length; i++) {
      await fetch(`http://localhost:1337/api/todos/${filteredList[i]}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      })
    }

    setReload(!reload)
  }

  return (
    <div className="App">
      {error && <div>error: {error}</div>}
      {modalOpen && <Modal setEdit={clickEdit} setModalOpen={setModalOpen} />}
      <header>
        <h1>Todo</h1>
      </header>
      <div className='main-section'>
        <div className='todo-list-wrapper'>
          <div className='title-wrapper'>
            <h2>Todo List</h2>
          </div>
          <SubmitTodo handleSubmit={handleSubmit} />
          <FilterButton setFilter={setFilter} />
          {listTodo?.map((todo, i) => (
            <ListItem key={i} todo={todo} toggleTodo={toggleTodo} setModalOpen={setModalOpen} deleteTodo={clickDelete} />
          ))}
        </div>
        <DeleteButton handleDelete={clickBulkDelete} />
      </div>
    </div>

  );
}

export default App;

