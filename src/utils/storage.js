const STORAGE_KEYS = {
  USER: 'smart_explorer_user',
  FAVORITES: 'smart_explorer_favorites',
  SETTINGS: 'smart_explorer_settings',
  NOTIFICATIONS: 'smart_explorer_notifications'
};

export const storage = {
  setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)),
  removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),

  getFavorites: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [],
  toggleFavorite: (item) => {
    const favorites = storage.getFavorites();
    const index = favorites.findIndex(f => f.id === item.id);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(item);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return favorites;
  },
  isFavorite: (id) => {
    const favorites = storage.getFavorites();
    return favorites.some(f => f.id === id);
  },

  getSettings: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || { darkMode: false, notificationsEnabled: true },
  setSettings: (settings) => localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)),

  getNotifications: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || [],
  addNotification: (notification) => {
    const notifications = storage.getNotifications();
    notifications.unshift({ ...notification, id: Date.now(), timestamp: new Date() });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications.slice(0, 20)));
  }
};
