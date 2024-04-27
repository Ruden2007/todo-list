import {TodoProps} from "./todo.interfaces.ts"
import React, {useRef, useState} from "react"

import styles from "./Todo.module.sass"


export default function Todo({id, title, completed, onRemove, onChanged, onCompleted, ...rest}: TodoProps) {
    const [isEditing, setEditing] = useState(false)
    const [checked, setChecked] = useState(completed)
    const [text, setText] = useState(title)
    const titleInput = useRef<HTMLInputElement>(null)

    const editedHandler = () => {
        if (isEditing && onChanged) onChanged(id, titleInput?.current?.value || "")
        setEditing(!isEditing)
    }

    const removeHandler = () => {
        if (onRemove) onRemove(id)
    }

    const onCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onCompleted) onCompleted(id, e.target.checked)
        setChecked(e.target.checked)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEditing) setText(e.target.value)
    }


    return (
        <li className={`${styles.todo} ${!isEditing ? styles.disable : ""}`} {...rest}>
            <input className={styles.check} type="checkbox" checked={checked}
                onChange={onCheckedHandler}/>
            <input
                className={styles.textInput}
                value={text}
                ref={titleInput}
                onChange={onChangeHandler}
                onDoubleClick={(e) => {
                    setEditing(true)
                    void (e.target as HTMLInputElement).focus()
                }}
                onFocus={(e) => {
                    if (!isEditing) e.target.blur()
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        (e.target as HTMLInputElement).blur()
                        editedHandler()
                    }
                }}
            >
            </input>
            <button onClick={removeHandler}>Delete</button>
        </li>
    )
}