const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // authorization value is similar to this "Bearer dfa545jkhjnas.542asfd54sadf353.53453gsgdg9i3". We need to split it
  const token = authorization.split(" ")[1];

  try {
    //jwt verification get id from token
    const { _id } = jwt.verify(token, process.env.SECRET);
    //find user from DB
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
