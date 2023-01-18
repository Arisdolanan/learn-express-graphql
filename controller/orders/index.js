const models = require("../../models/orm");
const model_mst_users = require("../../models/orm").mst_users;
const model_orders = require("../../models/orm").orders;
const model_products = require("../../models/orm").products;

const getAllOrdersDetail = async (req, res) => {
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
  await models.orders_detail
    .findAndCountAll({
      limit: size,
      offset: page * size,
      include: [
        {
          model: model_orders,
          as: "v_orders",
        },
        {
          model: model_products,
          as: "v_products",
          include: [
            {
              model: model_mst_users,
              as: "v_mst_users",
            },
          ],
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

const createOrdersDetail = async (req, res) => {
  const data = req.body;
  await models.orders_detail
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

const getAllOrders = async (req, res) => {
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
  await models.orders
    .findAndCountAll({
      limit: size,
      offset: page * size,
      include: [
        {
          model: model_mst_users,
          as: "v_mst_users",
          attributes: {
            exclude: ["password"],
          },
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

const createOrders = async (req, res) => {
  const data = req.body;
  await models.orders
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

const updateOrders = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await models.orders
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

const deleteOrders = async (req, res) => {
  await models.orders
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
  getAllOrders,
  createOrders,
  updateOrders,
  deleteOrders,
  getAllOrdersDetail,
  createOrdersDetail,
};
