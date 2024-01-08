window.addEventListener('load', (event) => {

    signupform = document.getElementById("signup-form");
    signupform.addEventListener('submit', function(event){
        event.preventDefault(); // Prevent the form from submitting
    
        // Perform form data validation
        var fullname = document.getElementById('fullname').value;
        var email = document.getElementById('email').value;
        var telephone = document.getElementById('telephone').value;
        var address = document.getElementById('address').value;
        var postcode = document.getElementById('postcode').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        var errors = [];
    
        // Full name validation
        if (!fullname || fullname.length < 3) {
            errors.push('Full name must be at least 3 characters long.');
        }
    
        // Email validation (basic example)
        if (!email.match(/^[^@]+@[^\.]+\..+$/)) {
            errors.push('Email must be a valid email address.');
        }
    
        // Telephone validation (basic example)
        if (!telephone.match(/^\d{10}$/)) {
            errors.push('Telephone must be 10 digits long.');
        }
    
        // Address validation
        if (!address || address.length < 5) {
            errors.push('Address must be at least 5 characters long.');
        }
    
        // Postcode validation (basic example)
        if (!postcode.match(/^\d{5}$/)) {
            errors.push('Postcode must be 5 digits long.');
        }
        // Username validation
        if (!username || username.length < 3) {
            errors.push('Username must be at least 3 characters long.');
        }
    
        // Password validation
        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }
    
        // Confirm password validation
        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }
    
        // Display errors or submit the form
        if (errors.length > 0) {
            alert(errors.join('\n'));
        } 
        else {
             // Use the Fetch API to submit the form data
             fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the server
                    if (data.status === 'SUCCESS') {
                        alert('Signup successful!');
                        // Redirect to the index page
                        window.location.href = '/index.html';
                    } else {
                        alert('Signup failed. ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error during signup:', error);
                    alert('An error occurred during signup. Please try again.');
                });
        }
    });
});