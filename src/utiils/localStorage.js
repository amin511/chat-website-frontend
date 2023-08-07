
const addUsertoLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const getUserFromLocalStorage = () => {
    const res = localStorage.getItem('user');
    const user = res ? JSON.parse(res) : null;
    return user;
}

const removeUserFromLocalStorage = (user) => {
    localStorage.removeItem("user");
}

export { getUserFromLocalStorage, removeUserFromLocalStorage, addUsertoLocalStorage }