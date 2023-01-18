const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateJWT(user, exp) {
  try {
    return jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
      expiresIn: exp,
      algorithm: "HS256",
    });
  } catch (e) {
    console.log("ERR", e);
  }
}

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    let token = authToken.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        res.status(200).send({
          status: false,
          message: "auth token failed, " + err.message,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res
      .status(200)
      .send({ status: false, message: "auth token failed, token not found" });
  }
}

module.exports = {
  generateJWT,
  verifyToken,
};
