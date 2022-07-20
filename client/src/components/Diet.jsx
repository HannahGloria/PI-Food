import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDietTypes } from '../redux/actions'

import style from './Create.module.css'

const Diets = ({handleRemoveType, handleAddType, diets }) => {
    let dietas = useSelector(state => state.diets)
    //const [arraydiets, setArraydiets] = useState(diets)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDietTypes())
    }, [dispatch])
    

    const handleChange = e => {
        const id = parseInt(e.target.value)
        const obj = diets.find(diet => diet.id === id);
        
        handleAddType(obj)
    }
    

    return (
        <>
            <div className={style.types_select}>
                <select name="tipos" id="tipos" defaultValue='default' onChange={handleChange}>
                    <option value='default' disabled>Tipos de Dieta</option>
                    {
                        diets.length > 0 ? diets.map(diet => (<option key={diet.id} value={diet.id}>{diet.nombre}</option>)) : <option>Loading....</option>
                    }
                </select>
            </div>
            <div>
                <ul>
                    {
                        dietas.map(dieta => (
                            <li key={dieta.id}>
                                <span>{dieta.name}</span>
                                <button onClick={() => handleRemoveType(dieta.id)}>X</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Diets