document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation (you can add more complex validation and authentication)
        if (email && password) {
            // Redirect to the main page
            window.location.href = 'index.html';
        } else {
            alert('Please enter a valid email and password.');
        }
    });
});
