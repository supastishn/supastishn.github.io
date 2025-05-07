const kartingGameItem = document.getElementById('karting-game');

if (kartingGameItem) {
    kartingGameItem.addEventListener('click', function() {
        window.location.href = 'https://supastishn.github.io/karting-game';
    });
} else {
    console.error("Element with ID 'karting-game' not found.");
}

const velotekLinkItem = document.getElementById('velotek-link');

if (velotekLinkItem) {
    velotekLinkItem.addEventListener('click', function() {
        window.location.href = 'https://velotekai.com';
    });
} else {
    console.error("Element with ID 'velotek-link' not found.");
}

const supatubeLinkItem = document.getElementById('supatube-link');

if (supatubeLinkItem) {
    supatubeLinkItem.addEventListener('click', function() {
        window.location.href = 'https://supastishn.github.io/supatube';
    });
} else {
    console.error("Element with ID 'supatube-link' not found.");
}
