const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const categoryId = urlParams.get('categoryId');


const isCategoryPage = document.title === 'CATEGORIES';

function fetchData(url, parseFunction, renderFunction, isCategoryPage) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fetchedData = parseFunction(data, isCategoryPage);
            console.log(fetchedData)
            renderFunction(fetchedData);
        })
        .catch(error => {
            console.error(`Error fetching data from ${url}:`, error);
        });
}

function parseAds(data, isCategoryPage) {
    return {
        ads: data.map(ad => ({
            id: ad.id,
            title: ad.title,
            subcategory_id: ad.subcategory_id,
            description: ad.description,
            cost: ad.cost,
            img_url: isCategoryPage
                ? (ad.images && ad.images.length > 0 ? ad.images[0] : '')
                : ad.images, // Use the images array
        }))
    };
}


function renderAdsCat(data) {
    console.log('data:', data);
    const adsList = document.getElementById("ads_list");
    adsList.innerHTML = templates.list_cat(data);
}
function renderAdsSubcat(data) {
    const adsList = document.getElementById("ads_list");
    adsList.innerHTML = templates.list_subcat(data);
}

function listAds(url, render, isCategoryPage) {
    fetchData(url, parseAds, render, isCategoryPage);
}

const url = isCategoryPage
    ? `https://wiki-ads.onrender.com/ads?category=${categoryId}`
    : `https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`;


listAds(url, isCategoryPage ? renderAdsCat : renderAdsSubcat, isCategoryPage);


// Login Service - LS
var logged_in;
var data_logged;
var usernameValue;
var cart_size;

window.addEventListener('load', (event) => {
    console.log(`MPIKAME STO window.addEventListener('load'`);
    
    if (!logged_in) {
        console.log(`MPIKAME 1o if`);
        outer = document.getElementById("cart");
        outer.innerHTML = templates.Gocart(data_logged);
    }

    const loginForm = document.getElementById("login");
    if (loginForm) {
        console.log(`MPIKAME 2o if`);
        loginForm.addEventListener('submit', handleLogin);
    }

    const signUpButton = document.getElementById("signupButton");
    if (signUpButton) {
        console.log(`MPIKAME 3o if`);
        signUpButton.addEventListener('click', navigateToSignUp);
    }

    function handleLogin(e) {
        console.log(`MPIKAME STO handleLogin`);
        e.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (username===usernameValue) {
            alert('You are already logged in.');
            // Clear input fields
            usernameInput.value = '';
            passwordInput.value = '';
            return;
        }

        console.log(username)

        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(`MPIKAME STO deutero .then`);
                console.log(data);
            
                // Check if 'status' property exists in data
                if (data.status === 'SUCCESS') {
                    logged_in = data; 

                    data_logged = parseCreds(data);
                    outer = document.getElementById("logged_user");
                    outer.innerHTML = templates.logged_in(data_logged);

                    usernameValue = username;
                    console.log(usernameValue);

                    outer = document.getElementById("cart");
                    outer.innerHTML = templates.Gocart(data_logged);
            
                    alert("Welcome" + "\n" + username);
            
                    // Clear input fields
                    usernameInput.value = '';
                    passwordInput.value = '';

                    fetch('/cart_size', {
                        method: 'POST',
                        body: JSON.stringify({ username, password }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(size => {
                            outer = document.getElementById("cart_size");
                            outer.innerHTML = templates.cart_size(size);
                        });
                } else {
                    // Handle the case where the status is not 'SUCCESS'
                    alert("Login failed. " + data.message);
                }
            })            
            .catch(error => {
                console.log("error on login", error);
                alert("Please signup");
            });
    }

    function parseCreds(data) {
        var creds = {};
        var creds_arr = [];
        if (data.sessionId === undefined) { return; }
        var tmp = {};
        tmp.sessionId = data.sessionId;
        tmp.username = data.username;
        creds_arr.push(tmp);
        creds['creds'] = creds_arr;
        return creds;
    }

    function navigateToSignUp() {
        window.location.href = "signup.html";
    }
});

// Function to handle "Add to cart" button click
function addToCart(adId) {
    // Check if user is logged in
    if (!logged_in || logged_in.status !== 'SUCCESS') {
        alert('Please log in before adding to cart!');
        return;
    }

    // Use getUserByUsername to get the user object
    //const user = getUserByUsername(username);
    console.log("adId: ",adId)
    console.log("logged_in: ",logged_in)

    // Fetch additional information for the specified adId
    fetchAdDetails(adId)
        .then(adDetails => {
            console.log("adDetails: ",adDetails)

            const dataToAdd = {
                username: logged_in.username,
                sessionId: logged_in.sessionId,
                id: adDetails.id,
                title: adDetails.title,
                description: adDetails.description,
                cost: adDetails.cost,
                imageUrl: adDetails.imageUrl
            };

            console.log("dataToAdd: ",dataToAdd)

            // Make a POST request to the server endpoint /add_to_cart
            fetch('/add_to_cart', {
                method: 'POST',
                body: JSON.stringify(dataToAdd),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'SUCCESS') {

                        fetch('/cart_size', {
                            method: 'POST',
                            body: JSON.stringify({ username: logged_in.username }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => res.json())
                            .then(size => {
                                outer = document.getElementById("cart_size");
                                outer.innerHTML = templates.cart_size(size);
                            });

                        alert('Advertisement added to favorites successfully.');
                    } else {
                        alert(`Failed to add advertisement: ${data.message}`);
                    }
                })
                .catch(error => {
                    console.error('Error adding to favorites:', error);
                    alert('An error occurred while adding to favorites.');
                });
        })
        .catch(error => {
            console.error('Error fetching ad details:', error);
        });
}

function fetchAdDetails(adId) {
    const url = isCategoryPage
    ? `https://wiki-ads.onrender.com/ads?category=${categoryId}`
    : `https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`;
    return fetch(url)
        .then(response => response.json())
        .then(advertisements => {
            const adDetails = advertisements[adId]
            return adDetails;
        });
}




function goToCart(){
    if(!logged_in){
        alert("Please login so you can access your cart.");
        return;
    }
    window.location.href = '/favourite-ads.html';

}






// Favorite Ads Service - FAS
