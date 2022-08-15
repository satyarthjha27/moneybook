require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = {
  async authorise(req, res, next) {
    const apiKey = req.headers['api-key']
    if (process.env.API_KEY === apiKey) return next();
    return res.status(400).json({ msg:('unauthorizedAPIRequest') });
  },

  async verifyToken(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      let token, decodedToken;
      if (authorizationHeader) {
        token = authorizationHeader.split(" ")[1];
      }
      if (token) {
        try {
          decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
          req.userId = decodedToken.id;
          next();
        } catch (err) {
          console.log(err);
          return res.status(400).json({ msg:('tokenExpired') });
        }
      } else {
        res.status(400).json({ msg:('tokenNotFound') });
      }
    } catch (err) {
      res.status(400).json({ msg: ('accountInvalidate') });
    }
  }

};
