import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDietTypes, createRecipe } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import styles from './Create.module.css'
import Nav from "./Nav";

function controlForm(input) {
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if (!input.title) errors.title = 'You have to write a title for the recipe'
    if (!input.summary) errors.summary = 'You have to write a summary for the recipe'
    if (input.healthScore < 0 || input.healthScore > 100 || !reg.test(input.healthScore)) errors.healthScore = 'You have to write a healthScore between 0-100'
    return errors
}


export default function Create() {
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.diets)
    //console.log('esto es diet', listDiets);
    const [errors, setErrors] = useState({})      // este estado local es para, las validaciones
    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: '',
        analyzedInstructions: '',
        diets: [],
        img: ''
    })
    // console.log(input);
    useEffect(() => {
        dispatch(getDietTypes())
    }, [dispatch])
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(controlForm({
            ...input,
            [e.target.name]: e.target.value    // copio lo venga del formulario , si alguno no cumple con validaciones va a poner un texto de advertencia
        }))                                
    }
    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createRecipe(input))
                
        alert('Se ha creado una nueva receta')
        setInput({
            title: '',
            summary: '',
            healthScore: '',
            analyzedInstructions: '',
            diets: [],

        })
}

    function handleDelete(e) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        }) //este es para borrar algun tipe diet que haya elegido, va a crear un nuevo array con todos los que no sean
    }//    el elemento que le hice click

    return (
        <div className={styles.bg}>
        <Nav/>
        <div className={styles.create}>
            <div className={styles.container}>

                <h1 className={styles.h1}>Create New Recipe</h1>
                <form onSubmit={(e) => { handleSubmit(e) }} className={styles.form}>
                    <div>
                        <label>Name:</label>
                        <input
                            type='text'
                            name='title'
                            value={input.title}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.title && (
                            <p className={styles.error}>{errors.title}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Summary:</label>
                        <textarea
                            type='text'
                            name='summary'
                            value={input.summary}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.summary && (
                            <p className={styles.error}>{errors.summary}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Health Score:</label>
                        <input
                            type='text'
                            name='healthScore'
                            value={input.healthScore}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.healthScore && (
                            <p className={styles.error}>{errors.healthScore}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Instruccions:</label>
                        <textarea
                            type='text'
                            name='analyzedInstructions'
                            value={input.analyzedInstructions}
                            onChange={(e) => { handleChange(e) }}
                        />
                    </div>
                    <br></br>
                    <div>
                        <label>Diets:</label>
                    <select onChange={(e) => handleSelect(e)} className={styles.select}>
                        {listDiets?.map((t) => {

                            return <option value={t}> {t} </option>})}
                    </select>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type='text'
                            name='image'
                            value={input.image}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.image && (
                            <p className={styles.error}>{errors.image}</p>
                        )}
                    </div>
                    <br></br>
                        
                    {errors.hasOwnProperty('title') || errors.hasOwnProperty('summary') || errors.hasOwnProperty('healthScore') || errors.hasOwnProperty('image') ? <p className={styles.adv}> Everything has to be completed in order to continue </p> :<button onClick={(e) => handleSubmit(e)} className={styles.button}>Create Recipe</button>}

                {input.diets.map(e => {
                    return (
                        <div >
                            <h5 className={styles.types}>{e}</h5>
                            <button className={styles.btnx} onClick={() => handleDelete(e)}>Delete</button>
                        </div>
                    )
                })}
                </form>
                <br/>
                <Link to='/home'><button className={styles.btn}>Exit</button></Link>
                </div>

            </div>
        </div>
    )
}
