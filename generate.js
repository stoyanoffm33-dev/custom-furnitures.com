const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace textarea with one having an id
let modifiedIndex = indexHtml.replace('<textarea required></textarea>', '<textarea id="contact-desc" required></textarea>');

// Also update index.html so the contact form has the id there too
fs.writeFileSync('index.html', modifiedIndex);

// Split index.html
const mainStart = modifiedIndex.indexOf('<!-- Hero Section -->');
const contactStart = modifiedIndex.indexOf('<!-- Contact Section -->');

const headAndNav = modifiedIndex.substring(0, mainStart);
const contactFormAndFooter = modifiedIndex.substring(contactStart);

function getImages(dirs) {
    let images = [];
    dirs.forEach(dir => {
        const fullPath = path.join('assets', dir);
        if (fs.existsSync(fullPath)) {
            const files = fs.readdirSync(fullPath);
            // Sort files numerically/naturally
            files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
            files.forEach(file => {
                if (file.match(/\.(png|jpe?g)$/i)) {
                    images.push(`assets/${dir}/${file}`);
                }
            });
        }
    });
    return images;
}

const pages = [
    {
        file: 'kitchen.html',
        bgFile: 'kuhnya.html',
        dirs: ['kuhni'],
        titleKey: 'cat_kitchens',
        introKey: 'cat_intro_kitchens',
        codePrefix: 'K'
    },
    {
        file: 'bedroom.html',
        bgFile: 'spalnya.html',
        dirs: ['spalni-i-legla', 'garderobi'],
        titleKey: 'cat_bedrooms',
        introKey: 'cat_intro_bedrooms',
        codePrefix: 'B'
    },
    {
        file: 'livingroom.html',
        bgFile: 'vsekidnevna.html',
        dirs: ['byura-i-sekcii'],
        titleKey: 'cat_living_desks',
        introKey: 'cat_intro_living',
        codePrefix: 'L'
    },
    {
        file: 'bathroom.html',
        bgFile: 'banya.html',
        dirs: ['bani'],
        titleKey: 'cat_bathrooms',
        introKey: 'cat_intro_bathrooms',
        codePrefix: 'BA'
    },
    {
        file: 'kids-rooms.html',
        bgFile: 'detski-stai.html',
        dirs: ['detski-stai'],
        titleKey: 'cat_kids_rooms',
        introKey: 'cat_intro_kids',
        codePrefix: 'CR'
    }
];

