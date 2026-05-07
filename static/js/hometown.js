/**
 * Hometown Page Specific Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typewriter
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        initTypewriter(typewriterElement, ["My Hometown", "Beautiful Place", "Warm Memories"]);
    }
});
