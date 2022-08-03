export const getData = (key) => {
  if (key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  }
};

export const saveData = (key, value) => {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeData = (key) => {
    if(key) {
        localStorage.removeItem(key)
    }
}
