import React from 'react';
import st from './Paginado.module.css'

const Paginado = ({recipesPerPage, allRecipes, paginado}) => {

    const pagNumbers = []

    for(let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pagNumbers.push(i)
    }

    return (
        <nav className={st.paginas}>
            <ul>
                {
                    pagNumbers && pagNumbers.map(number => (
                        <li key={number}>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};

export default Paginado;