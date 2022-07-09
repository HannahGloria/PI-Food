const { Recipe, Diet } = require('../db.js');
const { json } = require ('body-parser');
const axios = require('axios');
const {API_KEY} = process.env;

//----------------------------
//!*[ ]GET/ recipes 

//api ---al final modificar para que sean 100 
const urlApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
const getApiRecipe = async () => {
    try {
        const api = await axios(urlApi);
        const apiInfo = api.data.results.map(recipe => {
            return{
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
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
            include: Diet
            // {
            //     model: Diet,
            //     attributes: ['name'],
            //     through: {
            //         attributes: []
            //     }
            // }
        })
        const dataDb = recipeByDb.map(e => e.dataValues);
        return dataDb;
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
        //console.log(allInfo)
        return allInfo;
    } catch (error) {
        console.log('Error al traer la información completa, base de datos, más la API', error)
    }
}
//!pedir por TITLE <-----
//!*[ ] GET /recipes?title="..." //Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
//todo: [ ]getbytitle inside getRecipes in general

const getRecipes = async (req, res, next) =>{
    try {
        const {title} = req.query;
        const allByTitle = await allInfoRecipes();

        if(title){
            let recipesByTitle = allByTitle.filter(e=> e.title.toLowerCase().includes(title.toLowerCase()));//filtro y luego los nombres a minusculas
            recipesByTitle.length
            ?res.send(recipesByTitle)//si tiene un "largo/existe" envia recipesbyname
            :res.status(404).send('No se encontro esta receta'); // si no, envia que no encontro recipesbyname o no se encontro esa receta
        }else{//getRecipes en general
            console.log('sin nombre asi que mando todo')
            res.json(allByTitle)
        }
    } catch (error) {
        next(error)
    }
}
//!ID   se envia cuando tenga el ID de una receta 
//*[ ] GET /recipes/{idReceta} ///Obtener el detalle de una receta en particular
const getDetails = async () =>{
    try {
        const api = await axios.get(urlApi);
        const apiInfo = api.data.results.map(recipe => {
            return{
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                diets: recipe.diets.map((t=>{return {name: t }})), //tipos de dietas
                dishTypes: recipe.dishTypes.map((d=>{return {name: d }})),
                summary: recipe.summary,
                spoonacularScore: recipe.spoonacularScore,//puntuacion
                healthScore: recipe.healthScore,
                analyzedInstructions: recipe.analyzedInstructions[0]?.steps.map((step)=>{return`${step.number}. ${step.step}`;})
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
                title: recipe.title,
                image: recipe.image.url,
                diets: result.diets.map((t=>{return {name: t }})), //tipos de dietas
                dishTypes: result.dishTypes.map((d=>{return {name: d }})),
                summary: result.summary,
                spoonacularScore: result.spoonacularScore,//puntuacion
                healthScore: result.healthScore,
                analyzedInstructions: result.analyzedInstructions[0]?.steps.map((step)=>{return`${step.number}. ${step.step}`;})
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
        //typeof(id)==='number'
        if(id.length<=6){//porque el otro es uuid e incluye caracteres del tipo letra
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

//*[ ] POST /recipes
const postRecipes = async (req, res, next) => {
    try {
        const {title, image, diets, dishTypes, summary, spoonacularScore, healthScore, analyzedInstructions} = req.body;
        const create = await Recipe.create({
            title,
            image,
            diets,
            dishTypes,
            summary,
            spoonacularScore,
            healthScore,
            analyzedInstructions,
            createdInDb: true
        })
        let dietByDb = await Diet.findAll({
            where: {name: diets},
        })
        await create.addDiet(dietByDb)
        res.send(create);
    } catch (error) {
        console.log(error)
    }
}
module.exports = {getRecipes, getById, postRecipes}