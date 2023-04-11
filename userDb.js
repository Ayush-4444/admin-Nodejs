const sequelize = new Sequelize("Admin", "root", "Toor!!!123", {
    host: "localhost",
    dialect: "mysql",
  });
  const { Sequelize, DataTypes,Op } = require("sequelize");
const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
  },{timestamps:false});
  sequelize.sync({ force: true }).then(() => {
    console.log("Database tables synchronized successfully.");
  }).catch((err) => {
    console.error("Unable to synchronize database tables:", err);
  });
  module.exports = Users;

