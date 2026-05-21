document.addEventListener('DOMContentLoaded', () => {
    // LANGUAGE SWITCHING
    let currentLang = localStorage.getItem('preferredLang') || 'bg';
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // DYNAMIC REVIEWS
    function renderReviews() {
        const track = document.getElementById('reviews-slider-track');
        if (!track) return;

        const defaultReviews = [
            {
                nameKey: 'review_name_1',
                textKey: 'review_placeholder_1',
                roleKey: 'review_role_1',
                rating: 5
            },
            {
                nameKey: 'review_name_2',
                textKey: 'review_placeholder_2',
                roleKey: 'review_role_2',
                rating: 5
            },
            {
                nameKey: 'review_name_3',
                textKey: 'review_placeholder_3',
                roleKey: 'review_role_3',
                rating: 5
            },
            {
                nameKey: 'review_name_4',
                textKey: 'review_placeholder_4',
                roleKey: 'review_role_4',
                rating: 5
            }
        ];

        let clientReviews = [];
        try {
            clientReviews = JSON.parse(localStorage.getItem('client_reviews')) || [];
            if (!Array.isArray(clientReviews)) clientReviews = [];
        } catch (e) {
            clientReviews = [];
        }

        // Filter: rating > 4
        const filteredClientReviews = clientReviews.filter(r => r.rating > 4);

        let html = '';

        // Render client reviews (custom submitted)
        filteredClientReviews.forEach(r => {
            const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
            
            // Check if there is a custom profile picture (Google avatar)
            let photoHtml = '';
            if (r.authorPhoto) {
                photoHtml = `<img src="${r.authorPhoto}" class="author-photo" alt="${r.name}">`;
            } else {
                photoHtml = `
                    <div class="author-photo" style="display: flex; align-items: center; justify-content: center; background: #9d814c; color: white; font-weight: bold; font-size: 1.2rem;">
                        ${r.name.charAt(0).toUpperCase()}
                    </div>
                `;
            }

            // Check if there are uploaded images
            let galleryHtml = '';
            if (r.images && Array.isArray(r.images) && r.images.length > 0) {
                galleryHtml = `
                    <div class="review-card-gallery">
                        ${r.images.map((img, idx) => `<img src="${img}" class="review-card-img" alt="Review image ${idx + 1}">`).join('')}
                    </div>
                `;
            }

            html += `
                <div class="review-card">
                    <div class="review-stars">${stars}</div>
                    <p class="review-text">"${r.text}"</p>
                    ${galleryHtml}
                    <div class="review-author">
                        ${photoHtml}
                        <div class="author-info">
                            <h4>${r.name}</h4>
                            <span>${r.city}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        // Render default reviews
        defaultReviews.forEach(r => {
            const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
            const name = translations[currentLang][r.nameKey] || '';
            const text = translations[currentLang][r.textKey] || '';
            const role = translations[currentLang][r.roleKey] || '';
            html += `
                <div class="review-card">
                    <div class="review-stars">${stars}</div>
                    <p class="review-text" data-i18n="${r.textKey}">${text}</p>
                    <div class="review-author">
                        <div class="author-photo" style="display: flex; align-items: center; justify-content: center; background: #9d814c; color: white; font-weight: bold; font-size: 1.2rem;">
                            ${name.charAt(0).toUpperCase()}
                        </div>
                        <div class="author-info">
                            <h4 data-i18n="${r.nameKey}">${name}</h4>
                            <span data-i18n="${r.roleKey}">${role}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        track.innerHTML = html;
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        langBtns.forEach(btn => btn.classList.remove('active'));
        if (document.getElementById(`lang-${lang}`)) {
            document.getElementById(`lang-${lang}`).classList.add('active');
        }
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
            // Update link URLs based on language
            const localizedHref = el.getAttribute(`data-href-${lang}`);
            if (localizedHref) {
                el.setAttribute('href', localizedHref);
            }
        });

        document.querySelectorAll('.dynamic-title').forEach(el => {
            const title = el.getAttribute(`data-title-${lang}`);
            if (title) {
                el.innerHTML = title;
            }
        });

        document.documentElement.lang = lang;
    }

    // Initialize Reviews and Language
    renderReviews();
    setLanguage(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.id.split('-')[1];
            setLanguage(lang);
        });
    });

    // MOBILE MENU
    const burgerBtn = document.getElementById('burger-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (burgerBtn && mobileOverlay && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) closeMenu();
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                closeMenu();
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        setTimeout(() => {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }, 300); // Give menu time to close
                    }
                }
            });
        });
    }

    // SPA NAVIGATION (Fade between sections)
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    function navigateTo(hash) {
        if (!hash) hash = '#home';
        
        // Update nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // Update sections with ease-in-out
        sections.forEach(sec => {
            if (sec.classList.contains('active')) {
                sec.style.opacity = 0;
                sec.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    sec.classList.remove('active');
                    activateSection(hash);
                }, 400); // Wait for fade out
            }
        });

        // If no section was active (initial load)
        if (!document.querySelector('.page-section.active')) {
            activateSection(hash);
        }
    }

    function activateSection(hash) {
        sections.forEach(sec => {
            if (`#${sec.id}` === hash) {
                sec.classList.add('active');
                // Force reflow
                void sec.offsetWidth;
                sec.style.opacity = 1;
                sec.style.transform = 'translateY(0)';
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu logic is handled by mobileLinks above

            const hash = e.target.getAttribute('href');
            history.pushState(null, '', hash);
            navigateTo(hash);
        });
    });

    // Back/forward button support
    window.addEventListener('popstate', () => {
        navigateTo(window.location.hash);
    });

    // Initial load
    if(window.location.hash) {
        navigateTo(window.location.hash);
    } else {
        const home = document.getElementById('home');
        if (home) {
            home.classList.add('active');
            setTimeout(() => {
                home.style.opacity = 1;
                home.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // PROJECT MODAL LOGIC
    const modal = document.getElementById('project-modal');
    if (modal) {
        const modalImg = modal.querySelector('.modal-img');
        const modalTitle = modal.querySelector('.modal-title');
        const modalCode = modal.querySelector('.modal-code');
        const btnSimilar = modal.querySelector('.btn-similar');
        const closeBtn = modal.querySelector('.modal-close');

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const imgSrc = card.querySelector('img').src;
                const lang = document.documentElement.lang || 'bg';
                const titleEl = card.querySelector('.dynamic-title');
                
                let projectTitle = '';
                if (titleEl) {
                    projectTitle = titleEl.getAttribute(`data-title-${lang}`) || titleEl.textContent;
                } else {
                    const projectTitleKey = card.getAttribute('data-project-titleKey');
                    projectTitle = translations[lang] ? translations[lang][projectTitleKey] : 'Project';
                }
                
                const codeText = card.querySelector('span') ? card.querySelector('span').textContent : card.getAttribute('data-project-code');
                
                modalImg.src = imgSrc;
                modalTitle.textContent = projectTitle;
                if (modalCode) modalCode.textContent = codeText;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                if (btnSimilar) {
                    btnSimilar.onclick = (e) => {
                        e.preventDefault();
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                        
                        let imagePath = imgSrc;
                        try {
                            const parsedUrl = new URL(imgSrc, window.location.origin);
                            imagePath = parsedUrl.pathname;
                        } catch (err) {
                            // Fallback
                        }
                        if (!imagePath.startsWith('/')) {
                            imagePath = '/' + imagePath;
                        }
                        const liveLink = `https://custom-furnitures.com${imagePath}`;

                        const descField = document.getElementById('contact-desc') || document.querySelector('form textarea');
                        if (descField) {
                            if (lang === 'bg') {
                                descField.value = `Здравейте, желая подобен проект на ${projectTitle} (${codeText}) - ${liveLink}`;
                            } else {
                                descField.value = `Hello, I am interested in a similar project to ${projectTitle} (${codeText}) - ${liveLink}`;
                            }
                        }

                        // Add image link to hidden form field for structured sheets/email submission
                        let hiddenImageInput = document.getElementById('contact-project-image');
                        if (!hiddenImageInput) {
                            hiddenImageInput = document.createElement('input');
                            hiddenImageInput.type = 'hidden';
                            hiddenImageInput.id = 'contact-project-image';
                            hiddenImageInput.name = 'imageUrl';
                            const activeForm = document.querySelector('#contact form') || document.querySelector('form');
                            if (activeForm) {
                                activeForm.appendChild(hiddenImageInput);
                            }
                        }
                        if (hiddenImageInput) {
                            hiddenImageInput.value = liveLink;
                        }

                        // Update the contact section background image with the project image
                        const contactImgEl = document.getElementById('contact-random-img');
                        if (contactImgEl) {
                            contactImgEl.src = imgSrc;
                        }
                    };
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // HERO VIDEO INTERACTION LOGIC
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroVideos = heroSection.querySelectorAll('.hero-video');
        
        let hasInitialized = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (hasInitialized) {
                        heroVideos.forEach(v => {
                            v.currentTime = 0;
                            v.play().catch(e => console.log('Play prevented', e));
                        });
                    } else {
                        hasInitialized = true;
                    }
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroSection);

        heroSection.addEventListener('click', () => {
            heroVideos.forEach(v => {
                v.currentTime = 0;
                v.play().catch(e => console.log('Play prevented', e));
            });
        });
    }

    // ANTIGRAVITY PHYSICS
    
    // Zero-G Repel Effect
    const zeroGElements = document.querySelectorAll('.zero-g');
    
    document.addEventListener('mousemove', (e) => {
        // Only run effects on desktop to save performance
        if (window.innerWidth < 768) return;

        zeroGElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - x, 2) + Math.pow(e.clientY - y, 2));
            
            if (distance < 150) {
                const angle = Math.atan2(e.clientY - y, e.clientX - x);
                const force = (150 - distance) / 10;
                const pushX = -Math.cos(angle) * force;
                const pushY = -Math.sin(angle) * force;
                el.style.transform = `translate(${pushX}px, ${pushY}px)`;
            } else {
                el.style.transform = `translate(0px, 0px)`;
            }
        });

        // Magnetic Attraction
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - x, 2) + Math.pow(e.clientY - y, 2));
            
            if (distance < 200) {
                const force = (200 - distance) / 15;
                const pullX = (e.clientX - x) / rect.width * force * 10;
                const pullY = (e.clientY - y) / rect.height * force * 10;
                el.style.transform = `translate(${pullX}px, ${pullY}px)`;
            } else {
                el.style.transform = `translate(0px, 0px)`;
            }
        });
    });

    // PARALLAX BACKGROUND
    const parallaxBg = document.getElementById('parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            // Fast optimized scroll handler
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                parallaxBg.style.transform = `translateY(${scrollY * 0.4}px)`;
            });
        }, { passive: true });
    }



    // MOBILE AUTOPLAY SLIDERS
    function setupMobileAutoplay() {
        if (window.innerWidth > 768) return;

        const sliders = [
            document.querySelector('.benefits-section')
        ];

        sliders.forEach(slider => {
            if (!slider) return;
            let scrollInterval;
            
            const startAutoplay = () => {
                scrollInterval = setInterval(() => {
                    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                    if (slider.scrollLeft >= maxScrollLeft - 10) {
                        slider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        slider.scrollBy({ left: slider.clientWidth * 0.8, behavior: 'smooth' });
                    }
                }, 3000);
            };

            const stopAutoplay = () => clearInterval(scrollInterval);

            startAutoplay();

            slider.addEventListener('touchstart', stopAutoplay, {passive: true});
            slider.addEventListener('touchend', startAutoplay, {passive: true});
        });
    }
    setupMobileAutoplay();
    
    // Transformation Section Animation
    const transformSection = document.querySelector('.transformation-section');
    if (transformSection) {
        const tImages = transformSection.querySelectorAll('.t-img');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        tImages.forEach(img => img.classList.add('visible'));
                    }, 500);
                    observer.unobserve(transformSection);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(transformSection);
    }

    // Contact Section Image Rotation
    const contactImages = [
        "assets/bani/bath2.png",
        "assets/bani/bath4.png",
        "assets/bani/bath5.png",
        "assets/bani/bath9.png",
        "assets/byura-i-sekcii/shelf2.png",
        "assets/byura-i-sekcii/shelf4.png",
        "assets/garderobi/wardrobe1.jpg",
        "assets/garderobi/wardrobe4.png",
        "assets/garderobi/wardrobe10.png",
        "assets/detski-stai/kids3.jpg",
        "assets/detski-stai/kids12.png",
        "assets/kuhni/kitchen1.png",
        "assets/kuhni/kitchen2.png",
        "assets/kuhni/kitchen9.png",
        "assets/kuhni/kitchen33.png",
        "assets/kuhni/kitchen38.png",
        "assets/kuhni/kitchen41.png",
        "assets/kuhni/kitchen39.png",
        "assets/spalni-i-legla/bedroom4.png",
        "assets/spalni-i-legla/bedroom5.png"
    ];

    const contactImgEl = document.getElementById('contact-random-img');
    if (contactImgEl) {
        const randomIndex = Math.floor(Math.random() * contactImages.length);
        contactImgEl.src = contactImages[randomIndex];
    }

    // DARK MODE TOGGLE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme == 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (currentTheme == 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    function updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}"></i>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }
    
    setTimeout(updateThemeIcon, 100);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcon();
        });
    }

    // MODAL BACKGROUND BLUR SYNC
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const modalImgContainer = document.querySelector('.modal-image-side');
            if (modalImgContainer) {
                modalImgContainer.style.backgroundImage = `url('${imgSrc}')`;
                modalImgContainer.style.backgroundSize = 'cover';
                modalImgContainer.style.backgroundPosition = 'center';
            }
        });
    });

    // PREVIEWS CAROUSEL LOGIC
    const container = document.querySelector('.bento-carousel-container');
    const track = document.querySelector('.bento-carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (container && track && prevBtn && nextBtn) {
        const slides = document.querySelectorAll('.carousel-slide');
        
        const getScrollParams = () => {
            const gap = 24; // 1.5rem
            const slideWidth = slides[0].offsetWidth;
            const scrollAmount = slideWidth + gap;
            return { scrollAmount };
        };

        const updateButtons = () => {
            prevBtn.disabled = container.scrollLeft <= 10;
            nextBtn.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        };

        prevBtn.addEventListener('click', () => {
            const { scrollAmount } = getScrollParams();
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const { scrollAmount } = getScrollParams();
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        container.addEventListener('scroll', updateButtons);
        // Initialize
        setTimeout(updateButtons, 100);
        window.addEventListener('resize', updateButtons);
    }

    // PHILOSOPHY WAVE PATH HOVER EFFECT
    function initWavePath() {
        const hoverArea = document.querySelector('.wave-hover-area');
        const path = document.querySelector('.wave-path');
        if (!hoverArea || !path) return;

        let progress = 0;
        let x = 0.5;
        let time = Math.PI / 2;
        let reqId = null;

        const setPath = (progressValue) => {
            const width = hoverArea.offsetWidth;
            path.setAttribute('d', `M0 100 Q${width * x} ${100 + progressValue * 0.6}, ${width} 100`);
        };

        // Initial flat path
        setPath(0);

        const lerp = (start, end, amt) => start * (1 - amt) + end * amt;

        const animateOut = () => {
            const newProgress = progress * Math.sin(time);
            progress = lerp(progress, 0, 0.025);
            time += 0.2;
            setPath(newProgress);
            
            if (Math.abs(progress) > 0.75) {
                reqId = requestAnimationFrame(animateOut);
            } else {
                resetAnimation();
            }
        };

        const resetAnimation = () => {
            time = Math.PI / 2;
            progress = 0;
            setPath(0);
            if (reqId) {
                cancelAnimationFrame(reqId);
                reqId = null;
            }
        };

        hoverArea.addEventListener('mouseenter', () => {
            if (reqId) {
                cancelAnimationFrame(reqId);
                reqId = null;
            }
            resetAnimation();
        });

        hoverArea.addEventListener('mousemove', (e) => {
            const rect = hoverArea.getBoundingClientRect();
            const clientX = e.clientX;
            const movementY = e.movementY;

            x = (clientX - rect.left) / rect.width;
            progress += movementY * 1.5;
            setPath(progress);
        });

        hoverArea.addEventListener('mouseleave', () => {
            animateOut();
        });
        
    }
    initWavePath();

    // GOOGLE APPS SCRIPT FORM SUBMISSION (exclude review form)
    const forms = document.querySelectorAll('form:not(#review-submit-form)');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
            
            // Get translations for loading/success/error state
            const currentLang = document.documentElement.lang || 'en';
            const loadingText = currentLang === 'bg' ? 'Изпраща се...' : 'Sending...';
            const successText = currentLang === 'bg' 
                ? 'Благодарим Ви! Вашето запитване беше изпратено успешно.' 
                : 'Thank you! Your inquiry was sent successfully.';
            const errorText = currentLang === 'bg'
                ? 'Възникна грешка при изпращането. Моля, опитайте отново.'
                : 'An error occurred. Please try again.';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = loadingText;
            }

            const nameVal = form.querySelector('[name="name"]')?.value || '';
            const phoneVal = form.querySelector('[name="phone"]')?.value || '';
            const emailVal = form.querySelector('[name="email"]')?.value || '';
            const messageVal = form.querySelector('[name="message"]')?.value || '';
            const imageUrlVal = form.querySelector('[name="imageUrl"]')?.value || '';
            
            const formData = {
                name: nameVal,
                phone: phoneVal,
                email: emailVal,
                message: messageVal,
                itemUrl: window.location.href,
                imageUrl: imageUrlVal
            };

            fetch('https://script.google.com/macros/s/AKfycbz9PXB_gmyryCVMnKlWoN0g42GvWkkcD8cn4JTKd7RHLObNOWRkYjq_4cis8MjlFB6_EA/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                alert(successText);
                form.reset();
                const hiddenImageInput = form.querySelector('[name="imageUrl"]');
                if (hiddenImageInput) {
                    hiddenImageInput.value = '';
                }
                const contactImgEl = document.getElementById('contact-random-img');
                if (contactImgEl && typeof contactImages !== 'undefined' && contactImages.length > 0) {
                    const randomIndex = Math.floor(Math.random() * contactImages.length);
                    contactImgEl.src = contactImages[randomIndex];
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
                alert(errorText);
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        });
    });

    // LIGHTBOX FOR REVIEW IMAGES
    const lightbox = document.getElementById('review-lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        let currentImages = [];
        let currentImgIndex = 0;

        const showImage = (index) => {
            if (index < 0 || index >= currentImages.length) return;
            currentImgIndex = index;
            lightboxImg.src = currentImages[index];
            
            // Hide/show prev/next buttons
            lightboxPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
            lightboxNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
        };

        const openLightbox = (images, startIndex) => {
            currentImages = images;
            showImage(startIndex);
            lightbox.style.display = 'flex';
            // force reflow
            void lightbox.offsetWidth;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        };

        // Click on thumbnail to open
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('review-card-img')) {
                const gallery = e.target.closest('.review-card-gallery');
                if (gallery) {
                    const thumbnails = Array.from(gallery.querySelectorAll('.review-card-img'));
                    const images = thumbnails.map(img => img.src);
                    const index = thumbnails.indexOf(e.target);
                    openLightbox(images, index);
                }
            }
        });

        // Close click
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Backdrop click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Prev/Next clicks
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage((currentImgIndex - 1 + currentImages.length) % currentImages.length);
        });
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage((currentImgIndex + 1) % currentImages.length);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showImage((currentImgIndex - 1 + currentImages.length) % currentImages.length);
            } else if (e.key === 'ArrowRight') {
                showImage((currentImgIndex + 1) % currentImages.length);
            }
        });
    }
});

