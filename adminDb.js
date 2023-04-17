const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Admins = sequelize.define('admins', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, { timestamps: false });

  // sequelize.sync({
  //   alter:true
  // });
 
  return Admins;
};

