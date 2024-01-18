
// Function to get URL query parameter by name
function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}


//console.log('getUserByUsername:', window.getUserByUsername);


const username = getQueryParam('username');
const sessionId = getQueryParam('sessionId');

console.log('Username:', username);
console.log('Session ID:', sessionId);

//const user = getUserByUsername(username);
//create user
//createUser(username, sessionId);


function fetchUserCartItems(username, sessionId) {
    fetch(`/get_cart_items?username=${username}&sessionId=${sessionId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cartItems => {
            console.log('Cart items:', cartItems);
        
            const cartItemsHtml = templates.cartItems(cartItems);
            console.log('cartItemsHtml:', cartItemsHtml);
            document.getElementById("cartItems").innerHTML = cartItemsHtml;
        })
        
        .catch(error => {
            console.error('Error fetching cart items:', error);
            // Handle the error appropriately in the UI
        });
}



// Example usage
fetchUserCartItems(username, sessionId);








