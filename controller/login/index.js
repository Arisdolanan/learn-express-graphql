const models = require("../../models/orm");
const middleware = require("../../middleware/jwt_auth");
const model_role = require("../../models/orm").mst_role;
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  await models.mst_users
    .findOne({
      where: {
        email: req.body.email,
      },
      include: [
        {
          model: model_role,
          as: "v_role",
        },
      ],
    })
    .then((data) => {
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        data.password = null;
        if (result) {
          const token = middleware.generateJWT(data.user_id, "1h");
          res.send({
            status: true,
            message: "Login Successfully",
            data: data,
            token: token,
          });
        } else {
          res.send({
            status: false,
            message: "Login Failed, Invalid Password",
            data: null,
            token: null,
          });
        }
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "Login Failed, Email Not Found " + err.message,
        data: null,
        token: null,
      });
    });
};

module.exports = {
  Login,
};
