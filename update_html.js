const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const themeToggleBtn = `\n                <!-- Theme Toggle -->\n                <button id="theme-toggle" class="header-btn" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); margin-right: 0.5rem; padding: 0.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; cursor: pointer;"><i data-lucide="moon"></i></button>`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Inject the theme toggle button after the lang-switch div
    if (content.includes('class="lang-switch"') && !content.includes('id="theme-toggle"')) {
        content = content.replace(/(<div class="lang-switch">[\s\S]*?<\/div>)/, `$1${themeToggleBtn}`);
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