const creativeNames = {
    'K': {
        bg: ['Модерен Оазис', 'Скандинавски Дзен', 'Градски Шик', 'Луксозен Минимализъм', 'Кехлибарено Сияние', 'Авангардна Класика', 'Мраморна Елегантност', 'Тъмна Материя', 'Светла Хармония', 'Функционално Съвършенство'],
        en: ['Modern Oasis', 'Scandinavian Zen', 'Urban Chic', 'Luxury Minimalism', 'Amber Radiance', 'Avant-garde Classic', 'Marble Elegance', 'Dark Matter', 'Light Harmony', 'Functional Perfection']
    },
    'B': {
        bg: ['Облачно Убежище', 'Кадифена Полунощ', 'Сутрешна Светлина', 'Индустриален Сън', 'Крайбрежен Бриз', 'Кралско Спокойствие', 'Спокоен Оазис', 'Кашмирен Уют'],
        en: ['Cloud Retreat', 'Velvet Midnight', 'Morning Light', 'Industrial Slumber', 'Coastal Breeze', 'Royal Solitude', 'Serene Oasis', 'Cashmere Comfort']
    },
    'kids': {
        bg: ['Ловец на Сънища', 'Звездна Хижа', 'Приключенско Легло', 'Почивката на Героя', 'Приказно Кътче', 'Вълшебен Сенник', 'Весела Бърлога', 'Облачен Скачач'],
        en: ['Dream Catcher', 'Starlight Cabin', 'Adventure Bed', 'Hero\'s Rest', 'Fairy Tale Nook', 'Magic Canopy', 'Playful Den', 'Cloud Jumper']
    },
    'CR': {
        bg: ['Детско Царство', 'Слънчев Кът', 'Малък Откривател', 'Цветна Хармония', 'Скандинавска Приказка', 'Космическо Приключение', 'Магическа Стая', 'Горска Приказка', 'Ловец на Сънища', 'Звездна Хижа', 'Приключенско Легло', 'Почивката на Героя'],
        en: ['Kids\' Kingdom', 'Sunny Corner', 'Little Explorer', 'Pastel Harmony', 'Scandinavian Tale', 'Cosmic Adventure', 'Magic Room', 'Forest Tale', 'Dream Catcher', 'Starlight Cabin', 'Adventure Bed', 'Hero\'s Rest']
    },
    'L': {
        bg: ['Социална Хармония', 'Светъл Салон', 'Модерен Бетон', 'Оазис на Спокойствието', 'Модерен Разкош', 'Топла Прегръдка', 'Екзекютив Стил', 'Артистичен Кът'],
        en: ['Social Harmony', 'Luminous Lounge', 'Concrete Chic', 'Oasis of Calm', 'Modern Opulence', 'Warm Embrace', 'Executive Style', 'Artisan Corner']
    },
    'BA': {
        bg: ['Спа Светилище', 'Мраморен Мираж', 'Океанско Блаженство', 'Камък и Светлина', 'Кристална Яснота', 'Аква Рай', 'Дзен Водопад', 'Убежище от Шистови Скали'],
        en: ['Spa Sanctuary', 'Marble Mirage', 'Oceanic Bliss', 'Stone & Light', 'Crystal Clear', 'Aqua Haven', 'Zen Rainfall', 'Slate Retreat']
    }
};

function getCreativeName(prefix, index, lang) {
    const arr = creativeNames[prefix] ? creativeNames[prefix][lang] : creativeNames['K'][lang];
    return arr[index % arr.length];
}

