const resolvers = require('../resolvers');

describe('GraphQL Resolvers', () => {
  const mockDataStore = {
    getAllItems: jest.fn(),
    getItemById: jest.fn(),
    createItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn()
  };

  const mockContext = {
    dataStore: mockDataStore
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query Resolvers', () => {
    describe('items', () => {
      it('should return all items from dataStore', () => {
        const mockItems = [
          { id: '1', title: 'Test 1', description: 'Desc 1', createdAt: '2024-01-01' },
          { id: '2', title: 'Test 2', description: 'Desc 2', createdAt: '2024-01-02' }
        ];
        mockDataStore.getAllItems.mockReturnValue(mockItems);

        const result = resolvers.Query.items(null, null, mockContext);
        expect(result).toEqual(mockItems);
        expect(mockDataStore.getAllItems).toHaveBeenCalled();
      });
    });

    describe('item', () => {
      it('should return item by id from dataStore', () => {
        const mockItem = { id: '1', title: 'Test', description: 'Desc', createdAt: '2024-01-01' };
        mockDataStore.getItemById.mockReturnValue(mockItem);

        const result = resolvers.Query.item(null, { id: '1' }, mockContext);
        expect(result).toEqual(mockItem);
        expect(mockDataStore.getItemById).toHaveBeenCalledWith('1');
      });

      it('should return null for non-existent item', () => {
        mockDataStore.getItemById.mockReturnValue(null);

        const result = resolvers.Query.item(null, { id: 'non-existent' }, mockContext);
        expect(result).toBeNull();
      });
    });
  });

  describe('Mutation Resolvers', () => {
    describe('createItem', () => {
      it('should create a new item', () => {
        const input = { title: 'Test', description: 'Desc' };
        const mockItem = { id: '1', ...input, createdAt: '2024-01-01' };
        mockDataStore.createItem.mockReturnValue(mockItem);

        const result = resolvers.Mutation.createItem(null, { input }, mockContext);
        expect(result).toEqual(mockItem);
        expect(mockDataStore.createItem).toHaveBeenCalledWith(input);
      });
    });

    describe('updateItem', () => {
      it('should update an existing item', () => {
        const id = '1';
        const input = { title: 'Updated', description: 'Updated Desc' };
        const mockItem = { id, ...input, createdAt: '2024-01-01' };
        mockDataStore.updateItem.mockReturnValue(mockItem);

        const result = resolvers.Mutation.updateItem(null, { id, input }, mockContext);
        expect(result).toEqual(mockItem);
        expect(mockDataStore.updateItem).toHaveBeenCalledWith(id, input);
      });

      it('should return null for non-existent item', () => {
        mockDataStore.updateItem.mockReturnValue(null);

        const result = resolvers.Mutation.updateItem(null, { id: 'non-existent', input: {} }, mockContext);
        expect(result).toBeNull();
      });
    });

    describe('deleteItem', () => {
      it('should delete an item and return true', () => {
        mockDataStore.deleteItem.mockReturnValue(true);

        const result = resolvers.Mutation.deleteItem(null, { id: '1' }, mockContext);
        expect(result).toBe(true);
        expect(mockDataStore.deleteItem).toHaveBeenCalledWith('1');
      });

      it('should return false for non-existent item', () => {
        mockDataStore.deleteItem.mockReturnValue(false);

        const result = resolvers.Mutation.deleteItem(null, { id: 'non-existent' }, mockContext);
        expect(result).toBe(false);
      });
    });
  });
}); 