/**
 * components.js - TerraQuint
 * Centralized components for navbar, footer, and global UI elements
 * 
 * Features:
 * - Dynamic navbar injection (single source of truth)
 * - Dynamic footer injection (single source of truth)
 * - Back to top button with smooth scroll
 * - Active page highlighting in navbar
 * - Service link scroll-to functionality
 * - Hamburger mobile menu
 */

(function() {
    'use strict';
    
    // ============================================
    // NAVBAR COMPONENT (WITH HAMBURGER MENU)
    // ============================================
    
    function getNavbarHTML() {
        return `
            <nav class="navbar" aria-label="Main">
                <div class="container nav-container">
                    <a href="/" class="logo">
                        <span class="logo-terra">Terra</span><span class="logo-quint">Quint</span>
                    </a>
                    <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div class="nav-links" id="navLinks">
                        <a href="/" data-page="index">Home</a>
                        <a href="/services" data-page="services">Services</a>
                        <a href="/methodology" data-page="methodology">Methodology</a>
                        <a href="/about" data-page="about">About</a>
                        <a href="/insights" data-page="insights">Insights</a>
                        <a href="/videos" data-page="videos">Media</a>
                        <a href="/contact" data-page="contact" class="btn-outline">Get in touch</a>
                    </div>
                </div>
            </nav>
        `;
    }
    
    // ============================================
    // FOOTER COMPONENT (UPDATED with 6 service links)
    // ============================================
    
    function getFooterHTML() {
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        
                        <!-- COLUMN 1: LOGO & ADDRESS -->
                        <div class="footer-col">
                            <div class="footer-logo">TERRAQUINT</div>
                            <p class="footer-tagline">Petroleum Engineering Services<br>and Consultancy</p>
                            <p class="footer-locations"><svg class="i" aria-hidden="true"><use href="/assets/icons/sprite.svg#map-pin"></use></svg> Dallas · Midland · Houston · Tulsa</p>
                        </div>
                        
                        <!-- COLUMN 2: SERVICES (6 links with scroll-to functionality) -->
                        <div class="footer-col">
                            <h2 class="footer-heading">Services</h2>
                            <ul class="footer-links">
                                <li><a href="/services" class="footer-service-link" data-service="reservoir">Reservoir Simulation</a></li>
                                <li><a href="/services" class="footer-service-link" data-service="production">Production Optimization</a></li>
                                <li><a href="/services" class="footer-service-link" data-service="eor">Enhanced Oil Recovery (EOR)</a></li>
                                <li><a href="/services" class="footer-service-link" data-service="decline">Decline Curve Analysis</a></li>
                                <li><a href="/services" class="footer-service-link" data-service="flow">Flow Assurance</a></li>
                                <li><a href="/services" class="footer-service-link" data-service="economic">Economic Forecasting</a></li>
                            </ul>
                        </div>
                        
                        <!-- COLUMN 3: CONTACT -->
                        <div class="footer-col">
                            <h2 class="footer-heading">Contact</h2>
                            <ul class="footer-links">
                                <li><a href="mailto:afaqaslam@terraquint.com"><svg class="i" aria-hidden="true"><use href="/assets/icons/sprite.svg#mail"></use></svg> afaqaslam@terraquint.com</a></li>
                                <li><a href="tel:+19186252549"><svg class="i" aria-hidden="true"><use href="/assets/icons/sprite.svg#phone"></use></svg> +1 (918) 625-2549</a></li>
                                <li class="footer-social">
                                    <a href="https://www.linkedin.com/in/afaqaslam/" target="_blank" rel="noopener noreferrer"><svg class="i" aria-hidden="true"><use href="/assets/icons/sprite.svg#linkedin"></use></svg> LinkedIn</a> · 
                                    <a href="https://x.com/11Afaq" target="_blank" rel="noopener noreferrer"><svg class="i" aria-hidden="true"><use href="/assets/icons/sprite.svg#x-logo"></use></svg> X</a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    
                    <div class="footer-bottom">
                        <p>© <span id="current-year">2025</span> TerraQuint. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
    
    // ============================================
    // BACK TO TOP BUTTON COMPONENT
    // ============================================
    
    function getBackToTopHTML() {
        return `
            <button id="back-to-top" class="back-to-top" aria-label="Back to top">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
        `;
    }
    
    // ============================================
    // STYLES INJECTION
    // ============================================
    
    function injectBackToTopStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Back to Top Button */
            .back-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background-color: var(--accent, #0077B6);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 1000;
            }
            
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background-color: var(--accent-hover, #005f8c);
                transform: translateY(-3px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.25);
            }
            
            .back-to-top:active {
                transform: translateY(0);
            }
            
            @media (max-width: 768px) {
                .back-to-top {
                    bottom: 1.5rem;
                    right: 1.5rem;
                    width: 40px;
                    height: 40px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // BACK TO TOP FUNCTIONALITY
    // ============================================
    
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
        
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        window.addEventListener('scroll', toggleBackToTop);
        backToTopBtn.addEventListener('click', scrollToTop);
        toggleBackToTop();
    }
    
    // ============================================
    // PHONE ACTION BAR (Call · WhatsApp · Get in touch)
    // Shown only on screens up to 800px wide.
    // ============================================

    const TQ_PHONE = '+19186252549';
    const TQ_WHATSAPP = 'https://wa.me/19186252549?text=' + encodeURIComponent("Hi TerraQuint, I'd like to discuss a project.");

    function getActionBarHTML() {
        return `
            <nav class="tq-action-bar" aria-label="Quick contact">
                <a href="tel:${TQ_PHONE}" class="tq-act">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>Call</span>
                </a>
                <a href="${TQ_WHATSAPP}" class="tq-act" target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41"/></svg>
                    <span>WhatsApp</span>
                </a>
                <a href="/contact#enquiry" class="tq-act tq-act-main">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span>Get in touch</span>
                </a>
            </nav>
        `;
    }

    function injectActionBarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .tq-action-bar { display: none; }
            @media (max-width: 900px) {
                .tq-action-bar {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1.3fr;
                    position: fixed;
                    left: 0; right: 0; bottom: 0;
                    z-index: 90;               /* below the open mobile menu */
                    background: #111111;
                    border-top: 1px solid #2a2a2a;
                    padding: 0.45rem 0.5rem calc(0.45rem + env(safe-area-inset-bottom));
                    gap: 0.4rem;
                }
                .tq-act {
                    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
                    color: #ffffff; text-decoration: none;
                    font-size: 0.85rem; font-weight: 600;
                    padding: 0.6rem 0.25rem; border-radius: 10px;
                }
                .tq-act:active { background: #222; }
                .tq-act-main { background: var(--accent, #0077B6); }
                .tq-act-main:active { background: var(--accent-hover, #005f8c); }
                body { padding-bottom: calc(3.6rem + env(safe-area-inset-bottom)); }
                .back-to-top { bottom: calc(4.6rem + env(safe-area-inset-bottom)) !important; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // ARTICLE "GET IN TOUCH" BOX FALLBACK
    // If a new article's box was left blank or still has [placeholders],
    // show the standard text (GitHub also writes this into the file).
    // ============================================

    function fillArticleCta() {
        const box = document.querySelector('.article-cta');
        if (!box) return;
        const unfilled = (t) => !t || !t.trim() || /\[[^\]]*\]/.test(t);
        const h3 = box.querySelector('h3');
        const p = box.querySelector('p');
        const a = box.querySelector('a');
        if (h3 && unfilled(h3.textContent)) h3.textContent = 'Have a similar challenge?';
        if (p && unfilled(p.textContent)) p.textContent = 'Get in touch for a free initial assessment call.';
        if (a) {
            const svc = new URL(a.href, location.href).searchParams.get('service');
            if (svc !== null && unfilled(svc)) a.setAttribute('href', '/contact#enquiry');
        }
    }

    // Same idea for a new article's header and browser title, until GitHub fills them in
    function fillArticleMeta() {
        const header = document.querySelector('.article-header');
        if (!header) return;
        const unfilled = (t) => !t || !t.trim() || /\[[^\]]*\]/.test(t);
        const h1 = header.querySelector('h1');
        if (h1 && !unfilled(h1.textContent) && unfilled(document.title)) document.title = h1.textContent.trim() + ' | TerraQuint';
        const dateEl = header.querySelector('.article-meta span:nth-child(2)');
        const pub = (document.querySelector('meta[property="article:published_time"]') || {}).content || '';
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(pub);
        if (dateEl && m && unfilled(dateEl.textContent)) {
            const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            dateEl.lastChild.textContent = ' ' + months[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1];
        }
        const readEl = header.querySelector('.article-meta span:nth-child(3)');
        const body = document.querySelector('.article-content');
        if (readEl && body && unfilled(readEl.textContent)) {
            const words = body.textContent.split(/\s+/).filter(Boolean).length;
            readEl.lastChild.textContent = ' ' + Math.max(1, Math.round(words / 130)) + ' min read';
        }
    }

    // ============================================
    // ACTIVE PAGE HIGHLIGHTING
    // ============================================
    
    function highlightActivePage() {
        // Works with clean URLs (/services) and old ones (/services.html)
        const norm = (p) => {
            const seg = p.split('?')[0].split('#')[0].replace(/\/+$/, '').split('/').pop().replace(/\.html$/, '');
            return seg === '' || seg === 'index' ? 'index' : seg;
        };
        const path = window.location.pathname;
        // article pages highlight "Insights"
        const currentPage = path.includes('/articles/') ? 'insights' : norm(path);
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const cleanHref = norm(href);
            if (cleanHref === currentPage) {
                link.style.color = 'var(--accent-on-dark, #6EB2FA)';
                if (link.classList.contains('btn-outline')) {
                    link.style.borderColor = 'var(--accent-on-dark, #6EB2FA)';
                }
            }
        });
    }
    
    // ============================================
    // DYNAMIC YEAR UPDATE
    // ============================================
    
    function updateCopyrightYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // ============================================
    // SERVICE LINK SCROLL FUNCTIONALITY (UPDATED for 6 services)
    // ============================================
    
    function initServiceScrollLinks() {
        // Wait for footer to be injected into DOM
        setTimeout(() => {
            const serviceLinks = document.querySelectorAll('.footer-service-link');
            
            serviceLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const serviceId = this.getAttribute('data-service');
                    const targetUrl = this.getAttribute('href');
                    
                    // Store which service to scroll to in sessionStorage
                    sessionStorage.setItem('scrollToService', serviceId);
                    
                    // Navigate to services page
                    window.location.href = targetUrl;
                });
            });
            
            // Check if we need to scroll to a service after page loads
            const scrollToService = sessionStorage.getItem('scrollToService');
            if (scrollToService) {
                sessionStorage.removeItem('scrollToService');
                
                // Wait for page to fully load
                setTimeout(() => {
                    let targetId = '';
                    switch(scrollToService) {
                        case 'reservoir':
                            targetId = 'reservoir';
                            break;
                        case 'production':
                            targetId = 'production';
                            break;
                        case 'eor':
                            targetId = 'eor';
                            break;
                        case 'decline':
                            targetId = 'decline';
                            break;
                        case 'flow':
                            targetId = 'flow';
                            break;
                        case 'economic':
                            targetId = 'economic';
                            break;
                        default:
                            targetId = 'servicesSection';
                    }
                    
                    // Find the element and scroll to it
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const offset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback: scroll to services section
                        const servicesSection = document.getElementById('servicesSection');
                        if (servicesSection) {
                            const offset = 80;
                            const elementPosition = servicesSection.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                    }
                }, 500);
            }
        }, 300);
    }
    
    // ============================================
    // HAMBURGER MENU FUNCTIONALITY
    // ============================================
    
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburgerBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (!hamburger || !navLinks) return;

        const setOpen = (open) => {
            navLinks.classList.toggle('active', open);
            hamburger.classList.toggle('active', open);
            document.body.classList.toggle('menu-open', open);
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };
        
        hamburger.addEventListener('click', () => {
            const open = !navLinks.classList.contains('active');
            setOpen(open);
            // move keyboard focus into the menu once it has slid in
            if (open) setTimeout(() => { const first = navLinks.querySelector('a'); if (first) first.focus({ preventScroll: true }); }, 320);
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setOpen(false));
        });

        // Esc closes the menu and returns focus to the button
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                setOpen(false);
                hamburger.focus();
            }
        });
    }

    // ============================================
    // SKIP LINK + MAIN CONTENT LANDMARK
    // ============================================

    function initSkipLink() {
        let main = document.querySelector('main');
        if (!main) return;
        if (!main.id) main.id = 'main';
        main.setAttribute('tabindex', '-1');
        const skip = document.createElement('a');
        skip.className = 'skip-link';
        skip.href = '#' + main.id;
        skip.textContent = 'Skip to content';
        document.body.insertBefore(skip, document.body.firstChild);
    }
    
    // ============================================
    // LOAD ALL COMPONENTS
    // ============================================
    
    function loadComponents() {
        // Inject Back to Top styles
        injectBackToTopStyles();
        
        // Load Navbar
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = getNavbarHTML();
        } else {
            const existingNav = document.querySelector('.navbar');
            if (existingNav && existingNav.parentNode) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = getNavbarHTML();
                const newNav = tempDiv.firstElementChild;
                existingNav.parentNode.replaceChild(newNav, existingNav);
            }
        }
        
        // Load Footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = getFooterHTML();
        } else {
            // Fallback: If no placeholder, try to replace existing footer
            const existingFooter = document.querySelector('.footer');
            if (existingFooter && existingFooter.parentNode) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = getFooterHTML();
                const newFooter = tempDiv.firstElementChild;
                existingFooter.parentNode.replaceChild(newFooter, existingFooter);
            }
        }
        
        // Load Back to Top button
        const backToTopPlaceholder = document.getElementById('back-to-top-placeholder');
        if (backToTopPlaceholder) {
            backToTopPlaceholder.innerHTML = getBackToTopHTML();
        } else {
            const body = document.body;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = getBackToTopHTML();
            const backToTopBtn = tempDiv.firstElementChild;
            if (backToTopBtn) {
                body.appendChild(backToTopBtn);
            }
        }
        
        // Phone action bar
        injectActionBarStyles();
        const barWrap = document.createElement('div');
        barWrap.innerHTML = getActionBarHTML();
        document.body.appendChild(barWrap.firstElementChild);

        // Initialize all features
        initBackToTop();
        fillArticleCta();
        fillArticleMeta();
        highlightActivePage();
        updateCopyrightYear();
        initServiceScrollLinks();
        initMobileMenu();
        initSkipLink();
    }
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }
    
})();
