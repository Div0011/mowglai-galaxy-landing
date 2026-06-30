/**
 * Mowglai Neobrutalist Campaign Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initLogoAnimation(); // runs first — cinematic logo intro
    initMobileNav();
    initSliders();
    initFAQAccordion();
    initBackToTop();
    initFormHandler();
    initChatbotWidget();
    initJungleInteractions(); // living webpage animations & triggers
    initScrollObserver(); // scroll reveals & drawing arrows & counters
});

/**
 * 1. Cinematic Mowglai Logo Intro Animation
 *    Sequence:
 *      Phase 1 (0.0s - 1.0s)  : Big icon scales in on white overlay
 *      Phase 2 (1.0s - 1.6s)  : Overlay fades, icon flies from center → header 'A' slot
 *      Phase 3 (1.6s - 2.4s)  : Icon sits in header, then spins/shrinks away
 *      Phase 4 (2.4s - 2.8s)  : Real 'A' letter fades in — MOWGLAI complete
 */
function initLogoAnimation() {
    const overlay   = document.getElementById('logo-intro-overlay');
    const introIcon = document.getElementById('intro-logo-icon');
    const aSlot     = document.getElementById('logo-a-slot');
    const body      = document.body;

    if (!overlay || !aSlot || !introIcon) {
        // If not found, skip overlay lock immediately
        if (overlay) overlay.style.display = 'none';
        body.classList.remove('intro-running');
        return;
    }

    // Hide header icon initially (will fly in later)
    aSlot.classList.remove('show-icon', 'show-letter');
    aSlot.style.opacity = '0';

    // ── Phase 1: Icon reveal on overlay (CSS animation already fires) ──────
    // Wait for intro animation to finish (0.9s), then hold briefly (0.7s)
    setTimeout(() => {

        // ── Phase 2: Fade out overlay, fly icon to header ─────────────────
        overlay.classList.add('hidden-overlay'); // fade the white bg

        // Get position of the 'A' slot in the header
        const slotRect   = aSlot.getBoundingClientRect();
        const iconRect   = introIcon.getBoundingClientRect();

        // Compute transform needed to move icon from center to header slot
        const dx = slotRect.left + slotRect.width / 2 - (iconRect.left + iconRect.width / 2);
        const dy = slotRect.top  + slotRect.height / 2 - (iconRect.top  + iconRect.height / 2);
        const scaleTarget = slotRect.width / iconRect.width;

        // Fly the intro icon to header position
        introIcon.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease';
        introIcon.style.transform  = `translate(${dx}px, ${dy}px) scale(${scaleTarget})`;
        introIcon.style.opacity    = '0';

        // Simultaneously reveal the header slot icon
        setTimeout(() => {
            aSlot.style.opacity = '1';
            aSlot.classList.add('fly-in', 'show-icon');

            // ── Phase 3: Hold, then exit icon and reveal 'A' letter ───────
            setTimeout(() => {
                // Remove fly-in animation class, add exit transition
                aSlot.classList.remove('fly-in');

                setTimeout(() => {
                    // ── Phase 4: Switch from icon to letter ───────────────
                    aSlot.classList.remove('show-icon');
                    aSlot.classList.add('show-letter');

                    // Fully hide overlay + unlock body scroll
                    overlay.style.display = 'none';
                    body.classList.remove('intro-running');
                }, 350);

            }, 600); // hold time

        }, 300); // slight delay so overlay fade starts first

    }, 1600); // total intro hold = 0.9s anim + 0.7s pause
}

/**
 * 2. Mobile Navigation Menu Toggle
 */
function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.remove('hidden');
        // Force reflow
        mobileMenu.offsetHeight;
        document.body.classList.add('nav-active');
    }

    function closeMenu() {
        document.body.classList.remove('nav-active');
        setTimeout(() => {
            if (!document.body.classList.contains('nav-active')) {
                mobileMenu.classList.add('hidden');
            }
        }, 300);
    }

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking links
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside menu drawer
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-active') && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
            closeMenu();
        }
    });
}

/**
 * 3. Slick Sliders Configuration (Testimonials & Mobile Process Steps)
 */
