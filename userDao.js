const users = []; // Here, users will be stored

// Class to define user data
class User {
    constructor(username, sessionId) {
        this.username = username;
        this.password = null;
        this.sessionId = sessionId; // Initialize sessionId to null
        this.cart = {
            cartItems: [],
            totalCost: 0,
            size:0
        };
    }

    // Function to set sessionId
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
}





function getUserByUsername(username) {
    return users.find(user => user.username === username);
}


function getCartItemsByUsernameAndSessionId(username, sessionId) {
    const user = getUserByUsername(username);

    if (user && user.sessionId === sessionId) {
        // Session ID matches, return cart items
        return user.cart.cartItems;
    } else {
        // User not found or session ID mismatch
        return null; // or handle this case as needed
    }
}




// Creates a new user
function createUser(username, sessionId) {
    const newUser = new User(username, sessionId);
    users.push(newUser);
    return newUser;
}


function printUsers() {
    console.log('List of Users:');
    users.forEach(user => {
        console.log(`Username: ${user.username}, Password: ${user.sessionId}`);
    });
}





//  making functions global
window.getUserByUsername = getUserByUsername;
window.createUser = createUser;
window.printUsers = printUsers;



