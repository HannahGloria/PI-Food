import axios from "axios";

export const getRecipes = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(
                "http://localhost:3001/recipes/getRecipes"
        );

        return dispatch({
            type: "GET_RECIPES",
            payload: json.data,
            loading: false,
        });
        } catch (error) {
        console.log(error);
    }
    };
};

export const getRecipeName = (title) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(
            `http://localhost:3001/recipes/getRecipes?title=${title}`
        );

        return dispatch({
            type: "GET_NAME",
            payload: json.data,
        });
    } catch (error) {
        console.log(error);
    }
    };
};

export const getRecipeId = (id) => {
  // console.log("detailss", id);
    return async (dispatch) => {
        try {
            const json = await axios.get(
                //http://localhost:3001/recipe/getById?id=715415
            //`http://localhost:3001/recipe/getById/${id}`
            `http://localhost:3001/recipe/getById?id=${id}`
            );
      // console.log("detail", json.data);
            return dispatch({
            type: "GET_DETAILS",
            payload: json.data,
        });
        } catch (error) {
        console.log(error);
    }
    };
};

export const getDietTypes = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get("http://localhost:3001/diet/getDiet");
        return dispatch({
            type: "GET_DIET",
            payload: json.data,
        });
        } catch (error) {
        console.log(error);
        }
    };
};

export const createRecipe = (payload) => {
    return async (dispatch) => {
        try {
        const response = await axios.post(
            "http://localhost:3001/recipe/create",
            payload
        );
        return dispatch({ type: "POST_RECIPE", payload: response });
        } catch (error) {
        console.log(error);
    }
    };
};

export const cleanDetail = () => {
    return {
        type: "GET_DETAILS",
        payload: [],
    };
};

export const filterByType = (payload) => ({
    // return {
    //     type: "FILTER_TYPES",
    //     payload,
    // };
    type: "FILTER_TYPES",
    payload,
});

export const orderByName = (payload) => ({
    type: "ORDER_BY_NAME",
    payload,
});

export const orderByScore = (payload) => ({
    type: "ORDER_BY_SCORE",
    payload,
});