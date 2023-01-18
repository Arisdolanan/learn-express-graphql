// mongoose models
const User = require("../models/mongo/user");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
// other type

// root query object
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    // other field
  },
});

// mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add
    addUser: {
      type: UserType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        phone: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(root, params) {
        const user = new User({
          name: params.name,
          email: params.email,
          phone: params.phone,
        });
        return user.save();
      },
    },
    // update
    updateUser: {
      type: UserType,
      args: {
        id: {
          name: "id",
          type: new GraphQLNonNull(GraphQLString),
        },
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        phone: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(root, params) {
        return User.findByIdAndUpdate(
          params.id,
          {
            name: params.name,
            email: params.email,
            phone: params.phone,
          },
          function (err) {
            if (err) return next(err);
          }
        );
      },
    },
    // delete
    deleteUser: {
      type: UserType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(root, params) {
        const resUser = User.findByIdAndRemove(params.id).exec();
        if (!resUser) {
          throw new Error("Error");
        }
        return resUser;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
