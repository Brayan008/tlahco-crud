const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Necesitas iniciar sesión');
  res.redirect('../');
};

module.exports = helpers;