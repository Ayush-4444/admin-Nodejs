const express = require('express');
const router = express.Router();
const sequelize = require('../userDb')
const Admins= require('../adminDb')(sequelize)
// API 1
router.get('/api1', async(req, res) => {
    const newUsers= await Admins.findAll({})
  console.log(newUsers);
  res.send(newUsers)
});

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await Admins.findOne({
            where: { email, password },
          });
          if (user!==null) {
             res.status(200).send({user:user,message:"Login Success"});
          } else {
            res.send({ message: 'Invalid credentials' });
          }
    }catch (err){
        console.error(err);
        res.send("errorr")
    }
})

router.post('/insert',async(req,res)=>{
    const {email,password } = req.body;
    try{    
        const newUsers= await Admins.create({email,password})
        console.log(newUsers);
        res.send(newUsers);
}catch (err){
        console.error(err);
        res.send("errorr")
}
})

module.exports = router;