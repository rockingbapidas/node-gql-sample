const DataStore = require('../store');

describe('DataStore', () => {
  let store;

  beforeEach(() => {
    store = new DataStore();
  });

  describe('getAllItems', () => {
    it('should return empty array when no items exist', () => {
      expect(store.getAllItems()).toEqual([]);
    });

    it('should return all items', () => {
      const item1 = store.createItem({ title: 'Test 1', description: 'Desc 1' });
      const item2 = store.createItem({ title: 'Test 2', description: 'Desc 2' });
      
      const items = store.getAllItems();
      expect(items).toHaveLength(2);
      expect(items).toContainEqual(item1);
      expect(items).toContainEqual(item2);
    });
  });

  describe('getItemById', () => {
    it('should return null for non-existent item', () => {
      expect(store.getItemById('non-existent')).toBeNull();
    });

    it('should return the correct item', () => {
      const item = store.createItem({ title: 'Test', description: 'Desc' });
      expect(store.getItemById(item.id)).toEqual(item);
    });
  });

  describe('createItem', () => {
    it('should create an item with correct properties', () => {
      const input = { title: 'Test', description: 'Desc' };
      const item = store.createItem(input);

      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('createdAt');
      expect(item.title).toBe(input.title);
      expect(item.description).toBe(input.description);
    });

    it('should add the item to the store', () => {
      const item = store.createItem({ title: 'Test', description: 'Desc' });
      expect(store.getAllItems()).toContainEqual(item);
    });
  });

  describe('updateItem', () => {
    it('should return null for non-existent item', () => {
      expect(store.updateItem('non-existent', { title: 'New' })).toBeNull();
    });

    it('should update the item properties', () => {
      const item = store.createItem({ title: 'Test', description: 'Desc' });
      const updates = { title: 'New Title', description: 'New Desc' };
      
      const updatedItem = store.updateItem(item.id, updates);
      expect(updatedItem.title).toBe(updates.title);
      expect(updatedItem.description).toBe(updates.description);
      expect(updatedItem.id).toBe(item.id);
      expect(updatedItem.createdAt).toBe(item.createdAt);
    });
  });

  describe('deleteItem', () => {
    it('should return false for non-existent item', () => {
      expect(store.deleteItem('non-existent')).toBe(false);
    });

    it('should remove the item from the store', () => {
      const item = store.createItem({ title: 'Test', description: 'Desc' });
      expect(store.deleteItem(item.id)).toBe(true);
      expect(store.getAllItems()).not.toContainEqual(item);
    });
  });
}); 