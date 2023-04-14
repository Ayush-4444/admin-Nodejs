const express = require('express');
const router = express.Router();
const sequelize = require('../userDb')
const Admins= require('../adminDb')(sequelize)
const bcrypt = require('bcrypt');
const saltRounds = 10
// API 1
router.get('/api1', async(req, res) => {
    const admins= await Admins.findAll({})
  console.log(admins);
  res.send(admins)
});

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
    //     const user = await Admins.findOne({
    //         where: { email, password },
    //       });
    //       if (user!==null) {
    //          res.status(200).send({user:user,message:"Login Success"});
    //       } else {
    //         res.send({ message: 'Invalid credentials' });
    //       }
    // }catch (err){
    //     console.error(err);
    //     res.send("errorr")
    // }
    const user = await Admins.findOne({ where: { email } });
    console.log('--',user,'--');
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch,'matched');
      if (passwordMatch) {
        res.status(200).send({ user: user, message: 'Login Success' });
      } else {
        res.status(401).send({ message: 'Invalid password' });
      }
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.send('Error');
  }
})

router.post('/insert',async(req,res)=>{
    const {email,password,name } = req.body;
    try{   
         const userExists = await Admins.findOne({ where: { email: email } });
         if (userExists) {
           return res.send({ status:300,message: 'Email already registered' });
           }
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        const newUsers= await Admins.create({email,password: hashedPassword,name })
        console.log(newUsers);
        res.send(newUsers);
}catch (err){
        console.error(err);
        res.send("errorr")
}
})

module.exports = router;