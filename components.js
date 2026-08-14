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
            <nav class="navbar">
                <div class="container nav-container">
                    <a href="../index.html" class="logo">
                        <span class="logo-terra">Terra</span><span class="logo-quint">Quint</span>
                    </a>
                    <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div class="nav-links" id="navLinks">
                        <a href="../index.html" data-page="index">Home</a>
                        <a href="../services.html" data-page="services">Services</a>
                        <a href="../methodology.html" data-page="methodology">Methodology</a>
                        <a href="../about.html" data-page="about">About</a>
                        <a href="../insights.html" data-page="insights">Insights</a>
                        <a href="../videos.html" data-page="videos">Media</a>
                        <a href="../contact.html" data-page="contact" class="btn-outline">Contact</a>
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
                            <p class="footer-locations">📍 Dallas · Midland · Houston · Tulsa</p>
                        </div>
                        
                        <!-- COLUMN 2: SERVICES (6 links with scroll-to functionality) -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Services</h4>
                            <ul class="footer-links">
                                <li><a href="../services.html" class="footer-service-link" data-service="reservoir">Reservoir Simulation</a></li>
                                <li><a href="../services.html" class="footer-service-link" data-service="production">Production Optimization</a></li>
                                <li><a href="../services.html" class="footer-service-link" data-service="eor">Enhanced Oil Recovery (EOR)</a></li>
                                <li><a href="../services.html" class="footer-service-link" data-service="decline">Decline Curve Analysis</a></li>
                                <li><a href="../services.html" class="footer-service-link" data-service="flow">Flow Assurance</a></li>
                                <li><a href="../services.html" class="footer-service-link" data-service="economic">Economic Forecasting</a></li>
                            </ul>
                        </div>
                        
                        <!-- COLUMN 3: CONTACT -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Contact</h4>
                            <ul class="footer-links">
                                <li><a href="mailto:afaqaslam@terraquint.com">✉️ afaqaslam@terraquint.com</a></li>
                                <li><a href="tel:+19186252549">📞 +1 918 625 2549</a></li>
                                <li class="footer-social">
                                    <a href="https://www.linkedin.com/in/afaqaslam/" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a> · 
                                    <a href="https://x.com/11Afaq" target="_blank" rel="noopener noreferrer">𝕏 Twitter</a>
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
    // ACTIVE PAGE HIGHLIGHTING
    // ============================================
    
    function highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const cleanHref = href.split('?')[0].split('#')[0].split('/').pop();
            if (cleanHref === currentPage) {
                link.style.color = 'var(--accent, #0077B6)';
                if (link.classList.contains('btn-outline')) {
                    link.style.borderColor = 'var(--accent, #0077B6)';
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
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
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
        
        // Initialize all features
        initBackToTop();
        highlightActivePage();
        updateCopyrightYear();
        initServiceScrollLinks();
        initMobileMenu();
    }
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }
    
})();
