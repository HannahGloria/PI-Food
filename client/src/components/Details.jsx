import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { getRecipeId, cleanDetail } from '../redux/actions'
import style from './Details.module.css'
import Nav from './Nav';

const Details = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const recipesDetails = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getRecipeId(id))
        return () => dispatch(cleanDetail())
    }, [dispatch, id]);
    return (
        <>
        <Nav/>
        <section className={style.section}>
                {/* <Navbar /> */}
            <div className={style.details}>
                <div className={style.head}>
                    <div>
                        <img src={recipesDetails.image} alt="imagen de la receta" />
                    </div>
                    <h1>{recipesDetails.title}</h1>
                    <div className={style.attributes}>
                        <h4>Healthy Score <span>{recipesDetails.healthScore}</span></h4>
                        
                        {/* Diets: {recipesDetails.diets?.join(', ')} */}
                        Diets: {recipesDetails.diets?.map(e=>e.name).join(', ')}
                        {/* {recipesDetails.diets?.map((d)=>(<p key={d}>Diets: {d}</p>))}  */}
                        
                        { recipesDetails.dishTypes?.length && <h4>Dish Types: {recipesDetails.dishTypes?.map(e=>e.name).join(', ')}</h4>}
                    </div>
                </div>
                
                <div className={style.info}>
                    <div>
                        <h3>Summary</h3>
                        {/* {parse(`${recipesDetails.summary}`)} */}
                        {recipesDetails.summary}
                    </div>
                    <div>
                        <h3>Instructions</h3>
                        {/* {parse(`${recipesDetails.analyzedInstructions}`)} */}
                        {recipesDetails.analyzedInstructions}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
};

export default Details;