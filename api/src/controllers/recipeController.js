const { Recipe, Diet } = require('../db.js');
const { json } = require ('body-parser');
const axios = require('axios');
const {API_KEY}  = process.env;

//[ ] POST /recipes
//----------------------------
//!*[ ]GET/ recipes 

//api ---al final modificar para que sean 100 
let urlApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`;
const getApiRecipe = async () => {
    try {
        const api = await axios (urlApi);

        const apiInfo = await api.data.results.map(recipe => {
            return{
                id: recipe.id,
                name: recipe.name,
                imagen: recipe.imagen,
                diets: recipe.diets.map((t=>{return {name: t }})), //tipos de dietas
                //dishTypes: recipe.dishTypes.map((d=>{return {name: d }})),
                //summary: recipe.summary,
                //spoonacularScore: recipe.spoonacularScore,//puntuacion
                //healthScore: recipe.healthScore,
                //analyzedInstructions: recipe.analyzedInstructions
            }
        })
        console.log(apiInfo);
        return apiInfo;
    }
    catch(error){
        console.log(error);
        return('No se pudo conectar a la API', error)
    }
}

//bd
const getDBRecipe = async () => {
    try {
        const recipeByDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return recipeByDb;
    } catch (error) {
        return('No se pudo conectar a la base de datos', error)
    }
}

//together
const allInfoRecipes = async () => {
    try {
        const apiInfo = await getApiRecipe ();
        const dbInfo = await getDBRecipe ();
        const allInfo = await dbInfo.concat(apiInfo);
        return allInfo;
    } catch (error) {
        console.log('Error al traer la información completa, base de datos, más la API', error)
    }
}

//!*[ ] GET /recipes?name="..." //Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
//todo: [ ]getbyname inside getRecipes in general

const getRecipes = async (req, res, next) =>{
    try {
        const {name} = req.query;//pedir el nombre por query
        const allByName = await allInfoRecipes();

        if(name){
            let recipesByName = allByName.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()));//filtro y luego los nombres a minusculas
            recipesByName.length
            ?res.send(recipesByName)//si tiene un "largo/existe" envia recipesbyname
            :res.status(404).send('No se encontro esta receta'); // si no envia que no encontro recipesbyname o no se encontro esa receta
        }else{//getRecipes en general
            console.log('sin nombre asi que mando todo')
            res.json(allByName)
        }
    } catch (error) {
        next(error)
    }
}
//!ID
//*[ ] GET /recipes/{idReceta} ///Obtener el detalle de una receta en particular
const getDetails = async () =>{
    try {
        const api = await axios (urlApi);
        const apiInfo = await api.data.results.map(recipe => {
            return{
                id: recipe.id,
                name: recipe.name,
                imagen: recipe.imagen,
                diets: recipe.diets.map((t=>{return {name: t }})), //tipos de dietas
                dishTypes: recipe.dishTypes.map((d=>{return {name: d }})),
                summary: recipe.summary,
                spoonacularScore: recipe.spoonacularScore,//puntuacion
                healthScore: recipe.healthScore,
                analyzedInstructions: recipe.analyzedInstructions
            }
        })
        console.log(apiInfo);
        return apiInfo;
    }
    catch(error){
        console.log(error);
        return('No se pudo conectar a la API', error)
    }
}

const getByIdApi = async (id) =>{
    try {
        const apiFilter = await getDetails();
        for(let i=0; i<apiFilter.length; i++){
            if(apiFilter[i].id === Number(id)){
                return apiFilter[i];
            }
        }
    } catch (error) {
        console.log('No se pudo obtener el Id de la API', error)
    }
}

const getByIdDb = async (id) =>{
    try {
        const result = await Recipe.findAll({
            where: {
                id: id
            },
            include: Diet
        })
        //console.log(result)
        if(result){
            let dieta = result.Diet.map(e => e.dataValues.name);//pedir de los datavalues solo el name del modelo y guardarlo en el array de dieta
            let recipeDetails = {
                name: result.name,
                imagen: result.imagen,
                diets: result.diets.map((t=>{return {name: t }})), //tipos de dietas
                dishTypes: result.dishTypes.map((d=>{return {name: d }})),
                summary: result.summary,
                spoonacularScore: result.spoonacularScore,//puntuacion
                healthScore: result.healthScore,
                analyzedInstructions: result.analyzedInstructions
            }
            return recipeDetails;
        }
    } catch (error) {
        console.log('No se encontro ese ID por base de datos', error);
    }
}

const getById = async (req, res, next) =>{
    const {id} = req.query;
    try {
        if(typeof(id)==='number'){//porque el otro es uuid e incluye caracteres del tipo letra
            let byApi = await getByIdApi(id);
            const allInfoById = {...byApi}
            res.status(200).send(byApi)
            return json(byApi)
        }else{
            let byDb = await getByIdDb(id);
            console.log(byDb);
            return json(byDb);
        }
    } catch (error) {
        console.log('No se encontro ese ID', error)
    }
}
module.exports = {getRecipes}