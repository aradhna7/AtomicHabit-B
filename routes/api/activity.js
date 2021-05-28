const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Activity = require('../../models/Activity');

// @route   GET api/activity
// @desc    TEST ROUTE
// @access  PUBLIC
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}
  

router.get('/getOneActivity', async(req, res) => {
    try{

      const activites=await Activity.find({});
      r = Math.floor(1000 + Math.random() * 9000);
      n=activites.length;
      console.log(n);
      i = randomInt(0, n);
      console.log(n, i);
      res.send(activites[i])
  
    }catch(err){
      console.log(err.message);
      res.status(500).send('server error');
    }
});


router.post('/addActivity', [
    check('title','title is required').not().isEmpty(),
    check('desc','desc is required').not().isEmpty()
  ] , async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const {title , desc} = req.body;
    try{

      //CREATE NEW ACTIVITY
      activity = new Activity({
        title,
        desc
      });

      await activity.save();
      res.send("Activity created")

    }catch(err){
      console.error(err.message);
      res.status(500).send('server error');
    }

});


module.exports = router;