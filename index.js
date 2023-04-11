const { Sequelize, DataTypes,Op } = require("sequelize");
const sequelize = new Sequelize("Admin", "root", "Toor!!!123", {
  host: "localhost",
  dialect: "mysql",
});
const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(express.json())
app.use(cors({
    origin: '*'
}));
app.use((req,res,next)=>{
  
    res.setHeader('Access-Control-Allow-Methods','*');
    next(); 
})
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

  app.get('/users',async(req,res )=>{
    try {
        const newUsers= await Users.findAll({})
        res.setHeader('Access-Control-Allow-Methods','*');
        res.send({users:newUsers});
    }catch (err) {
                console.error(err);
                res.status(500).send("ERROR BRO");
              }
})
app.post('/addUser',async(req,res)=>{
    const {firstName,lastName,email } = req.body;
    // console.log(req.body);
    try{    
            const newUsers= await Users.create({firstName,lastName,email})
            res.send(newUsers);
    }catch (err){
            console.error(err);
            res.send("errorr")
    }
})
app.listen(5400)