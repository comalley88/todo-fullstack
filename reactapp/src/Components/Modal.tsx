import React, { useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from 'react-redux'

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: (Modaltext: string, todoReducer: Todo) => void
}
const Modal: React.FC<Props> = ({ setEdit, setModalOpen }) => {

  const todoReducer = useSelector((state: RootState) => state.todo.value)

  const [modalText, setModalText] = useState('')

  console.log('reducer is', todoReducer)
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-container">
        <p>Update todo</p>
        <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
        </button>
        </div>
        <input
          placeholder={todoReducer.attributes.description}
          onChange={(e) => setModalText(e.target.value)}
          value={modalText}
          className="text-input-box"></input>
        <div className="footer">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancel-btn"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              setEdit(modalText, todoReducer);
            }}
          >Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;