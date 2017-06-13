

export function save(key, item) {
  const itemSerialized = JSON.stringify(item);
  window.localStorage.setItem(key, itemSerialized);
}

export function retrieve(key) {
  const itemSerialized = window.localStorage.getItem(key);
  return JSON.parse(itemSerialized);
}

export function remove(key) {
  window.localStorage.removeItem(key);
}
