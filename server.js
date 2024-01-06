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

const userDao = require('./userDao');

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
