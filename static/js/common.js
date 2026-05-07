/**
 * Common script file
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animation when elements enter the viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 2. Background decoration orbs parallax effect following the mouse
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const orbs = document.querySelectorAll('.bg-orb');
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 300;
            const moveX = (i % 2 === 0 ? 1 : -1) * x * factor;
            const moveY = (i % 3 === 0 ? 1 : -1) * y * factor;
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});

/**
 * Common typewriter effect
 * @param {HTMLElement} element - Target element
 * @param {Array<string>} phrases - Array of phrases
 * @param {Object} options - Configuration options
 */
function initTypewriter(element, phrases, options = {}) {
    if (!element) return;

    const settings = {
        typeSpeed: options.typeSpeed || 100,
        deleteSpeed: options.deleteSpeed || 50,
        pauseTime: options.pauseTime || 2000,
        ...options
    };

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let lastTime = 0;
    let currentPauseTime = settings.pauseTime;

    function type(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const elapsed = currentTime - lastTime;
        const currentPhrase = phrases[phraseIndex];

        if (currentPauseTime > 0) {
            if (elapsed >= currentPauseTime) {
                currentPauseTime = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(type);
            return;
        }

        const speed = isDeleting ? settings.deleteSpeed : settings.typeSpeed;
        if (elapsed >= speed) {
            element.textContent = currentPhrase.substring(0, isDeleting ? charIndex - 1 : charIndex + 1);
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            lastTime = currentTime;

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                currentPauseTime = settings.pauseTime;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                currentPauseTime = 500; // Brief pause when switching phrases
            }
        }
        requestAnimationFrame(type);
    }
    requestAnimationFrame(type);
}
