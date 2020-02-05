const setLocalStorage = ( itemName, item ) => {
    if (!localStorage.getItem(itemName)) {
        localStorage.setItem(itemName, item);
    }
}

const getLocalStorage = (itemName) => {
    if (localStorage.getItem(itemName)) {
        return localStorage.getItem(itemName);
    }
    return false
}

module.exports = {
    setLocalStorage,
    getLocalStorage
}