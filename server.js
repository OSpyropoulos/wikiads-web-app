// Require Statements
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const uuid = require('uuid');

// Express Setup
const express = require('express');
const app = express();
const port = 8081;
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


// Route for Home ('/')
app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('index.html', options)
})

// Login Service (LS)
const userDao = require('./models/userDao');

app.post('/login', (req, res) => {
    userDao.printUsers();
    const { password, username } = req.body;
    console.log(`LOGIN MEROS 1`);
    if (username === "" || password === "") {
        console.log(`LOGIN MEROS 2`);
        res.json({
            status: "FAIL",
            message: "Empty input field."
        });
    } else {
        const user = userDao.getUserByUsername(username);
        console.log(user);
        console.log(`LOGIN MEROS 3`);
        if (user && user.password === password) {
            console.log(`LOGIN MEROS 4`);
            const sessionId = uuid.v4();
            user.setSessionId(sessionId);
    

            res.json({
                status: "SUCCESS",
                sessionId,
                username
            });
        } else {
            console.log(`LOGIN MEROS 5`);
            res.status(401).json({
                status: "FAIL",
                message: "Invalid username or password.",
                details: {
                    username: username,
                    password: password
                }
            });
        }
    }
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    console.log(`SIGNUP MEROS 1`);

    if (!username || !password) {
        console.log(`SIGNUP MEROS 2`);
        res.json({
            status: "FAIL",
            message: "Empty input field."
        });
    } else {
        console.log(`SIGNUP MEROS 3`);
        const existingUser = userDao.getUserByUsername(username);

        if (existingUser) {
            console.log(`SIGNUP MEROS 4`);
            res.json({
                status: "FAIL",
                message: "Username already exists."
            });
        } else {
            console.log(`SIGNUP MEROS 5`);
            userDao.createUser(username, password);
            userDao.printUsers();

            res.json({
                status: "SUCCESS",
                message: "Signup successful."
            });
        }
    }
});

// Add to Favorites Service (AFS)
app.post('/add_to_cart', (req, res) => {
    const { username, sessionId, id, title, description, cost, imageUrl } = req.body;
    const user = userDao.getUserByUsername(username);

    if (user && user.sessionId === sessionId) {
        const adExists = user.cart.cartItems.some(ad => ad.id === id);

        if (!adExists) {
            // Add the advertisement to the cart
            user.cart.cartItems.push({
                id,
                title,
                description,
                cost,
                imageUrl
            });

            // Update totalCost & size
            user.cart.totalCost += cost;
            user.cart.size += 1;

            console.log(user)
            console.log(user.cart)

            res.json({
                status: 'SUCCESS',
                message: 'Advertisement added to cart successfully.'
            });
        } else {
            res.status(400).json({
                status: 'FAIL',
                message: 'Advertisement is already in the cart.'
            });
        }
    } else {
        res.status(401).json({
            status: 'FAIL',
            message: 'Unauthorized access. Please sign in.'
        });
    }
});

// Get cart size of user cart
app.post('/cart_size', (req, res) => {
    const { username } = req.body;
    const user = userDao.getUserByUsername(username);

    if (user) {
        res.status(200).json({
            size: user.cart.size
        });
    } else {
        // Handle the case where the user is not found
        res.status(404).json({
            error: 'User not found'
        });
    }
});



// MHTSOU
app.patch('/remove_from_cart',(req,res)=>{
    let{username} = req.body;
    user.findOneAndUpdate({username:username},req.body,{new:true},
        (err,doc)=>{
            if(err) return res.status(500).send(err);
            res.status(200).send(doc);
        });
})

app.post('/user/cart',(req,res)=>{
    let{username,id}=req.body;
    //console.log(req.body);
    user.find({username}).then(data=>{
        res.type('application/json');
        res.status(200).send(data[0]);
    }).catch(err =>{
        console.log(err);
    })
})



app.get('/get_cart_items', (req, res) => {
    const { username, sessionId } = req.query;

    const user = userDao.getUserByUsername(username);

    if (user && user.sessionId === sessionId) {
        // User is authenticated, return their cart items
        res.json(user.cart.cartItems);
    } else {
        // User not authenticated or not found
        res.status(401).json({
            status: 'FAIL',
            message: 'Unauthorized access or user not found.'
        });
    }
});
