const fs = require('fs');

const css = `
/* DARK MODE STYLES */
[data-theme="dark"] {
    --bg-color: #121212;
    --text-main: #f5f5f5;
    --text-muted: #a0a0a0;
    --card-bg: #1e1e1e;
    --card-gray: #252525;
    --border-color: #333333;
}

[data-theme="dark"] .premium-heading {
    background: linear-gradient(to bottom, #ffffff 20%, #888888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

[data-theme="dark"] .btn-dark {
    background-color: #f5f5f5;
    color: #111111;
}

[data-theme="dark"] .btn-dark:hover {
    background-color: #ddd;
}

[data-theme="dark"] .btn-light {
    background-color: #252525;
    color: #f5f5f5;
    box-shadow: 0 4px 15px rgba(255,255,255,0.05);
}

[data-theme="dark"] .hero-card::before {
    background: linear-gradient(to right, rgba(18,18,18,0.9) 0%, rgba(18,18,18,0.6) 50%, rgba(18,18,18,0) 100%);
}

[data-theme="dark"] .contact-split-section {
    background: #121212;
}

[data-theme="dark"] .contact-form-inner input, 
[data-theme="dark"] .contact-form-inner textarea {
    background: #1e1e1e;
    border-color: #333;
    color: #f5f5f5;
}

[data-theme="dark"] .contact-form-inner input:focus, 
[data-theme="dark"] .contact-form-inner textarea:focus {
    background: #252525;
    border-color: #f5f5f5;
}

[data-theme="dark"] .nav-icons i,
[data-theme="dark"] .close-menu i,
[data-theme="dark"] .burger-btn i {
    color: #f5f5f5;
}

[data-theme="dark"] .bento-item .bento-content {
    background: rgba(0, 0, 0, 0.8);
}

[data-theme="dark"] .site-footer {
    border-top: 1px solid var(--border-color);
}

[data-theme="dark"] .flourish-section .flourish-content {
    background: linear-gradient(to right, rgba(18,18,18,0.95), transparent);
}

[data-theme="dark"] .benefit-card {
    background: var(--card-gray);
    color: var(--text-main);
}

/* PROJECT CARD FRAME IN CATEGORY PAGES */
.project-card {
    border: 8px solid #ffffff; /* Frame border */
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

[data-theme="dark"] .project-card {
    border-color: #333333;
}
`;

fs.appendFileSync('css/styles.css', css);
console.log('CSS appended.');
