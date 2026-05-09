/**
 * Index Page Specific Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Typewriter
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        initTypewriter(typewriterElement, ["Creative Developer", "Azure Explorer", "Code Weaver"]);
    }

    // 2. Hero section pink text changes gradient direction with mouse movement
    document.addEventListener('mousemove', (e) => {
        const text = document.querySelector('.hero-content h1 span');
        if (!text) return;
        
        // Calculate mouse angle relative to screen center
        const mouseX = e.clientX;
        
        // Apply gradient direction
        text.style.background = `linear-gradient(to right, var(--secondary), 10%, var(--primary), 70%, var(--secondary))`;
        text.style.webkitBackgroundClip = 'text';
        text.style.backgroundClip = 'text';
        text.style.webkitTextFillColor = 'transparent';
    });

    // 3. Turbine Animation
    const turbineWrapper = document.querySelector('.turbine-wrapper');
    if (turbineWrapper) {
        initTurbineAnimation(turbineWrapper);
    }

    // 4. Avatar Card 3D Fly-to-Camera Effect
    const profileCard = document.querySelector('.profile-card');
    const transitionOverlay = document.getElementById('transition-overlay');

    if (profileCard && transitionOverlay) {
        // Click to trigger animation and redirect
        profileCard.addEventListener('click', () => {
            if (profileCard.classList.contains('flying')) return;

            profileCard.classList.add('flying');
            
            // Trigger white-out transition after a short delay
            setTimeout(() => {
                transitionOverlay.classList.add('active');
            }, 400);

            // Redirect to GitHub after animation finishes
            setTimeout(() => {
                window.location.href = 'https://github.com/NeonAngelThreads/';
            }, 1200);
        });
    }

    // 5. Highlight Project Card Spiral Fly-in
    const highlightCard = document.getElementById('azure-canvas-highlight');
    if (highlightCard && transitionOverlay) {
        highlightCard.addEventListener('click', () => {
            if (highlightCard.classList.contains('spiraling')) return;

            highlightCard.classList.add('spiraling');

            // Trigger white-out transition after a short delay
            setTimeout(() => {
                transitionOverlay.classList.add('active');
            }, 700);

            // Redirect after animation
            setTimeout(() => {
                // Assuming redirect to the project's specific repo
                window.location.href = 'https://github.com/NeonAngelThreads/AzureCanvas';
            }, 1500);
        });
    }
});

/**
 * Turbine Animation Logic
 * @param {HTMLElement} wrapper 
 */
function initTurbineAnimation(wrapper) {
    // Blade configuration
    const bladeConfig = {
        count: 115, // Number of blades existing simultaneously
        speed: 0.01, // Rotation speed
        growthRate: 0.7, // Growth speed
        colors: ['#5d0caf', '#7329c0', '#823cc4', '#9254da',
            '#a268e1', '#bb8eec', '#d6b4f1', '#ead6ff'],
        minSize: 40,
        maxSize: 120
    };
    
    // Blades array
    let blades = [];
    let time = 0;

    // Generate spiral trajectory points
    function getSpiralPosition(index, total, radius) {
        const angle = (index / total) * Math.PI * 3;
        const spiralRadius = radius * (index / total);
        const x = Math.cos(angle) * spiralRadius;
        const y = Math.sin(angle) * spiralRadius;
        return { x, y, angle };
    }
    
    // Create a blade
    function createBlade() {
        const blade = document.createElement('div');
        blade.className = 'turbine-blade';
        
        // Random initial parameters
        const size = bladeConfig.minSize + Math.random() * (bladeConfig.maxSize - bladeConfig.minSize);
        const color = bladeConfig.colors[Math.floor(Math.random() * bladeConfig.colors.length)];
        
        blade.style.width = size + 'px';
        blade.style.height = size + 'px';
        blade.style.background = color;
        blade.style.opacity = '0.8';
        
        // Initial position (center of the spiral)
        blade.style.transform = 'translate(100%, -50%) scale(0.01)';
        
        wrapper.appendChild(blade);

        return {
            element: blade,
            size: size,
            maxSize: size * 1.5,
            currentSize: 0,
            position: 0, // Position between 0-1
            speed: bladeConfig.speed * (0.8 + Math.random() * 0.4),
            opacity: 0.3
        };
    }

    function animate() {
        time += 0.01;
        
        // Periodically create new blades
        if (blades.length < bladeConfig.count) {
            blades.push(createBlade());
        }

        let opacitySum = 0;
        
        // Update blade positions
        blades.forEach((blade, index) => {
            blade.position += blade.speed / 2;

            // Calculate spiral trajectory position
            const spiral = getSpiralPosition(index, bladeConfig.count, 350);
            const x = spiral.x;
            const y = spiral.y;
            const angle = spiral.angle + time * 60;
            
            // Growth animation
            blade.currentSize = Math.min(blade.maxSize, blade.currentSize + bladeConfig.growthRate);
            
            // Position and rotation
            blade.element.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}deg) scale(${blade.currentSize / blade.size})`;
            
            // Fade out effect
            blade.opacity = Math.max(0, 1 - blade.position);
            blade.element.style.opacity = blade.opacity;
            opacitySum += blade.opacity;
        });

        const averageOpacity = opacitySum / bladeConfig.count;
        if (averageOpacity < 0.5) {
            blades.forEach(blade => {
                blade.speed /= 2;
            });
        }

        // Remove blades that are out of range
        blades = blades.filter(blade => {
            if (blade.position > 1 || blade.opacity < 0) {
                if (blade.element.parentNode) {
                    blade.element.parentNode.removeChild(blade.element);
                }
                return false;
            }
            return true;
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
