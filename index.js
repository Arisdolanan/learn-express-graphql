const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT_APP || 3000;
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const connectMongoDB = require("./models/mongo");
const schema = require("./graphql/schema");

connectMongoDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

const loginRouter = require("./routes/login_route");
const usersRouter = require("./routes/mst_users_route");
const roleRouter = require("./routes/mst_role_route");
const categoriesRouter = require("./routes/categories_route");
const productsRouter = require("./routes/products_route");
const ordersRouter = require("./routes/orders_route");
const { graphqlHTTP } = require("express-graphql");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/v1/auth", loginRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);

// graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  })
);

app.get("/", function (req, res) {
  res.send("respond with a resource");
});
