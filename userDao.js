const users = []; // Here, users will be stored

// Class to define user data
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

// Returns a user based on the username
function getUserByUsername(username) {
    return users.find(user => user.username === username);
}

// Creates a new user
function createUser(username, password) {
    const newUser = new User(username, password);
    users.push(newUser);
    return newUser;
}

function printUsers() {
    console.log('List of Users:');
    users.forEach(user => {
        console.log(`Username: ${user.username}, Password: ${user.password}`);
    });
}

module.exports = {
    getUserByUsername,
    createUser,
    printUsers    // Add this line to export the printUsers function
};