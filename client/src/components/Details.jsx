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
                    <div className={style.imgBox}>
                        <img src={recipesDetails.image} alt="imagen de la receta" className={style.imgRecipe}/>
                    </div>
                    <h1 className={style.titleRecipe}>{recipesDetails.title}</h1>
                    <div className={style.info}>
                        <h4 className={style.healthyText}>Healthy Score <span>{recipesDetails.healthScore}</span></h4>
                        <div className={style.diets}>
                            Diets: {recipesDetails.diets?.map(e=>e.name).join(', ')}
                            
                            { recipesDetails.dishTypes?.length && <h4>Dish Types: {recipesDetails.dishTypes?.map(e=>e.name).join(', ')}</h4>}
                        </div>
                        
                    </div>
                </div>
                
                <div className={style.textSummaryInst}>
                    <div>
                        <h3>Summary</h3>
                        {/* {parse(`${recipesDetails.summary}`)} */}
                        <div className={style.textSummary}>{recipesDetails.summary}</div>
                    </div>
                    <div>
                        <h3>Instructions</h3>
                        {/* {parse(`${recipesDetails.analyzedInstructions}`)} */}
                        <div className={style.textInstructions}>
                            {recipesDetails.analyzedInstructions}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
};

export default Details;