function initSliders() {
    // Process steps carousel (Only on mobile width if requested, otherwise we use standard slick selector)
    if (typeof $.fn.slick !== 'undefined' && $('#process .slider').length) {
        $('#process .slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false,
            dots: true,
            adaptiveHeight: true
        });
    }

    // Testimonial slider
    if (typeof $.fn.slick !== 'undefined' && $('.about-customers .slider').length) {
        $('.about-customers .slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            arrows: false,
            dots: true
        });
    }
}

/**
 * 4. FAQ Accordion Expanding Handler
 */
function initFAQAccordion() {
    const faqHeaders = document.querySelectorAll('.faq-item .h4');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqItem = header.parentElement;
            const paragraph = faqItem.querySelector('p');
            const isActive = faqItem.classList.contains('active');

            if (isActive) {
                faqItem.classList.remove('active');
                paragraph.classList.add('hidden');
            } else {
                // Close other items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const p = item.querySelector('p');
                    if (p) p.classList.add('hidden');
                });
                faqItem.classList.add('active');
                paragraph.classList.remove('hidden');
            }
        });
    });
}

/**
 * 5. Back To Top Visibility & Scrolling Handler
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 6. Consultation Audit Form Handler
 */
function initFormHandler() {
    const form = document.getElementById('audit-form');
    const formContainer = document.getElementById('form-container');
    const successContainer = document.getElementById('success-container');
    
    if (!form || !formContainer || !successContainer) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('[name="name"]');
        const emailInput = form.querySelector('[name="email"]');
        
        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            alert('Please enter your name and email address.');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing blueprint...
        `;

        // Simulate API call
        setTimeout(() => {
            formContainer.classList.add('transition-all', 'duration-500', 'opacity-0', 'scale-95');
            setTimeout(() => {
                formContainer.classList.add('hidden');
                successContainer.classList.remove('hidden');
                successContainer.classList.add('transition-all', 'duration-500', 'opacity-100', 'scale-100');
            }, 500);
        }, 1800);
    });
}

/**
 * 7. Mowglai Guardian AI Chatbot Widget (Neobrutalist styling matches style.css)
 */
function initChatbotWidget() {
    const container = document.getElementById('chatbot-container');
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const modal = document.getElementById('chatbot-modal');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const messagesContainer = document.getElementById('chatbot-messages');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');

    if (!container || !toggleBtn || !modal || !closeBtn || !messagesContainer || !form || !input) return;

    let isModalOpen = false;
    let messages = [];
    let draftStep = 'none'; // 'none' | 'service' | 'details'
    let draftData = { service: '', details: '' };

    // Knowledge Bases
    const SUPPORTED_SERVICES = {
        web_design: ['web design', 'ui', 'ux', 'website', 'interface', 'landing', 'store', 'shop', 'blog', 'site', 'redesign', 'revamp', 'visuals', 'looks'],
        development: ['development', 'code', 'react', 'api', 'backend', 'frontend', 'software', 'app', 'application', 'engineering', 'cms', 'wordpress', 'shopify', 'tech', 'stack', 'nextjs', 'typescript'],
        strategy: ['strategy', 'seo', 'marketing', 'growth', 'analysis', 'competitor', 'content', 'brand', 'identity', 'logo', 'positioning'],
        database: ['database', 'data', 'cloud', 'migration', 'security', 'sql', 'nosql', 'server', 'hosting', 'supabase'],
        investment: ['price', 'cost', 'plan', 'quote', 'money', 'budget', 'expensive', 'cheap', 'package', 'pricing', 'investment', 'billing', 'payment', 'terms'],
        about: ['about', 'mowglai', 'who are you', 'company', 'agency', 'team', 'mission', 'vision', 'what do you do', 'founder', 'history'],
        contact: ['contact', 'email', 'phone', 'call', 'reach', 'address', 'support', 'help', 'location', 'office', 'based', 'where'],
        social: ['social', 'instagram', 'twitter', 'linkedin', 'facebook', 'media', 'community']
    };

    const FAQ_KNOWLEDGE_BASE = [
        {
            keywords: ['location', 'where are you', 'located', 'office', 'based', 'city', 'country'],
            response: "Mowglai operates globally with command centers in Noida (India), London, and Singapore. We work across time zones to ensure continuous delivery.",
            options: [{ label: "Contact Us", path: "#audit" }]
        },
        {
            keywords: ['turnaround', 'how long', 'duration', 'time', 'timeline', 'weeks', 'days'],
            response: "Project timelines vary by complexity. A 'Basic' single-page site typically launches in 5-7 days, while 'Advanced' sites take 10-14 days. 'Epic' enterprise solutions follow a custom roadmap.",
            options: [{ label: "View Process", path: "/mowglai-brochure.html", external: true }]
        },
        {
            keywords: ['ecommerce', 'shop', 'store', 'selling', 'products', 'shopify', 'woocommerce'],
            response: "Yes, we build high-performance e-commerce platforms. We ensure secure payment gateways, inventory management, and seamless user checkouts.",
            options: [{ label: "View Services", path: "#services" }]
        },
        {
            keywords: ['brochure', 'download', 'pdf', 'catalog', 'deck'],
            response: "You can download our detailed brochure to explore our full capabilities and success stories.",
            options: [{ label: "Open Brochure", path: "/mowglai-brochure.html", external: true }]
        },
        {
            keywords: ['technology', 'stack', 'tech', 'react', 'nextjs', 'typescript', 'framework'],
            response: "We exclusively use the 2025 Tech Stack: React, Next.js, TypeScript, Tailwind CSS, and Supabase. This ensures your digital asset is fast, secure, and future-proof.",
            options: [{ label: "Explore DNA", path: "/our-dna" }]
        },
        {
            keywords: ['guarantee', 'warranty', 'support', 'maintenance', 'fix'],
            response: "We provide 30 days of post-launch support for bug fixes and minor tweaks. Ongoing maintenance packages are available for long-term peace of mind.",
            options: [{ label: "Contact Support", path: "#audit" }]
        }
    ];

    const FUTURE_SERVICES = [
        'blockchain', 'crypto', 'nft', 'web3', 'vr', 'ar', 'metaverse',
        'video editing', 'video production', 'photography', 'social media management',
        'iot', 'hardware', 'training', 'courses', 'tutorial'
    ];

    let isTyping = false;

    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        
        const indicator = document.createElement('div');
        indicator.id = 'chatbot-typing-indicator';
        indicator.className = 'chat-message mr-auto flex items-center gap-1.5 p-4 bg-white border-3 border-black rounded-2xl rounded-tl-sm max-w-[85%] mb-4 shadow-[-3px_3px_0px_#000000]';
        
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        messagesContainer.appendChild(indicator);
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }

    function hideTypingIndicator() {
        if (!isTyping) return;
        isTyping = false;
        const indicator = document.getElementById('chatbot-typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function simulateTyping(callback) {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            callback();
        }, 1000);
    }

    function updatePlaceholder() {
        if (draftStep !== 'none') {
            input.placeholder = "Enter details...";
        } else {
            input.placeholder = "Ask about plans, services...";
        }
    }

    function addMessage(text, sender, options = null) {
        const messageId = 'msg-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        
        const isUser = sender === 'user';
        const outerDiv = document.createElement('div');
        outerDiv.className = `chat-message flex flex-col max-w-[85%] mb-4 ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`;
        outerDiv.id = messageId;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = `p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap border-3 border-black shadow-sm ${
            isUser 
                ? 'bg-[#675AF7] text-white rounded-tr-sm font-semibold shadow-[3px_3px_0px_#000000]' 
                : 'bg-white text-black rounded-tl-sm shadow-[-3px_3px_0px_#000000]'
        }`;
        bubbleDiv.textContent = text;
        outerDiv.appendChild(bubbleDiv);

        if (options && options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'mt-3 flex flex-wrap gap-2 options-container';
            
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'px-4 py-2 border-3 border-black bg-white text-xs font-bold text-black rounded-lg transition-all duration-200 shadow-[2px_2px_0px_#000000] focus:outline-none';
                btn.textContent = opt.label;

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    optionsContainer.style.pointerEvents = 'none';
                    optionsContainer.style.opacity = '0.5';
                    
                    if (opt.action) {
                        opt.action();
                    } else if (opt.path) {
                        if (opt.external) {
                            window.open(opt.path, '_blank');
                        } else {
                            closeModal();
                            if (opt.path.startsWith('#')) {
                                const target = document.querySelector(opt.path);
                                if (target) {
                                    target.scrollIntoView({ behavior: 'smooth' });
                                }
                            } else {
                                window.location.href = opt.path;
                            }
                        }
                    }
                });
                
                optionsContainer.appendChild(btn);
            });
            
            outerDiv.appendChild(optionsContainer);
        }

        const labelSpan = document.createElement('span');
        labelSpan.className = 'text-[9px] text-gray-500 mt-1 uppercase tracking-wider font-semibold';
        labelSpan.textContent = isUser ? 'You' : 'Guardian AI';
        outerDiv.appendChild(labelSpan);

        messagesContainer.appendChild(outerDiv);

        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }

    function startDrafting() {
        draftStep = 'service';
        draftData = { service: '', details: '' };
        updatePlaceholder();
        addMessage("Initiating Protocol: Project Request Dossier.", 'bot');
        simulateTyping(() => {
            addMessage("First, what kind of service do you require? (e.g., Web Design, Development, SEO/AEO, Full Redesign)", 'bot', [
                { label: "Web Design", action: () => handleDraftInput("Web Design") },
                { label: "Development", action: () => handleDraftInput("Development") },
                { label: "Full Custom Project", action: () => handleDraftInput("Full Custom Project") }
            ]);
        });
    }

    function handleDraftInput(text) {
        addMessage(text, 'user');

        if (draftStep === 'service') {
            draftData.service = text;
            draftStep = 'details';
            updatePlaceholder();
            simulateTyping(() => {
                addMessage(`Understood: ${text}. Now, please describe your requirements, goals, or any specific features you need. The more details, the more accurate our initial assessment will be.`, 'bot');
            });
        }
        else if (draftStep === 'details') {
            draftData.details = text;
            draftStep = 'none';
            updatePlaceholder();

            simulateTyping(() => {
                const mailSubject = `New Project Request: ${draftData.service}`;
                const mailBody = `Service Requested: ${draftData.service}\n\nProject Details:\n${text}`;
                const mailToLink = `mailto:info@mowglai.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

                addMessage("I have compiled your request dossier. You can now transmit this directly to our command center.", 'bot');
                addMessage(`Summary:\nService: ${draftData.service}\nDetails: ${text}`, 'bot', [
                    { label: "Send Request via Email", action: () => { window.location.href = mailToLink; } },
                    { label: "Restart", action: () => startDrafting() }
                ]);
            });
        }
    }

    function processInput(inputVal) {
        if (!inputVal.trim()) return;

        if (draftStep !== 'none') {
            handleDraftInput(inputVal);
            return;
        }

        addMessage(inputVal, 'user');
        const lowerInput = inputVal.toLowerCase();

        simulateTyping(() => {
            // Check for specific plans
            if (lowerInput.includes('basic') || lowerInput.includes('advanced') || lowerInput.includes('epic')) {
                let plan = '';
                if (lowerInput.includes('basic')) plan = 'BASIC';
                else if (lowerInput.includes('advanced')) plan = 'ADVANCED';
                else if (lowerInput.includes('epic')) plan = 'EPIC';
                
                let text = "";
                if (plan === "BASIC") text = "Excellent. The BASIC plan ($199) is perfect for startups needing a single-page powerhouse to establish a footprint.";
                if (plan === "ADVANCED") text = "A wise choice. The ADVANCED plan ($349) offers multi-page depth, analytics, and enhanced SEO/AEO for growing brands.";
                if (plan === "EPIC") text = "The EPIC plan ($599) provides custom-engineered digital ecosystems and unlimited scalability for market leaders.";

                addMessage(text, 'bot', [
                    { label: "View Details & Pricing", path: "#pricing" },
                    { label: "Request This Plan", path: "#audit" }
                ]);
                return;
            }

            // Priority Check: "Write request", "Hire", "Project"
            if (lowerInput.includes('hire') || lowerInput.includes('project') || lowerInput.includes('request') || lowerInput.includes('proposal')) {
                startDrafting();
                return;
            }

            // FAQ check
            const faqMatch = FAQ_KNOWLEDGE_BASE.find(item => item.keywords.some(k => lowerInput.includes(k)));
            if (faqMatch) {
                const opts = faqMatch.options ? faqMatch.options.map(opt => ({
                    label: opt.label,
                    path: opt.path,
                    external: opt.external || false
                })) : null;

                addMessage(faqMatch.response, 'bot', opts);
                return;
            }

            // Future/Unsupported Services check
            const futureMatch = FUTURE_SERVICES.find(keyword => lowerInput.includes(keyword));
            if (futureMatch) {
                addMessage(`That is an ambitious frontier! While we are currently focused on core web technologies, our labs are in the process of upgrading our capabilities to include ${futureMatch.toUpperCase()}.`, 'bot');
                addMessage("Would you like to explore our current high-performance solutions or join our waitlist for future tech?", 'bot', [
                    { label: "Explore Current Services", path: "#services" },
                    { label: "Contact for Waitlist", path: "#audit" }
                ]);
                return;
            }

            // Supported Services & Intents check
            let matchType = '';
            if (SUPPORTED_SERVICES.web_design.some(k => lowerInput.includes(k))) matchType = 'design';
            else if (SUPPORTED_SERVICES.development.some(k => lowerInput.includes(k))) matchType = 'dev';
            else if (SUPPORTED_SERVICES.strategy.some(k => lowerInput.includes(k))) matchType = 'strat';
            else if (SUPPORTED_SERVICES.database.some(k => lowerInput.includes(k))) matchType = 'data';
            else if (SUPPORTED_SERVICES.investment.some(k => lowerInput.includes(k))) matchType = 'price';
            else if (SUPPORTED_SERVICES.about.some(k => lowerInput.includes(k))) matchType = 'about';
            else if (SUPPORTED_SERVICES.contact.some(k => lowerInput.includes(k))) matchType = 'contact';
            else if (SUPPORTED_SERVICES.social.some(k => lowerInput.includes(k))) matchType = 'social';

            // Responses based on match
            if (matchType === 'design') {
                addMessage("Aesthetic excellence is our specialty. We craft visually stunning, responsive interfaces that merge art with precision.", 'bot', [
                    { label: "See Design Services", path: "#services" },
                    { label: "View Portfolio", path: "#portfolio" }
                ]);
            } else if (matchType === 'dev') {
                addMessage("Robust engineering is in our DNA. Whether it's a complex web app, CMS, or API integration, we build for scale and security.", 'bot', [
                    { label: "View Dev Solutions", path: "#services" },
                    { label: "Start a Project", path: "#audit" }
                ]);
            } else if (matchType === 'strat') {
                addMessage("Growth requires map-making. Our strategy team assists with SEO, Content Curation, and Market Analysis to position your brand globally.", 'bot', [
                    { label: "Explore Strategy", path: "#services" }
                ]);
            } else if (matchType === 'data') {
                addMessage("Data is the lifeblood of modern business. We design secure, high-performance database architectures and cloud solutions.", 'bot', [
                    { label: "Data Services", path: "#services" }
                ]);
            } else if (matchType === 'price') {
                addMessage("Financial clarity is key. We offer transparent investment plans: Basic, Advanced, and Epic, tailored to your growth stage.", 'bot', [
                    { label: "View Investment Plans", path: "#pricing" }
                ]);
            } else if (matchType === 'about') {
                addMessage("Mowglai is a global collective of Digital Artisans. We operate Monday to Saturday across multiple time zones, ensuring we align perfectly with your schedule.", 'bot');
                setTimeout(() => {
                    simulateTyping(() => {
                        addMessage("Our philosophy is 'Growth in the Wild'—combining rapid Adaptation with resilient Survival strategies. We have delivered 100+ projects in 15+ countries.", 'bot', [
                            { label: "Read Our DNA", path: "/our-dna" },
                            { label: "Meet the Team", path: "/about" }
                        ]);
                    });
                }, 500);
            } else if (matchType === 'contact') {
                addMessage("Communication is the first step to evolution. You can reach our command center directly via email or through our social channels.", 'bot', [
                    { label: "Audit Consultation", path: "#audit" },
                    { label: "Email: info@mowglai.com", path: "mailto:info@mowglai.com" }
                ]);
            } else if (matchType === 'social') {
                addMessage("Join our tribe in the digital wild. Follow us for updates, insights, and success stories.", 'bot', [
                    { label: "Instagram", path: "https://www.instagram.com/mowglai_", external: true },
                    { label: "LinkedIn", path: "https://linkedin.com/company/mowglai", external: true },
                    { label: "X", path: "https://x.com/mowglai_in", external: true }
                ]);
            } else {
                addMessage("I am processing your signal. While I didn't catch a specific service request, our team can likely assist. We specialize in Web Design, Development, and Digital Strategy.", 'bot', [
                    { label: "Start a Project Request", action: () => startDrafting() },
                    { label: "View All Services", path: "#services" },
                    { label: "Contact Human Command", path: "#audit" }
                ]);
            }
        });
    }

    function openModal() {
        isModalOpen = true;
        modal.classList.remove('hidden');
        modal.offsetHeight; // force reflow
        modal.classList.remove('opacity-0', 'translate-y-4');
        modal.classList.add('opacity-100', 'translate-y-0');

        if (messages.length === 0) {
            simulateTyping(() => {
                addMessage(
                    "Greetings, traveler. I am the Mowglai Guardian. I can guide you to the perfect digital solution. Tell me, what are you looking to build or achieve?", 
                    'bot', 
                    [
                        { label: "I need a Website", action: () => processInput("I need a Website") },
                        { label: "Start a Project Request", action: () => startDrafting() },
                        { label: "View Pricing", action: () => processInput("View Pricing") }
                    ]
                );
            });
        }
    }

    function closeModal() {
        isModalOpen = false;
        modal.classList.remove('opacity-100', 'translate-y-0');
        modal.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
            if (!isModalOpen) {
                modal.classList.add('hidden');
            }
        }, 300);
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isModalOpen) {
            closeModal();
        } else {
            openModal();
        }
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    document.addEventListener('click', (e) => {
        if (isModalOpen && !container.contains(e.target)) {
            closeModal();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        processInput(text);
    });
}

