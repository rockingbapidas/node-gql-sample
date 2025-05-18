const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const DataStore = require('./data/store');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    dataStore: new DataStore()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); 