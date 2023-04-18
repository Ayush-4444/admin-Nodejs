// const { Sequelize, DataTypes,Op } = require("sequelize");
// const sequelize = new Sequelize("Admin", "root", "Toor!!!123", {
//   host: "localhost",
//   dialect: "mysql",
// });
const express = require("express");
const app = express();
// app.use(express.json());
const cors = require('cors');

app.use(express.json())
app.use(cors({
  origin: '*'
}));
const sequelize = require('./userDb');
const Users = require('./model')(sequelize);
const Admins = require('./adminDb')(sequelize)
const { Op } = require("sequelize");
const userControl = require('./controlers/usersControler')
const adminControl = require('./controlers/adminControl')
app.use('/',userControl);
app.use('/admin', adminControl);
// const Admins= require('./adminDb')(sequelize)
// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing database:', err);
//   });

app.get('/home',async(req,res)=>{
    const allUsers= await Users.findAll({})
    const adminsAll = await Admins.findAll({})
    console.log('hiii');
    res.send({admins:adminsAll,users:allUsers})
})

app.listen(5600)