/**
 * 8. Jungle Animals & Interactive Webpage Actions
 */
function initJungleInteractions() {
    const canvas = document.getElementById('jungle-canvas');
    if (!canvas) return;

    // Helper: Show speech bubble from animal
    function showSpeech(animalEl, text) {
        // Remove existing bubble for this animal
        const existing = document.getElementById(animalEl.id + '-bubble');
        if (existing) existing.remove();

        const rect = animalEl.getBoundingClientRect();
        const bubble = document.createElement('div');
        bubble.id = animalEl.id + '-bubble';
        bubble.className = 'jungle-bubble handwritten';
        bubble.textContent = text;
        
        // Position relative to viewport coordinates
        bubble.style.position = 'fixed';
        bubble.style.left = (rect.left + rect.width / 2 - 75) + 'px';
        bubble.style.top = (rect.top - 45) + 'px';

        document.body.appendChild(bubble);
        
        // Trigger show animation
        setTimeout(() => bubble.classList.add('show'), 50);

        // Hide after 3s
        setTimeout(() => {
            bubble.classList.remove('show');
            setTimeout(() => bubble.remove(), 300);
        }, 3000);
    }

    // ── PARROT ACTION ──
    const parrot = document.getElementById('parrot-svg');
    if (parrot) {
        parrot.addEventListener('click', () => {
            parrot.classList.add('parrot-fly');
            showSpeech(parrot, "Next.js sites loaded in 0.3s! 🦜");
            setTimeout(() => {
                parrot.classList.remove('parrot-fly');
            }, 4000);
        });
    }

    // ── MONKEY ACTION ──
    const monkey = document.getElementById('monkey-svg');
    if (monkey) {
        monkey.addEventListener('click', () => {
            monkey.classList.add('monkey-active');
            showSpeech(monkey, "Don't monkey with slow code! 🐒");
            setTimeout(() => {
                monkey.classList.remove('monkey-active');
            }, 3000);
        });
    }

    // ── SNAKE ACTION ──
    const snake = document.getElementById('snake-svg');
    if (snake) {
        snake.addEventListener('click', () => {
            snake.classList.add('snake-active');
            showSpeech(snake, "Ssscale with AI automations! 🐍");
            setTimeout(() => {
                snake.classList.remove('snake-active');
            }, 2400);
        });
    }

    // ── TIGER ACTION ──
    const tiger = document.getElementById('tiger-svg');
    if (tiger) {
        tiger.addEventListener('click', () => {
            showSpeech(tiger, "Grow wild with Mowglai! 🐅");
        });
    }

    // ── BUTTERFLY ACTION ──
    const bf = document.getElementById('butterfly1');
    if (bf) {
        bf.addEventListener('click', () => {
            showSpeech(bf, "Pixel perfect visually! 🦋");
        });
    }

    // ── GENERATE FIREFLIES ──
    function createFirefly() {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = Math.random() * 100 + 'vh';
        
        // Random float distances
        const fx = (Math.random() - 0.5) * 160;
        const fy = (Math.random() - 0.5) * 160;
        firefly.style.setProperty('--fx', fx + 'px');
        firefly.style.setProperty('--fy', fy + 'px');
        
        // Random duration
        const duration = 6 + Math.random() * 8;
        firefly.style.animationDuration = duration + 's';
        
        canvas.appendChild(firefly);
        
        // Remove after anim
        setTimeout(() => {
            firefly.remove();
        }, duration * 1000);
    }
    
    // Spawn fireflies periodically
    for(let i=0; i<15; i++) {
        setTimeout(createFirefly, Math.random() * 5000);
    }
    setInterval(createFirefly, 1200);

    // ── GENERATE FALLING LEAVES ──
    const leavesContainer = document.getElementById('leaves-container');
    const leafColors = ['#10b981', '#059669', '#34d399', '#a7f3d0'];
    
    function createLeaf() {
        if (!leavesContainer) return;
        const leaf = document.createElement('div');
        leaf.className = 'jungle-leaf';
        leaf.style.left = Math.random() * 100 + 'vw';
        
        // Random leaf size
        const size = 12 + Math.random() * 14;
        
        // Random color HSL or Green variants
        const color = leafColors[Math.floor(Math.random() * leafColors.length)];
        
        leaf.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22C6 18 10 16 16 16C19 16 22 13 22 10C22 7 19 4 16 2C13 4 10 7 10 10C10 16 8 18 2 22Z" fill="${color}"/>
            </svg>
        `;
        
        const duration = 8 + Math.random() * 10;
        leaf.style.animationDuration = duration + 's';
        
        leavesContainer.appendChild(leaf);
        setTimeout(() => leaf.remove(), duration * 1000);
    }
    
    // Spawn falling leaves
    setInterval(createLeaf, 2500);
}

/**
 * 9. Scroll Observer (Fades In Sections, Draws SVGs, Counts Up Stats)
 */
function initScrollObserver() {
    // ── IntersectionObserver for reveals ───────────────────
    const reveals = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // only reveal once
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => revealObserver.observe(el));

    // ── IntersectionObserver for SVG arrows drawing ───────
    const arrows = document.querySelectorAll('[data-draw-on-scroll], .hand-arrow');
    const arrowObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('draw');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    arrows.forEach(arrow => arrowObserver.observe(arrow));

    // ── IntersectionObserver for numbers counting up ─────
    const counters = document.querySelectorAll('.count-up');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                
                let start = 0;
                const duration = 1500; // ms
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentVal = (easeProgress * target).toFixed(target % 1 === 0 ? 0 : 1);
                    
                    el.textContent = currentVal + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.2
    });

    counters.forEach(c => counterObserver.observe(c));
}
