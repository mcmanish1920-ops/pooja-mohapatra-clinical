document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            body.style.display = body.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Form Submission Handling
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out. Your message has been sent securely.');
            form.reset();
        });
    }
});
