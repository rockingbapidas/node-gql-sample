const resolvers = {
  Query: {
    items: (_, __, { dataStore }) => dataStore.getAllItems(),
    item: (_, { id }, { dataStore }) => dataStore.getItemById(id)
  },

  Mutation: {
    createItem: (_, { input }, { dataStore }) => dataStore.createItem(input),
    updateItem: (_, { id, input }, { dataStore }) => dataStore.updateItem(id, input),
    deleteItem: (_, { id }, { dataStore }) => dataStore.deleteItem(id)
  }
};

module.exports = resolvers; 