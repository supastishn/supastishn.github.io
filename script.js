// Get the specific item element
const kartingGameItem = document.getElementById('karting-game');

// Check if the element exists before adding listener
if (kartingGameItem) {
    // Add a click event listener
    kartingGameItem.addEventListener('click', function() {
        // Redirect the user to the specified URL
        window.location.href = 'https://supastishn.github.io/karting-game';
    });
} else {
    console.error("Element with ID 'karting-game' not found.");
}

// You can add more event listeners for other items here later

// Get the new Velotek link element
const velotekLinkItem = document.getElementById('velotek-link');

// Check if the element exists before adding listener
if (velotekLinkItem) {
    // Add a click event listener
    velotekLinkItem.addEventListener('click', function() {
        // Redirect the user to the specified URL
        window.location.href = 'https://velotekai.com';
    });
} else {
    console.error("Element with ID 'velotek-link' not found.");
}
