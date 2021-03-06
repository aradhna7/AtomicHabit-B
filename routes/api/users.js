const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const User= require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  PUBLIC
router.post('/', [
    check('name','name is required').not().isEmpty(),
    check('email','enter a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})

  ] , async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const {name , email , password} = req.body;
    try{

      //SEE IF USER EXISTS
      let user = await User.findOne({email});

      if(user){
        return res.status(400).json({ errors : [{ msg : "user already exists" }]});
      }

      //CREATE NEW USER
      user = new User({
        name,
        email,
        password
      });

      //ENCRYPT PASSWORD
      const salt = await bcrypt.genSalt(10);
      
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //RETURN JSWEBTOKEN---------
      const payload = {
        user : {
          id : user.id
        }
      };


      jwt.sign(payload, config.get('jwtSecret'),{expiresIn:3600000},
        (err, token)=>{
          if(err) throw err;
        
          res.json({ token });
        }
      );

      

    }catch(err){
      console.error(err.message);
      res.status(500).send('server error');
    }
    // res.send('users route');

});

module.exports = router;