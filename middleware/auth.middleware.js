const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  // The client sends its saved JWT in the Authorization header.
  const token = req.headers.authorization;

  if(!token){
    return res.send({msg: "Please login first"});
  }

  try {
    // Verify the token, then make the trusted user ID available to the route.
    const decoded = jwt.verify(token, "coding");
    if(decoded){
      // GET and DELETE requests may not include a request body.
      req.body = req.body || {};
      req.userId = decoded.userID;
      req.body.userID = decoded.userID;
      return next();
    }
  } catch (error) {
    return res.send({msg: "Please login first"});
  }
}

module.exports = { auth };
