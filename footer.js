/**
 * footer.js - TerraQuint
 * Automatically updates the copyright year on all pages
 * 
 * How it works:
 * - Finds any element with id="current-year"
 * - Replaces its content with the current year from user's computer
 * - No manual updates needed ever again
 */

(function() {
    'use strict';
    
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // Find the element that holds the year
        const yearElement = document.getElementById('current-year');
        
        // If the element exists, update it with the current year
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = currentYear;
        }
        
        // Optional: Log to console for debugging (remove in production)
        console.log('footer.js loaded - Copyright year updated to', new Date().getFullYear());
    });
})();