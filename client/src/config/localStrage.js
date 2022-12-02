const setLocalData = (item, data) => {
  removeLocalData(item); //초기화
  return window.localStorage.setItem(item, data);
}

const getLocalData = (item) => {
  return window.localStorage.getItem(item);
}

const removeLocalData = (item) => {
  return window.localStorage.removeItem(item);
}

//전부삭제
const clearLocalData = () => {
  return window.localStorage.clear();
}

export { setLocalData, getLocalData, removeLocalData, clearLocalData };

