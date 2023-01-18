const models = require("../../models/orm");

const getAllMstRoleUser = async (req, res) => {
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
  await models.mst_role
    .findAndCountAll({
      limit: size,
      offset: page * size,
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

const createMstRoleUser = async (req, res) => {
  const data = req.body;
  await models.mst_role
    .create(data)
    .then((result) => {
      res.send({
        status: true,
        message: "created",
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "error, " + err.message,
      });
    });
};

const updateMstRoleUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await models.mst_role
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

const deleteMstRoleUser = async (req, res) => {
  await models.mst_role
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      res.send({ status: result });
    });
};

module.exports = {
  getAllMstRoleUser,
  createMstRoleUser,
  updateMstRoleUser,
  deleteMstRoleUser,
};
