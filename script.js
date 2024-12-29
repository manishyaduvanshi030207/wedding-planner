document.addEventListener('DOMContentLoaded', function () {
    const weddingForm = document.getElementById('wedding-form');
    const guestNameInput = document.getElementById('guest-name');
    const addGuestButton = document.getElementById('add-guest');
    const guestList = document.getElementById('guest-names');
    const logoutButton = document.getElementById('logout-btn');
    let guests = [];

    // Handle "Add Guest" button click
    addGuestButton.addEventListener('click', function () {
        const guestName = guestNameInput.value.trim();
        if (guestName !== '') {
            if (guests.length < 100) {
                // Add guest name to array
                guests.push(guestName);
                guestNameInput.value = ''; // Clear the input field
                updateGuestList(); // Update the displayed guest list
            } else {
                alert('You can only add up to 100 guests.');
            }
        } else {
            alert('Please enter a guest name.');
        }
    });

    // Function to update the guest list in the DOM
    function updateGuestList() {
        guestList.innerHTML = ''; // Clear existing list
        guests.forEach(function (guest) {
            const li = document.createElement('li');
            li.textContent = guest;
            guestList.appendChild(li);
        });
    }

    // Form submission
    weddingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const venue = document.getElementById('venue').value;
        const date = document.getElementById('date').value;
        const chicken = document.getElementById('chicken').value || 0;
        const mutton = document.getElementById('mutton').value || 0;
        const fish = document.getElementById('fish').value || 0;
        const crab = document.getElementById('crab').value || 0;
        const potato = document.getElementById('potato').value || 0;
        const tomato = document.getElementById('tomato').value || 0;
        const onion = document.getElementById('onion').value || 0;
        const carrot = document.getElementById('carrot').value || 0;
        const snacks = document.getElementById('snacks').value;
        const softdrinks = document.getElementById('softdrinks').value;
        const alcohol = document.getElementById('alcohol').value;
        const custom = document.getElementById('custom').value;

        // Join guests into a comma-separated string
        const guestListData = guests.join(', ');

        // Create the form data object
        const formData = {
            venue,
            date,
            chicken,
            mutton,
            fish,
            crab,
            potato,
            tomato,
            onion,
            carrot,
            snacks,
            softdrinks,
            alcohol,
            custom,
            guestList: guestListData // Send all guests in one field
        };

        // Send form data to Formspree
        fetch('https://formspree.io/f/mnnnqgrr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert('Form submitted successfully!');
                weddingForm.reset(); // Reset the form
                guestList.innerHTML = ''; // Clear the guest list
                guests = []; // Clear the guests array
            } else {
                alert('Failed to send the form. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send the form. Please try again.');
        });
    });

    // Handle logout
    logoutButton.addEventListener('click', function () {
        window.location.href = 'login.html';
    });

    // Download history as PDF
    document.getElementById('download-pdf').addEventListener('click', function() {
        var element = document.getElementById('history-content');
        element.style.display = 'block'; // Ensure the content is visible
        var options = {
            margin:       1,
            filename:     'Wedding_Plan.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 4 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save().then(() => {
            element.style.display = 'none'; // Hide the content again
        });
    });
});
