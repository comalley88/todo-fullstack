import { useState } from "react"

interface Props {
    handleSubmit: (text: string) => void
}

export const SubmitTodo: React.FC<Props> = ({ handleSubmit }) => {

    const [text, setText] = useState('')

    return (
        <div className="submit-todo-wrapper">
            <input
                placeholder='add your to do here'
                className='text-input-box'
                onChange={(e) => setText(e.target.value)}
                value={text}
            >
            </input>
            <button onClick={() => {
                handleSubmit(text)
                setText("")
            }} className='input-button'>
                add
            </button>
        </div>
    )
}

export default SubmitTodo