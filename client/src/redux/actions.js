///dispatch ---> actions ---> reducer ---> editar los estados ---> componentes

///action para pedir todo el getrecipes del backend con axios y mandarlo a traves del dispatch ---> un action al ---> al reducer con toda la info para enviar al front
import axios from 'axios';

export const getAll = 'GET ALL';
export const getDiets = 'GET DIETS';
export const filter = 'FILTER';
export const filterRecipe = 'FILTER RECIPE';
export const routeGet= 'http://localhost:3001/recipes/getRecipes';
export const routeGetDiets = 'http://localhost:3001/diet/getDiet'

export function get(){
    return async function request(dispatch){
        let requestBack = await axios.get(routeGet);
        return dispatch({
            //las acciones son objetos que tienen 2 propiedades: tipo y payload
            type: getAll, //con type identifico que acciones van llegando
            payload: requestBack.data //aqui va la info que el reducer va a utilizar para modificar los estados, data devolvera el arreglo de objetos de requestBack
        })
    }
}