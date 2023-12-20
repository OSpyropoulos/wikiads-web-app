
document.getElementById('signup-form').addEventListener('submit', function(event){
    event.preventDefault(); // Prevent the form from submitting


    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var birthday = document.getElementById('birthday').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var telephone = document.getElementById('telephone').value;
    var address = document.getElementById('address').value;
    var postcode = document.getElementById('postcode').value;


    var errors = [];

    // Full name validation
    if (!fullname || fullname.length < 3) {
        errors.push('Full name must be at least 3 characters long.');
    }

    // Email validation (basic example)
    if (!email.match(/^[^@]+@[^\.]+\..+$/)) {
        errors.push('Email must be a valid email address.');
    }

    //birthday age validation
    
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    var d = today.getDate() - birthDate.getDate();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        errors.push('You must be at least 18 years old.');
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
    } else {
        alert('Signup successful!');
        // Here you can add the code to submit the form data
    }
});
