// const { Sequelize, DataTypes,Op } = require("sequelize");
// const sequelize = new Sequelize("Admin", "root", "Toor!!!123", {
//   host: "localhost",
//   dialect: "mysql",
// });
const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(express.json())
app.use(cors({
    origin: '*'
}));
const sequelize = require('./userDb');
const Users = require('./model')(sequelize);
const Admins= require('./adminDb')(sequelize)

const adminControl= require('./controlers/adminControl')
app.use('/admin', adminControl);
// const Admins= require('./adminDb')(sequelize)
// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing database:', err);
//   });

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

app.get('/home',async(req,res)=>{
    const allUsers= await Users.findAll({})
    const adminsAll = await Admins.findAll({})
    res.send({admins:adminsAll,users:allUsers})
})

app.post('/addUser',async(req,res)=>{
    const {firstName,lastName,email } = req.body;
    // console.log(req.body);
    try{    
      const userExist= await Users.findOne({email:req.email})
            if(userExist){
              return res.send({ message: 'Email already registered',status:300 });
            }
            const newUsers= await Users.create({firstName,lastName,email})
            res.send(newUsers);
    }catch (err){
            console.error(err);
            res.send("errorr")
    }
})

app.delete('/userDeleted/:id',async(req,res)=>{
  const userId = req.params.id;
    try {
      console.log(userId);
      let data = await Users.destroy({
        where: {
          id: userId
        }
      });
      console.log('User deleted successfully');
      res.status(200).json({message:'User deleted successfully',data});
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
})
app.listen(5400)