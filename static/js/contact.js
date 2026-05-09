/**
 * Contact Page Specific Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactDialog = document.getElementById('contact-dialog');
    const openBtn = document.getElementById('open-terminal');
    const closeBtn = document.getElementById('close-dialog');
    const contactForm = document.getElementById('contact-form');
    const feedbackMsg = document.getElementById('success-feedback');
    const submitBtn = document.querySelector('.submit-btn');

    // 1. Dialog Controls
    if (openBtn && contactDialog) {
        openBtn.addEventListener('click', () => {
            contactDialog.classList.add('open');
            // Reset form when opening
            contactForm.classList.remove('hidden');
            feedbackMsg.classList.add('hidden');
            contactForm.reset();
        });
    }

    if (closeBtn && contactDialog) {
        closeBtn.addEventListener('click', () => {
            contactDialog.classList.remove('open');
        });
    }

    // Close on clicking outside the card
    contactDialog.addEventListener('click', (e) => {
        if (e.target === contactDialog) {
            contactDialog.classList.remove('open');
        }
    });

    // 2. Form Submission Simulation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate network latency (2 seconds)
            setTimeout(() => {
                // Get form data
                const formData = {
                    name: document.getElementById('sender-name').value,
                    email: document.getElementById('sender-email').value,
                    message: document.getElementById('message-body').value
                };

                console.log('Transmitting payload:', formData);

                // Hide form and show success message
                contactForm.classList.add('hidden');
                feedbackMsg.classList.remove('hidden');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Automatically close dialog after 3 seconds
                setTimeout(() => {
                    contactDialog.classList.remove('open');
                }, 3000);

            }, 2000);
        });
    }
});
