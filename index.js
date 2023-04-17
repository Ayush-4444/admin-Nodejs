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
const adminControl = require('./controlers/adminControl')
app.use('/admin', adminControl);
// const Admins= require('./adminDb')(sequelize)
// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing database:', err);
//   });

app.get('/users', async (req, res) => {
  try {
    const { search } = req.query;
    console.log('searching for users with search term:', search);
    let where = {};
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } }
      ];
    }
    const newUsers = await Users.findAll({ where });
    res.send({ users: newUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send("ERROR BRO");
  }
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const oneUser = await Users.findOne({ where: { id: id } });
  res.send( oneUser );
});

app.put('/updateUser/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    let updateUser=await Users.update(updatedData, { where: { id: id } });
    res.send({ user: updateUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update user' });
  }
});




app.get('/home', async (req, res) => {
  const allUsers = await Users.findAll({})
  const adminsAll = await Admins.findAll({})
  res.send({ admins: adminsAll, users: allUsers })
})

app.post('/addUser', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  // console.log(req.body.email,"=================",req.email);
  let user = req.body
  console.log(user);
  try {
    const userExist = await Users.findOne({ where: { email: req.body.email } });
    console.log(userExist, "exiiittteeedd user++++++++++++");
    if (userExist) {
      return res.send({ message: 'Email already registered', status: 300 });
    }
    const newUsers = await Users.create({ firstName, lastName, email })
    res.send(newUsers);
  } catch (err) {
    console.error(err);
    res.send("errorr")
  }
})

app.delete('/userDeleted/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    console.log(userId);
    let data = await Users.destroy({
      where: {
        id: userId
      }
    });
    console.log('User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
})
app.listen(6400)