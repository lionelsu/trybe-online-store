class LocalStorageManager {
  static instance = null;

  static getInstance() {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}

const localStorageManager = LocalStorageManager.getInstance();

export default localStorageManager;
