import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './Cards.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../redux/actions';
import { useEffect } from 'react';
import Details from './Details';

export default function Cards(props){
    return(
        <div className={style.Card} key={props.id}>
            <div>
                <h1 className={style.title}>{props.title}</h1>
            </div>
            <div>
                <img className={style.img} src={props.img} alt={"imagen"}/>
            </div>
            <div>
                <h4 className={style.diets}>
                    {props.diets?.map(e=>e.name).join(', ')}
                </h4>
            </div>
        </div>
    )
}

//export default Cards;