pages.forEach(page => {
    const images = getImages(page.dirs);
    let projectsHtml = '';
    let kidsHtml = '';
    let kidsIdx = 0;
    let projIdx = 0;

    images.forEach((img, idx) => {
        const num = (idx + 1).toString().padStart(2, '0');
        const code = `${page.codePrefix}-${num}`;
        
        if (page.file === 'bedroom.html' && img.includes('detsko-leglo')) {
            const bgName = getCreativeName('kids', kidsIdx, 'bg');
            const enName = getCreativeName('kids', kidsIdx, 'en');
            kidsIdx++;
            kidsHtml += `
            <div class="project-card" data-project-code="${code}" data-project-titleKey="">
                <img src="${img}" alt="${enName}">
                <div class="project-card-info">
                    <h4 class="dynamic-title" data-title-bg="${bgName}" data-title-en="${enName}">${enName}</h4>
                    <span>${code}</span>
                </div>
            </div>
            `;
        } else {
            const bgName = getCreativeName(page.codePrefix, projIdx, 'bg');
            const enName = getCreativeName(page.codePrefix, projIdx, 'en');
            projIdx++;
            projectsHtml += `
            <div class="project-card" data-project-code="${code}" data-project-titleKey="">
                <img src="${img}" alt="${enName}">
                <div class="project-card-info">
                    <h4 class="dynamic-title" data-title-bg="${bgName}" data-title-en="${enName}">${enName}</h4>
                    <span>${code}</span>
                </div>
            </div>
            `;
        }
    });

    const benefitsSection = `
        <section class="benefits-section">
            <div class="benefits-track">
                <div class="benefit-card">
                    <i data-lucide="shield-check" style="color: #9d814c;"></i>
                    <span data-i18n="benefit_1">24-Month Warranty</span>
                </div>
                <div class="benefit-card">
                    <i data-lucide="cuboid" style="color: #9d814c;"></i>
                    <span data-i18n="benefit_2">Free 3D Project</span>
                </div>
                <div class="benefit-card">
                    <i data-lucide="gem" style="color: #9d814c;"></i>
                    <span data-i18n="benefit_3">Premium Materials & Hardware</span>
                </div>
                <!-- Duplicate for Marquee -->
                <div class="benefit-card mobile-only">
                    <i data-lucide="shield-check" style="color: #9d814c;"></i>
                    <span data-i18n="benefit_1">24-Month Warranty</span>
                </div>
                <div class="benefit-card mobile-only">
                    <i data-lucide="cuboid" style="color: #9d814c;"></i>
                    <span data-i18n="benefit_2">Free 3D Project</span>
                </div>
                <div class="benefit-card mobile-only">
                    <i data-lucide="gem" style="color: #9d814c;"></i>
                    <span data-i18n="benefit_3">Premium Materials & Hardware</span>
                </div>
            </div>
        </section>
    `;

    const partnersSection = `
        <section id="quality-section" class="partners-section" style="padding: 4rem var(--container-padding); background: transparent;">
            <div class="partners-header">
                <h2 data-i18n="partners_title" class="premium-heading">Zero Compromise in Quality</h2>
                <p data-i18n="partners_subtitle">only the best materials</p>
            </div>
            <div class="partners-marquee">
                <div class="marquee-content">
                    <img src="assets/kronospan.png" alt="Kronospan">
                    <img src="assets/blum.png" alt="Blum">
                    <img src="assets/egger.png" alt="Egger">
                    <img src="assets/kronospan.png" alt="Kronospan">
                    <img src="assets/blum.png" alt="Blum">
                    <img src="assets/egger.png" alt="Egger">
                    <img src="assets/kronospan.png" alt="Kronospan">
                    <img src="assets/blum.png" alt="Blum">
                    <img src="assets/egger.png" alt="Egger">
                </div>
            </div>
        </section>
    `;

    let extraSections = '';
    if (page.file === 'bedroom.html' && kidsHtml !== '') {
        extraSections = `
        <section class="page-header" style="padding: 2rem var(--container-padding); text-align: center;">
            <h2 data-i18n="cat_kids_beds" class="premium-heading" style="font-size: 2.5rem; color: var(--text-main);">Children's Beds</h2>
        </section>
        <section class="projects-grid">
            ${kidsHtml}
        </section>
        `;
    }

    const htmlContent = `${headAndNav}
        <section class="page-header" style="padding: 4rem var(--container-padding) 2rem; text-align: center;">
            <h1 data-i18n="${page.titleKey}" class="premium-heading">Category</h1>
            <p data-i18n="${page.introKey}" class="category-subtitle" style="max-width: 600px; margin: 0 auto;">Functionality without compromising design. Explore our realizations and get inspired for your home.</p>
        </section>

        ${benefitsSection}

        <section class="projects-grid">
            ${projectsHtml}
        </section>

        ${extraSections}


        <!-- Project Modal -->
        <div id="project-modal" class="modal-overlay">
            <div class="modal-container">
                <button class="modal-close"><i data-lucide="x"></i></button>
                <div class="modal-layout">
                    <div class="modal-image-side">
                        <img class="modal-img" src="" alt="Project">
                    </div>
                    <div class="modal-sidebar">
                        <div class="sidebar-header">
                            <h3 class="modal-title">Project Name</h3>
                            <span class="modal-code">CODE-01</span>
                        </div>
                        <div class="sidebar-body">
                            <p data-i18n="modal_desc_placeholder">Experience the perfect blend of functionality and modern design with our custom-made furniture solutions.</p>
                        </div>
                        <div class="sidebar-footer">
                            <button class="btn-dark btn-similar" data-i18n="modal_btn_similar">Request a quote for a similar project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        ${partnersSection}

        ${contactFormAndFooter}
    `;

    fs.writeFileSync(page.file, htmlContent);
    fs.writeFileSync(page.bgFile, htmlContent);
});

console.log('Pages generated.');
