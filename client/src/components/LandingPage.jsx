import React from "react";
import { NavLink } from "react-router-dom";
import style from './LandingPage.module.css';
import logo from '../assets/logo.png';

export default function LandingPage (){
    return (
        <div className={style.body}>
            <div className={style.container}>
                <img src={logo} className={style.logo} alt="No se encontro el logo" />
                <NavLink to='/Home' className={style.btn}>Comenzar</NavLink>
            </div>
        </div>
    )
}