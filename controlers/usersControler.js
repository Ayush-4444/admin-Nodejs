const express = require('express');
const router = express.Router();
const sequelize = require('../userDb')
const Users = require('../model')(sequelize);

router.get('/users',async(req,res )=>{
    try {
      const { search,order,orderBy } = req.query;
      console.log('searching for users with search term:', req.query);
      let where = {};
      if (search) {
        where[Op.or] = [
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } }
        ];
      }
      const orderByClause = order && orderBy ? [[order, orderBy]] : [];
      const newUsers = await Users.findAll({ where, order: orderByClause });
    res.send({ users: newUsers });
    }catch (err) {
                console.error(err);
                res.status(500).send("ERROR BRO");
              }
})

router.post('/addUser',async(req,res)=>{
    const {firstName,lastName,email } = req.body;
    // console.log(req.body.email,"=================",req.email);
    let user = req.body
    console.log(user);
    try{    
      const userExist = await Users.findOne({ where: { email: req.body.email } });
      console.log(userExist,"exiiittteeedd user++++++++++++");
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

router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const oneUser = await Users.findOne({ where: { id: id } });
    res.send( oneUser );
  });
  
  router.put('/updateUser/:id', async (req, res) => {
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

  router.delete('/userDeleted/:id', async (req, res) => {
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
  

module.exports = router;