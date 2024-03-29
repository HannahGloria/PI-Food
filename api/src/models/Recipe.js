const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//Get Recipe Information (Api)
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // spoonacularScore: {
    //   type: DataTypes.FLOAT,
    // },
    healthScore: {
      type: DataTypes.FLOAT,
    },
    analyzedInstructions: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },{ timestamps: false});
};
