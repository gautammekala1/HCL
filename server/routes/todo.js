var express = require('express');
var router  = express.Router();
var toDoController = require('../controllers/toDoController');
router.post('/all',toDoController.getToDoDetails);
router.post('/create',toDoController.createToDoDetails);
router.delete('/delete',toDoController.deleteToDoDetails);
router.put('/update',toDoController.updateToDoDetails);

//updateToDoDetails
// /delete

module.exports = router;