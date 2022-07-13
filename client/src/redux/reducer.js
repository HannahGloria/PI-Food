const initialState = {
    allRecipes: [],
    recipes: [],
    diets: [],
    detail: [],
    isLoading: true,
    };
    
    const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                isLoading: action.loading,
            };
        case "GET_NAME":
            return {
                ...state,
                recipes: action.payload,
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
            };
        case "FILTER_TYPES":
                const allDiets = state.allRecipes;
                const filterTypes =
                action.payload === "all"
                    ? allDiets
                    : allDiets.filter((r) => r.diet.includes(action.payload));
            return {
                ...state,
                recipes: filterTypes,
            };
        case "ORDER_BY_NAME":
            const orderName =
                action.payload === "all"
                    ? state.allRecipes
                    : action.payload === "asc"
                    ? state.recipes.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());//localeCompare() retorna un número indicando si una cadena de carateres de referencia va antes, después o si es la misma que la cadena dada en orden alfabético. ejemplo: 'check'.localeCompare('against'); // 2 o 1 (u otro valor positivo)
                })
                    : state.recipes.sort((a, b) => {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                });
            return {
                ...state,
                recipes: orderName,
            };
        case "ORDER_BY_SCORE":
            const orderScore =
                action.payload === "all"
                ? state.allRecipes
                : action.payload === "high"
                ? state.recipes.sort((a, b) => b.score - a.score)
                : state.recipes.sort((a, b) => a.score - b.score);
            return {
                ...state,
                recipes: orderScore,
            };
        default:
            return { ...state };
    }
    };
export default rootReducer;