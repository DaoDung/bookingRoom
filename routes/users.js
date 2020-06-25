
var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var path = require('path');
const userConntroller = require('../controllers/user')

router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook'), 
//     function(req, res){
//       res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
//     }
// );
router.post('/signup', userConntroller.user_signup);

router.post('/signin', userConntroller.user_signin);
router.get('/login',passport.authenticate(['jwt','facebook']),function (req, res) {
  if (req.user){
      //you're authenticated! return sensitive secret information here.
      res.send(200, {'secrets':['array','of','top','secret','information']});
  } else {
      // not authenticated. go away.
      res.send(401)
  }

});


module.exports = router;
