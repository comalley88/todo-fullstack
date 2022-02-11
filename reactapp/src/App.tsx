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

  const [listTodo, setlistTodo] = useState<Todo[] | null>(null)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)



  // reload API each time an item is added

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const rawResponse = await fetch(url)
        const response = await rawResponse.json()
        setlistTodo(response.data)
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(true)
      }

    }
    fetchData()
  }, [reload]);

useEffect(() => {
    setLoading(true)
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
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(true)
      }

    }
    fetchData()
  }, [filter]);

  // submit new toDo

  const handleSubmit = async (text: string) => {
    const postInfo = { description: text, completed: false }

    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: postInfo })
    };
    try {
      await fetch('http://localhost:1337/api/todos', options);
      setLoading(false)
    } catch (error: any) {
      setError(error)
      setLoading(false)
    }
    setReload(!reload)
  }

  // click to complete 
  const toggleTodo = async (todo: Todo) => {
    const update = { completed: !todo.attributes.completed }
    setLoading(true)
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
      setLoading(false)
    } catch (error: any) {
      setError(error)
      setLoading(false)
    }
    setReload(!reload)
  }


  const clickEdit = async (Modaltext: string, todo: Todo) => {
    setLoading(true)
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
      setLoading(false)
    }
    setReload(!reload)
    setModalOpen(false)
  }

  const clickDelete = async (todo: Todo) => {

    await fetch(`http://localhost:1337/api/todos/${todo.id}`, {
      method: 'DELETE'
    })
    setReload(!reload)
  }

  const clickBulkDelete = (option: string) => {

    let deleteTodos: any[] | undefined = []

    if (option === 'Delete done tasks') {
      deleteTodos = listTodo?.filter(todo => todo.attributes.completed) 
      deleteTodos = deleteTodos?.map(todo => todo.id)
      console.log('delete todos are',deleteTodos)
    }
     else if (option === 'Delete all tasks') {
      deleteTodos = listTodo?.map(todo => todo.id)
    }

    deleteTodos?.forEach(async todo => await fetch(`http://localhost:1337/api/todos/${todo}`, {
      method: 'DELETE'
    }))
    setReload(!reload)
  }


  if (loading) {
    <p>loading...</p>
  }

  return (
    <div className="App">
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

