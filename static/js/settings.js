/**
 * Settings Page Specific Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typewriter
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        initTypewriter(typewriterElement, ["Your Style", "Personalize", "Unique Experience"]);
    }
});
