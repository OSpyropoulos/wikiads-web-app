function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

<<<<<<< Updated upstream
const username = getQueryParam('username');
const sessionId = getQueryParam('sessionId');

=======


const username = getQueryParam('username');
const sessionId = getQueryParam('sessionId');

console.log('Username:', username);
console.log('Session ID:', sessionId);

// const user = getUserByUsername(username);
// //create user
// createUser(username, sessionId);


>>>>>>> Stashed changes
function fetchUserCartItems(username, sessionId) {
    fetch(`/get_cart_items?username=${username}&sessionId=${sessionId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cartItems => {
            const cartItemsHtml = templates.cartItems(cartItems);
            document.getElementById('cartItems').innerHTML = cartItemsHtml;
        })
        
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
}

fetchUserCartItems(username, sessionId);








