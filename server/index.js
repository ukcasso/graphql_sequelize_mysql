const express = require('express');
const app = express();
const PORT = 3030;
const path = '/graphql';
const { ApolloServer, gql } = require('apollo-server-express');
const { User } = require('./models/index');

User.sequelize.sync().then(() => {
  console.log("sequelize success")
}).catch(err => {
  console.log("sequelize fail", err)
})

const typeDefs = gql`

  type User {
    id: Int
    firstName: String
    lastName: String
    password: String
  }

  type Query {
    getUserData: [User!]!
    getAllUser(id: Int!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, password: String!): User
    updateUser(id: Int!, firstName: String!, lastName: String!, password: String!): User
    deleteUser(id: Int!, firstName: String!, lastName: String!, password: String!): User
  }
`;

const resolvers = {
  Query:  {
    getUserData: async () => {
      const getUsers = await User.findAll();
      return getUsers;
    },
    getAllUser: async (_, args) => {
      await context.User.findOne()
      console.log(args)
      const { id } = args;
      const resultData = await User.findOne( {where: { id: id } });
      return resultData;
    }
  },
  Mutation: {
    createUser: async (_, { firstName, lastName, password }) => {
      const newUser = await User.create({ 
        firstName,
        lastName,
        password
      });
      
      const user = await User.findOne( { where: { id: id } });
      return user;
    },
    updateUser: async (_, { id, firstName, lastName, password }) => {
      console.log(id)
      const oldUser = await User.update({firstName, lastName, password},{where: { id: id } });
      const user = await User.findOne( { where: { id: id } });
      return user;
    },
    deleteUser: async (_, { id }) => {
      console.log(id)
      const oldUser = await User.destroy({where: { id: id } });
      const user = await User.findOne( { where: { id: id } });
      return user;
    },
  }
};

// 쿼리 날리는 방법 예
// mutation{
//   createUser(firstName: "gdsg2", lastName: "2", password: "2"){
//     firstName
//     lastName
//     password
//   }
// }


const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path });

// The `listen` method launches a web server.
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
)
