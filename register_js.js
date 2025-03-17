// Handle the form submission and send data to backend via API with JWT in the header
document.getElementById('ipo-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const formData = new FormData(this);
    const data = {
        investor_name: formData.get('investor_name'),
        investor_email: formData.get('investor_email'),
        shares_requested: formData.get('shares_requested')
    };

    // Get the JWT token from localStorage or sessionStorage (Assuming user is logged in and JWT is stored)
    const token = localStorage.getItem('jwtToken');  // Or use sessionStorage

    fetch('http://localhost:3000/register-ipo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Attach the token in Authorization header
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful!');
    })
    .catch(error => {
        alert('Error during registration.');
    });
});
