import { getRecipes } from '../redux/actions';
import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from './Paginado';
import Cards from './Cards';
import style from './Home.module.css'
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Navbar from './Navbar'
import SearchBar from './SearchBar';
//Allrecipes
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const { allRecipes, recipes } = useSelector(state => state);
    const dispatch = useDispatch();
    //const [setOrder, setScore] = useState('');


    const lastPage = currentPage * 9;
    const firstIndex = lastPage - 9;
    const currentRecipes = recipes.length > 0 ? recipes.slice(firstIndex, lastPage) : allRecipes.slice(firstIndex, lastPage);

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    const handlePaginado = pagNumber => setCurrentPage(pagNumber)

    return (
        <div className={style.bg}>
        <Nav/>
        <Navbar/>
        <SearchBar/>
            <section className={style.wrapper}>
                {
                    currentRecipes?.map(recipe => (
                        <Link to={`/Details/${recipe.id}`}>
                            <Cards 
                                key={`${recipe.id}`}
                                //key={recipe.id}
                                id={recipe.id}
                                title={recipe.title}
                                //diets.map((diets, i)=><div key={i}>{diets.name}
                                diets={recipe.diets}
                                dishTypes={recipe.dishTypes}
                                img={recipe.image}
                                summary={recipe.summary}
                                analyzedInstructions={recipe.analyzedInstructions}
                            />
                        </Link>
                    ))
                }
            </section>
            <Paginado 
                recipesPerPage={9}
                allRecipes={ recipes.length > 0 ? recipes.length : allRecipes.length}
                paginado={handlePaginado}
            />
        </div>
    )
};

export default Home;