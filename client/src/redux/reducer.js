import { bindActionCreators } from "redux";

const initialState = {
    allRecipes: [],
    recipes: [],
    detail: [],
    diets: [],
    created: {},
    isLoading: true,
    };
    
    const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                //isLoading: action.loading,
            };
        case "GET_NAME":
            return {
                ...state,
                allRecipes: action.payload,
            };
        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload,
            };
        case "GET_DIET":
            return {
                ...state,
                diets: action.payload,
            };
        case "POST_RECIPE":
            return {
                ...state,
                created: action.payload
            };
        case "FILTER_TYPES":
            const allRecipes= state.allRecipes 
            const dietsFilter = action.payload === "all" ? state.allRecipes :
                allRecipes.filter(recipe => recipe.diets.find(diet => {
            if (diet.name === action.payload) {
                return recipe
                }   
            }))
                return{
                ...state,
                recipes: dietsFilter
            } 
        case "ORDER_BY_NAME":
            const orderName =
                action.payload === "all"
                    ? state.allRecipes
                    : action.payload === "asc"
                    ? state.recipes.sort((a, b) => {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());//localeCompare() retorna un número indicando si una cadena de carateres de referencia va antes, después o si es la misma que la cadena dada en orden alfabético. ejemplo: 'check'.localeCompare('against'); // 2 o 1 (u otro valor positivo)
                })
                    : state.recipes.sort((a, b) => {
                return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
                });
            return {
                ...state,
                recipes: orderName,
            };
        case "ORDER_BY_SCORE":
            let orderByScore =
            action.payload === "high" ?
            state.recipes.sort(function (a, b) { //sort: ordena los elementos de un arreglo y lo devuelve el array ordenado
            return b.healthScore - a.healthScore;
            }) :
            state.recipes.sort(function (a, b) {
            return a.healthScore - b.healthScore;
            })
            return {
                ...state,
                recipes: orderByScore,
            }
        default:
            return { ...state };
    }
    };
export default rootReducer;