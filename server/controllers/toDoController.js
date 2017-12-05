var jwt    = require('jsonwebtoken');
//var User = require('../models/index').User;
var ToDo = require('../models/index').ToDo;
var secret    = require('../secret.json');
module.exports = {

    getToDoDetails(req,res) {
         
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
              // verifies secret and checks exp
          jwt.verify(token,secret.superSecret.Secret, function(err, decoded) {  
              if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
              } else {
                  // if everything is good, save to request for use in other routes
                 // req.decoded = decoded;    
                ToDo.findAll().then(toDo => {
                  	//console.log(toDo);
                    return  res.status(200).json(toDo);
                });

              }
          });

      } else {

        return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
        });

      }

    },


    createToDoDetails(req,res) {

      var token = req.body.token || req.body.body.token || req.query.token || req.headers['x-access-token'];
          jwt.verify(token,secret.superSecret.Secret, function(err, decoded) {

            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
             //console.log(req.body.todo);
              ToDo.create(req.body.todo).then(task => {
                return res.status(200).send({ 
                    success: true, 
                    message: 'Record added.' 
                });
              }).catch(err => {
                  console.log(err);
                  return res.status(403).send({ 
                      success: false, 
                      message: ' Error.' 
                  });
              })
            }

        });
    },

    deleteToDoDetails(req,res) {
      
      var token = req.query.token;

      jwt.verify(token,secret.superSecret.Secret, function(err, decoded) {
          
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {

              ToDo.destroy({
                 where: {
                    id: req.query.key //this will be your id that you want to delete
                 }
              }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
            
                   console.log('Deleted successfully');
             
              }, function(err){
                  console.log(err); 
              });
              return res.status(200).send({ 
                  success: true, 
                  message: ' Sucess.' 
              });
          }
      });

    },

    updateToDoDetails(req,res) {

      var token = req.body.token || req.body.body.token || req.query.token || req.headers['x-access-token'];
      jwt.verify(token,secret.superSecret.Secret, function(err, decoded) {

        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {

          ToDo.update(req.body.todo,{ where: { id: req.body.todo.id } }).then(task => {
            return res.status(200).send({ 
                success: true, 
                message: 'Record added.' 
            });
          }).catch(err => {

            return res.status(403).send({ 
              success: false, 
              message: ' Error.' 
              });
          })
      }
    });

    }
}

