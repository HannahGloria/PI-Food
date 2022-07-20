import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getRecipeName} from '../redux/actions'
import style from "./SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setTitle(e.target.value) 
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getRecipeName(title)) 
        setTitle('')
        
    }

    return (
        <div className={style.contains}>
            <input className={style.input}
                value = {title}
                type='text'
                placeholder="Recipe"
                onChange={(e) => handleInputChange(e)}
            />
            <button className={style.btnSearch} type='submit' onClick={(e) => handleSubmit(e)}>Search</button>

        </div>
    )
}
