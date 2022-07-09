const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const {API_KEY}  = process.env;


//api ---al final modificar para que sean 100 
let urlApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=1`;

const getDiet = async (req, res, next) => {
    try {
        const api = await axios (urlApi);
        const apiData = await api.data;
        const infoDieta = apiData.results.map(e => {//data.results.map
            if(!e.diet) return e.diet = 'no hay tipos de dieta para esta receta'
            const dieta = e.diet.split(', ');
            return dieta;
        });
        const orden = infoDieta.flat().filter(Boolean).sort();
        const string = [...new Set(orden)];
        
        string.map(recipe => Diet.findOrCreate({
            where: {name: recipe}
        }));
        const searchDb = await Diet.findAll();
        res.send(searchDb);
    } catch (error) {
        console.log('No se pudo conectar con las dietas', error)
    }
}
module.exports = {getDiet}