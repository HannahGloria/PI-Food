//import React from "react";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDietTypes, filterByType, orderByName, orderByScore, getRecipes, getRecipeName} from '../redux/actions'
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () =>{
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    // const recipes = useSelector((state) => state.recipes);
    // const [, setOrder] = useState('');
    // const currentRecipes = useSelector((state) => state.recipes);
    // const [title, setTitle] = useState('');

    // function handleSelect(event){
    //     dispatch(filterByType(event.target.value));//dispatch(filter (Default/ovo/diary)
    // }

    useEffect(()=>{
        dispatch(getDietTypes())
    }, [dispatch])

    // useEffect(()=>{
    //     dispatch(getRecipes())
    // }, [dispatch])
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getRecipes());
    }
    // const handleInput = (e) => {
    //     e.preventDefault();
    //     setTitle(e.target.value);
    // }
    // const handleNames = (e) => {
    //     e.preventDefault();
    //     dispatch(getRecipeName(title));
    // }
    const handleDiets = (e) => {
        //e.preventDefault();
        dispatch(filterByType(e.target.value));
    }
    const handleFilterName = (e) => {
        dispatch(orderByName(e.target.value))
    }
    const handleFilterScore = (e) => {
        dispatch(orderByScore(e.target.value))
    }
    // const orderNames = (e) => {
    //     e.preventDefault();
    //     dispatch(orderByName(e.target.value));
    //     setOrder(`Orden ${e.target.value}`);
    // }
    // const orderScore = (e) => {
    //     e.preventDefault();
    //     dispatch(orderByScore(e.target.value));
    //     setOrder(`healthScore ${e.target.value}`);
    // }
    return(
        <div className={style.navbar}>
            <div>
                    <select name="sort" id="sort" onChange={(e) => {handleFilterName(e)}}>
                        <option value="all" disabled>Alphabetical Order</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>
                    <select name="healthScore" id="healthScore" onChange={(e) => {handleFilterScore(e)}}>
                        <option value="all" disabled>Order by healthScore</option>
                        <option value="high">Highest score</option>
                        <option value="low">Lowest score</option>
                    </select>
                    <select onChange={handleDiets}>
                        <option value="Default">Diets:</option>
                        {diets?.map((t) => {
                            return <option value={t}> {t} </option>})
                        }
                    </select>
                    {/* <select name="diets" id="diets" defaultValue="DEFAULT"  onChange={handleDiets}>
                        <option value="DEFAULT" disabled>Diet:</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                        <option value="gluten free">Gluten free</option>
                        <option value="dairy free">Dairy free</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="fodmap friendly">fodmap friendly</option>
                        <option value="whole30">whole30</option>
                    </select> */}
                    <button onClick={handleClick} className={style.btnReload}>Load again</button>
                <ul>
                    <li className={style.link}>
                        <NavLink to='/create'>Create new recipe</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar;