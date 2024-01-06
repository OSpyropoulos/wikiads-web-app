const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const categoryId = urlParams.get('categoryId');

console.log(categoryId)

function fetchData(url, parseFunction, renderFunction) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fetchedData = parseFunction(data);
            renderFunction(fetchedData);
        })
        .catch(error => {
            console.error(`Error fetching data from ${url}:`, error);
        });
}

function listAds() {
    const url = `https://wiki-ads.onrender.com/ads?category=${categoryId}`;
    fetchData(url, parseAds, renderAds);
}

function renderAds(data) {
    const adsList = document.getElementById("ads_list");
    adsList.innerHTML = templates.list(data);
}

listAds();

function parseAds(data) {
    return {
        ads: data.map(ad => ({
            id: ad.id,
            title: ad.title,
            subcategory_id: ad.subcategory_id,
            description: ad.description,
            cost: ad.cost,
            img_url: ad.images && ad.images.length > 0 ? ad.images[0] : '' // Use the first image if available
        }))
    };
}

// Login Service - LS
var logged_in;
var data_logged;

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
                    logged_in = true; // Set the logged_in status to true or handle accordingly
            
                    data_logged = parseCreds(data);
                    outer = document.getElementById("logged_user");
                    outer.innerHTML = templates.logged_in(data_logged);
            
                    outer = document.getElementById("cart");
                    outer.innerHTML = templates.Gocart(data_logged);
            
                    alert("Welcome" + "\n" + username);
            
                    fetch('/cart_size', {
                        method: 'POST',
                        body: JSON.stringify({ username, password }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                        .then(size => {
                            cart_size_logged_in = size;
                            outer = document.getElementById("cart_size");
                            outer.innerHTML = templates.cart_size(size);
                        });
                } else {
                    // Handle the case where the status is not 'SUCCESS'
                    alert("Login failed. " + data.message);
                }
            })            
            .catch(error => {
                console.log(`ERROR STO category.js`);
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

