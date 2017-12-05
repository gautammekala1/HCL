var express = require('express');
var router  = express.Router();
var app = express();
var jwt    = require('jsonwebtoken');
var secret    = require('../secret.json');
var user = {
  id:1,
  username:'mgbdev@gmail.com',
  password:'test@1234'

}
router.post('/login', function(req, res) {

       

      if (user.password != req.body.password ) {
        //console.log(false);
          res.status(401).json({ success: false, message: 'wrong username/password. access denied'});
      } else {
        //console.log(true);
        // if user is found and password is right
        // create a token 
        console.log(secret.superSecret.Secret);
        var token = jwt.sign(user,secret.superSecret.Secret, {
          expiresIn: 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: user.username,
          token: token
        });

      } 

      

    //}


  });

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});
module.exports = router;