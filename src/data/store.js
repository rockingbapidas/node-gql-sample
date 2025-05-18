class DataStore {
  constructor() {
    this.items = [];
  }

  getAllItems() {
    return this.items;
  }

  getItemById(id) {
    return this.items.find(item => item.id === id) || null;
  }

  createItem(item) {
    const newItem = {
      id: Date.now().toString(),
      ...item,
      createdAt: new Date().toISOString()
    };
    this.items.push(newItem);
    return newItem;
  }

  updateItem(id, updates) {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this.items[index] = {
      ...this.items[index],
      ...updates
    };
    return this.items[index];
  }

  deleteItem(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.items.splice(index, 1);
    return true;
  }
}

module.exports = DataStore; 