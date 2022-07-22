import React from 'react';
import style from './Cards.module.css';
import imgManzana from '../assets/manzana.png'

export default function Cards(props){
    return(
        <div className={style.Card} key={props.id}>
            <div>
                <h1 className={style.title}>{props.title}</h1>
            </div>
            <div>
                <img className={style.img} src={props.img} alt={"imagen"}/>
            </div>
            <div className={style.healthBox}>
                <img src={imgManzana} className={style.manzana} alt="healthy" />
                <h4 className={style.textHealth}>Health score:</h4>
                <h4 className={style.healthScore}>{props.healthScore}</h4>
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