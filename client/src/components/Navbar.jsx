//import React from "react";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDietTypes, filterByType, orderByName, orderByScore, getRecipes} from '../redux/actions'
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () =>{
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
    const [, setOrder] = useState('');
    const [, setScore] = useState('');
    const currentRecipes = useSelector((state) => state.recipes);

    // function handleSelect(event){
    //     dispatch(filterByType(event.target.value));//dispatch(filter (Default/ovo/diary)
    // }

    useEffect(()=>{
        dispatch(getDietTypes())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getRecipes())
    }, [dispatch])
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleDiets(e){
        dispatch(filterByType(e.target.value));
    }

    function handleByName (e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(`Orden ${e.target.value}`);
    }
    function handleByScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setScore(`Score ${e.target.value}`);
    }
    return(
        <div className={style.navbar}>
            <div>

                <select name="sort" id="sort" defaultValue="DEFAULT" onChange={(e) => {handleByName(e)}}>
                        <option value="DEFAULT" disabled>Alphabetical Order</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>
                    <select name="points" id="points" defaultValue="DEFAULT"  onChange={(e) => {handleByScore(e)}}>
                        <option value="DEFAULT" disabled>order by points</option>
                        <option value="points-asc">Lowest to highest score</option>
                        <option value="points-des">Highest to lowest score</option>
                    </select>
                    <select name="diets" id="diets" defaultValue="DEFAULT"  onChange={handleDiets}>
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
                    </select>
                    {/* <select onChange={handleDiets}>
                        <option value="Default">Diets:</option>
                            {diets.map((e)=>{
                                return <option key={e.id} value={e.name}>{e.name}</option>
                            })}
                    </select> */}
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