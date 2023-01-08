const basicAuth = require('basic-auth');

module.exports = (req, res, next) => {

  const user = basicAuth(req);

  if (!user || user.name !== 'Admin' || user.pass !== 'P@ssw0rd') {
    res.set('WWW-Authenticate', 'Basic realm=Authorization required');
    res.sendStatus(401);
    return;
  }
  next();
};