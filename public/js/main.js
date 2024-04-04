"use strict";

// Navigationsmeny; flikar.

// Hämtar alla element med klassen "tablink".
const tablinks = document.querySelectorAll('.tablink');

// Loopar igenom varje sidflik och lägger en händelselyssnare på dem.
tablinks.forEach(tablink => {
    tablink.addEventListener('click', function() {
        // Tar bort klassen "active" från alla sidflikar.
        tablinks.forEach(tab => {
            tab.classList.remove('active');
        });

        // Lägger till klassen "active" endast för den klickade sidfliken.
        this.classList.add('active');
    });
});