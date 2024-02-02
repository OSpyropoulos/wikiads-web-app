function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

const username = getQueryParam('username');
const sessionId = getQueryParam('sessionId');

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








