import React from 'react';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import img from '../assets/logo.png';
import imgHome from '../assets/imgHome.png'
import { getRecipes } from '../redux/actions';
import style from './Nav.module.css'


const Nav = () => {
    const dispatch = useDispatch()

    return (
        <>
        <nav className={style.nav}>
            <ul>
                <li>
                    <NavLink to='/home' onClick={() => dispatch(getRecipes())}>
                        <img src={img} className={style.img} alt="" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/'>
                        <img src={imgHome} className={style.imgHome} alt="" />
                    </NavLink>
                </li>
                
            </ul>
        </nav>
        </>
    )
};

export default Nav;