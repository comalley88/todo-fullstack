import React from 'react';

interface FilterButtonProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}
interface DeleteButtonProps {
  handleDelete: (option: string) => void;
}


const FilterButton: React.FC<FilterButtonProps> = ({ setFilter }) => {

  const options: string[] = ['All', 'Outstanding', 'Completed']

  return (
    <div className='todo-list-buttongroup'>
      {options.map((option, i) => (
        <button key={i} className='filter-button' onClick={() => setFilter(option)}>{option}</button>
      ))}
    </div>
  )
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ handleDelete }) => {

  const options: string[] = ['Delete done tasks', 'Delete all tasks']

  return (
    <div className='delete-button-wrapper'>
      {options.map((option, i) => (
        <button key={i} className='delete-button' onClick={() => handleDelete(option)}>{option}</button>
      ))}
    </div>
  )
}

export { FilterButton, DeleteButton };
