/**
 * Projects Page Specific Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    const deck = document.querySelector('.cards-deck');
    const waveWrappers = document.querySelectorAll('.card-wave-wrapper');
    
    if (waveWrappers.length > 0) {
        // 1. JS-driven wave floating animation (Wave Floating Effect)
        let floatTime = 0;
        function animateWaveFloating() {
            floatTime += 0.03;
            
            waveWrappers.forEach((wrapper, index) => {
                // Introduce phase difference for each card (index * 0.5) to achieve a wave-like feel
                const floatY = Math.sin(floatTime + index * 0.5) * 12; 
                wrapper.style.transform = `translateY(${floatY}px)`;
            });
            
            requestAnimationFrame(animateWaveFloating);
        }
        animateWaveFloating();
    }

    if (deck) {
        // 2. Smooth mouse movement interaction (Parallax Effect)
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth) - 0.5;
            targetY = (e.clientY / window.innerHeight) - 0.5;
        });

        function updateMouseParallax() {
            mouseX += (targetX - mouseX) * 0.05;
            mouseY += (targetY - mouseY) * 0.05;

            const moveX = mouseX * 120; // Slightly increase movement range
            const moveY = mouseY * 60;  
            
            // Only acts on deck, does not interfere with child element wave animation
            deck.style.transform = `translate(${moveX}px, ${moveY}px)`;

            requestAnimationFrame(updateMouseParallax);
        }
        updateMouseParallax();
    }
});
