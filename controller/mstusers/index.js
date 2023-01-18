const models = require("../../models/orm");
const bcrypt = require("bcrypt");
const model_role = require("../../models/orm").mst_role;

const getAllMstUsers = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }
  await models.mst_users
    .findAndCountAll({
      limit: size,
      offset: page * size,
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: model_role,
          as: "v_role",
        },
      ],
    })
    .then((data) => {
      res.status(200).send({
        status: 200,
        data: data.rows,
        totalPages: Math.ceil(data.count / size),
        message: `Successfully retrieved`,
      });
    });
};

const getAllMstUsersId = async (req, res) => {
  await models.mst_users
    .findAll({
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: model_role,
          as: "v_role",
        },
      ],
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      res.send({
        status: true,
        message: "get all data by id",
        data: data,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "error, " + err.message,
      });
    });
};

const createMstUser = async (req, res) => {
  const body = req.body;
  await models.mst_users
    .findOne({
      where: {
        email: body.email,
      },
    })
    .then(async (data) => {
      if (data) {
        res.send({
          status: false,
          message: "Email Already Existed",
        });
      }
      if (!data) {
        body.password = bcrypt.hashSync(req.body.password, 10);
        body.last_login = new Date();
        await models.mst_users
          .create(body)
          .then((result) => {
            res.send({
              status: true,
              message: "Created Successfully",
              data: result,
            });
          })
          .catch((err) => {
            res.send({
              status: false,
              message: "error, " + err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "error, " + err.message,
      });
    });
};

const updateMstUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (req.body.password) {
    data.password = bcrypt.hashSync(req.body.password, 10);
  }
  await models.mst_users
    .update(data, {
      where: {
        id: id,
      },
    })
    .then((rowUpdate) => {
      if (rowUpdate > 0) {
        res.send({
          status: true,
          message: "update success",
        });
      } else {
        res.send({
          status: false,
          message: "update failed",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: false,
        message: `Err ${err.message}`,
      });
    });
};

const deleteMstUser = async (req, res) => {
  const id = req.params.id;
  await models.mst_users
    .destroy({
      where: {
        id: id,
      },
    })
    .then(async (result) => {
      if (!result) {
        res.send({
          status: false,
          message: "Delete Failed",
        });
      } else {
        await res.send({
          status: true,
          message: "Delete Success",
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        message: err.message,
      });
    });
};

module.exports = {
  getAllMstUsers,
  getAllMstUsersId,
  createMstUser,
  updateMstUser,
  deleteMstUser,
};
