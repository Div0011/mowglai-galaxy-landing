"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";


export type Language = "en" | "hi" | "es" | "fr" | "ja";

interface Translations {
    SettingsToggle: {
        title: string;
        appearance: string;
        light: string;
        dark: string;
        system: string;
        language: string;
    };
    Common: {
        explore: string;
        agency: string;
        sayHello: string;
        est: string;
        deliveringElegance: string;
    };
    Home: {
        weCreate: string;
        the: string;
        extraordinary: string;
        introText: string;
        exploreDNA: string;
        purchase: string;
        templates: string;
        templateText: string;
        viewTemplates: string;
        readyToBegin: string;
        consultFree: string;
        studioStory: string;
        knowMore: string;
    };
    SelectedWork: {
        selected: string;
        work: string;
        collectionDesc: string;
        exploreCase: string;
        comingSoonTitle: string;
        comingSoonDesc: string;
    };
    AestheticShowcase: {
        aesthetic: { title: string; text: string };
        global: { title: string; text: string };
        fast: { title: string; text: string };
        deep: { title: string; text: string };
        mobile: { title: string; text: string };
        adaptation: { title: string; text: string };
        survival: { title: string; text: string };
    };
    Services: {
        hero: {
            subtitle: string;
            title: string;
            description: string;
        };
        cards: {
            webDesign: { category: string; title: string; description: string; details: string[] };
            development: { category: string; title: string; description: string; details: string[] };
            redesign: { category: string; title: string; description: string; details: string[] };
            database: { category: string; title: string; description: string; details: string[] };
            strategy: { category: string; title: string; description: string; details: string[] };
            ai: { category: string; title: string; description: string; details: string[] };
        };
    };
    About: {
        hero: {
            digital: string;
            artisans: string;
            description: string;
        };
        features: { title: string; description: string; }[];
        mission: {
            global: string;
            vision: string;
            internationalStandard: string;
            builtFor: string;
            theWorld: string;
            discover: string;
            ourDna: string;
            quote: string;
            description: string;
        };
    };
    Navigation: {
        value: string;
    };
    Investment: {
        hero: { titleMain: string; titleSub: string };
        tabs: { standard: string; premium: string };
        apex: { title: string; description: string; button: string };
        brochure: { title: string; description: string; button: string };
        customQuote: { title: string; description: string; button: string };
    };
    Pricing: {
        subtitle: string;
        download: string;
        plans: {
            basic: { name: string; description: string; features: string[]; button: string };
            advanced: { name: string; description: string; features: string[]; button: string };
            epic: { name: string; description: string; features: string[]; button: string };
        };
    };
    Contact: {
        hero: { titleMain: string; titleSub: string; subtitle: string };
        info: { email: string; phone: string; whatsapp: string; hours: string; hoursValue: string; location: string; locationValue: string };
        form: { namePlaceholder: string; emailPlaceholder: string; messagePlaceholder: string; buttonSend: string; buttonSending: string };
        customQuote: { title: string; titleSub: string; description: string; buttonMain: string; buttonSub: string };
    };
    ProjectRequest: {
        hero: { titleSuffix: string; includedFeatures: string; beforeCommit: string; downloadText: string; downloadButton: string };
        form: { title: string; subtitle: string; labels: { company: string; contactName: string; email: string; startDate: string; vision: string }; placeholders: { company: string; contactName: string; email: string; startDate: string; vision: string }; button: string };
        success: { title: string; description: string };
    };
    CustomRequest: {
        hero: { titleMain: string; titleSub: string; subtitle: string };
        steps: { idea: string; details: string };
        step1: { title: string; description: string; placeholder: string; button: string };
        step2: { title: string; description: string; labels: { name: string; email: string; phone: string; website: string; budget: string; timeline: string; additional: string }; buttonBack: string; buttonSubmit: string };
        success: { title: string; description: string; checkEmail: string; button: string };
    };
    Explore: {
        hero: { title: string; subtitle: string; description: string };
        stats: { systems: string };
        filters: { all: string; filterBtn: string; reset: string; show: string; budget: string; complexity: string; tech: string; aesthetics: string; noSignals: string; broaden: string; resetParams: string };
        card: { viewProject: string; pages: string };
    };
}

const translations: Record<Language, Translations> = {
    en: {
        SettingsToggle: {
            title: "Settings",
            appearance: "Appearance",
            light: "Light",
            dark: "Dark",
            system: "System",
            language: "Language"
        },
        Common: {
            explore: "Explore",
            agency: "Agency",
            sayHello: "Say Hello",
            est: "EST.",
            deliveringElegance: "Delivering digital elegance."
        },
        Home: {
            weCreate: "WE CREATE",
            the: "THE",
            extraordinary: "EXTRAORDINARY",
            introText: "In a digital landscape crowded with the mundane, Mowglai Wild stands as a beacon of growth. We don't just build websites; we architect digital ecosystems that breathe life into your brand's vision.",
            exploreDNA: "Explore Our DNA",
            purchase: "Purchase",
            templates: "Templates",
            templateText: "Accelerate your launch with our premium, industry-specific website templates. Handcrafted for performance and designed to convert.",
            viewTemplates: "VIEW TEMPLATES",
            readyToBegin: "Ready to Begin the Journey?",
            consultFree: "Consult for Free",
            studioStory: "THE STUDIO STORY",
            knowMore: "Still not sure? Know more"
        },
        SelectedWork: {
            selected: "Selected",
            work: "Work",
            collectionDesc: "A curated collection of our most impactful digital voyages.",
            exploreCase: "EXPLORE CASE",
            comingSoonTitle: "Case Study Coming Soon",
            comingSoonDesc: "The case study for this project is currently being finalized. Check back shortly!"
        },
        AestheticShowcase: {
            aesthetic: { title: "Aesthetic", text: "Stunning Visuals" },
            global: { title: "Global", text: "Borderless Experiences" },
            fast: { title: "Fast", text: "Blazing Performance" },
            deep: { title: "Deep", text: "Simplified Complexity" },
            mobile: { title: "Mobile", text: "Flawless Everywhere" },
            adaptation: { title: "Adaptation", text: "Constant Evolution" },
            survival: { title: "Survival", text: "Resilient Code" }
        },
        Services: {
            hero: {
                subtitle: "Our",
                title: "Services",
                description: "Capabilities woven into digital reality."
            },
            cards: {
                webDesign: {
                    category: "Web Design",
                    title: "Aesthetic Excellence",
                    description: "Your website is the digital face of your brand. We craft visually stunning, responsive interfaces that merge artistic expression with functional precision.",
                    details: ["UI/UX Design", "Motion Graphics", "Brand Identity", "Responsive Layouts", "Mobile First"]
                },
                development: {
                    category: "Development",
                    title: "Robust Engineering",
                    description: "Beneath the beauty lies a beast. Our development team builds scalable, secure, and lightning-fast architectures that drive your business forward.",
                    details: ["Full-Stack Dev", "SaaS Platforms", "MVP Builds", "MVC Architecture", "E-Commerce", "CMS Solutions", "API Integration"]
                },
                redesign: {
                    category: "Redesign",
                    title: "Digital Evolution",
                    description: "Outdated shouldn't mean obsolete. We breathe new life into legacy platforms. Enhance usability, improve speed, and secure your digital future.",
                    details: ["Visual Overhaul", "Performance Optimization", "Security Patching", "UX Strategy"]
                },
                database: {
                    category: "Database",
                    title: "Data Intelligence",
                    description: "We design sophisticated database solutions that ensure your information is organized, accessible, and impenetrable. We handle the backbone of your application.",
                    details: ["Database Architecture", "Cloud Migration", "Data Security", "Performance Tuning"]
                },
                strategy: {
                    category: "Strategy",
                    title: "Global Reach",
                    description: "Our strategies are designed to position your brand on the global map, ensuring you resonate with audiences across cultures and borders.",
                    details: ["Market Analysis", "SEO Strategy", "Content Curation", "Growth Hacking"]
                },
                ai: {
                    category: "Artificial Intelligence",
                    title: "Intelligent Systems",
                    description: "Empower your platform with next-gen AI. From smart chatbots to predictive analytics, we integrate intelligence into your digital ecosystem.",
                    details: ["AI Chatbots", "Machine Learning", "Automation", "Integration"]
                }
            }
        },
        About: {
            hero: {
                digital: "Digital",
                artisans: "Artisans",
                description: "\"We are your flexible digital partners. Partnering with ambitious brands worldwide, we craft stylish, professional websites that fit your unique vision.\""
            },
            features: [
                { title: "Modern & Stylish", description: "Creating modest yet visually striking designs tailored for any client profile." },
                { title: "Professional Grade", description: "Robust protocols ensuring your digital presence is secure and reliable." },
                { title: "Peak Performance", description: "Optimized for speed and smoothness, respecting your user's time." },
                { title: "International Exp.", description: "Proven track record with leading firms across multiple continents." },
                { title: "Client Centric", description: "We adapt to your specific needs, regardless of industry or scale." },
                { title: "Flexible Schedule", description: "Active Mon-Sat across different time zones to match your workflow." }
            ],
            mission: {
                global: "GLOBAL",
                vision: "VISION",
                internationalStandard: "International Standard",
                builtFor: "BUILT FOR",
                theWorld: "THE WORLD",
                discover: "Discover",
                ourDna: "Our DNA",
                quote: "\"Bringing world-class quality to clients worldwide. We create modest, stylish, and professional websites for any industry.\"",
                description: "We are built for flexibility. Operating Monday to Saturday across multiple time zones, we align perfectly with your schedule. Whether you are a startup or an enterprise, our global team delivers modern digital craftsmanship that speaks a universal language."
            }
        },
        Navigation: {
            value: "Next Chapter"
        },
        Investment: {
            hero: { titleMain: "THE", titleSub: "PURCHASE" },
            tabs: { standard: "STANDARD", premium: "PREMIUM" },
            apex: { title: "Apex Solutions", description: "Our premium tier offers bespoke digital architecture, dedicated 24/7 survival support, and unmatched growth for industry leaders.", button: "Inquire for Apex" },
            brochure: { title: "OUR BROCHURE", description: "Get a detailed breakdown of our wild strategies and success stories.", button: "Download Brochure" },
            customQuote: { title: "CUSTOM QUOTATION", description: "Tell us your goal and we'll generate a personalized strategy for your market habitat.", button: "Download Quotation" }
        },
        Pricing: {
            subtitle: "Value Beyond Measurement",
            download: "Download Proposal",
            plans: {
                basic: { name: "BASIC", description: "Perfect for small businesses getting started online", features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"], button: "START ASCENT" },
                advanced: { name: "ADVANCED", description: "Ideal for growing businesses needing more features", features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "E-commerce ready", "3 months support"], button: "START ASCENT" },
                epic: { name: "EPIC", description: "Full-scale solutions for large organizations", features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support", "Dedicated team"], button: "START DIALOGUE" }
            }
        },
        Contact: {
            hero: { titleMain: "GET IN", titleSub: "TOUCH", subtitle: "Ready to start your project? Let's create something amazing together." },
            info: { email: "Email", phone: "Phone & WhatsApp", whatsapp: "WhatsApp", hours: "Hours", hoursValue: "Mon - Sat • Global Zones", location: "HQ Location", locationValue: "Noida, India" },
            form: { namePlaceholder: "Your Name", emailPlaceholder: "Email Address", messagePlaceholder: "Tell us about your project...", buttonSend: "Send Message", buttonSending: "Sending..." },
            customQuote: { title: "NEED", titleSub: "A CUSTOMIZED QUOTATION?", description: "Every project is unique. Let us provide a detailed, tailored breakdown of costs and timelines for your specific requirements.", buttonMain: "REQUEST CUSTOM", buttonSub: "QUOTATION" }
        },
        ProjectRequest: {
            hero: { titleSuffix: "ASCENT", includedFeatures: "Included Features", beforeCommit: "Before you commit", downloadText: "Download the detailed PDF roadmap for the plan to see exactly what we will build for you.", downloadButton: "Download Proposal" },
            form: { title: "Tell Us More", subtitle: "To initialize the protocol, we need to know who you are and what you want to achieve.", labels: { company: "Company / Entity Name", contactName: "Contact Name", email: "Email Address", startDate: "Target Start Date", vision: "Vision / Work Plan" }, placeholders: { company: "e.g. Acme Corp", contactName: "Your Name", email: "you@company.com", startDate: "e.g. Next Month, ASAP", vision: "Describe your goals, requirements, or what you want to achieve..." }, button: "Send Project Details" },
            success: { title: "Request Sent!", description: "We've received your project details and will be in touch shortly." }
        },
        CustomRequest: {
            hero: { titleMain: "CUSTOM", titleSub: "REQUEST", subtitle: "Tell Us Your Vision" },
            steps: { idea: "Your Idea", details: "Your Details" },
            step1: { title: "What's Your Business Idea?", description: "Share your vision, goals, and what you're looking to achieve. The more details you provide, the better we can tailor our solution for you.", placeholder: "Example: I'm launching an e-commerce platform...", button: "Continue" },
            step2: { title: "Let's Get To Know You", description: "Help us understand your project better with a few more details.", labels: { name: "Your Name", email: "Email Address", phone: "Phone Number", website: "Current Website", budget: "Estimated Budget", timeline: "Timeline", additional: "Additional Information" }, buttonBack: "Back", buttonSubmit: "Submit Request" },
            success: { title: "REQUEST SENT!", description: "Thank you for sharing your vision with us. Our team will analyze your requirements and reach out within 24 hours.", checkEmail: "Check your email", button: "Back to Home" }
        },
        Explore: {
            hero: { title: "FUTURE", subtitle: "DESIGN", description: "Curated interface aesthetics for the next generation of web experiences." },
            stats: { systems: "Systems Online" },
            filters: { all: "All Systems", filterBtn: "Filters", reset: "Reset", show: "Show", budget: "Budget Range", complexity: "Complexity", tech: "Tech Stack", aesthetics: "Aesthetics", noSignals: "NO SIGNALS FOUND", broaden: "Try broadening your search parameters.", resetParams: "Reset Parameters" },
            card: { viewProject: "View Project", pages: "Pages" }
        }
    },
    hi: {
        SettingsToggle: {
            title: "सेटिंग्स (Settings)",
            appearance: "रूप (Appearance)",
            light: "हल्का (Light)",
            dark: "गहरा (Dark)",
            system: "सिस्टम (System)",
            language: "भाषा (Language)"
        },
        Common: {
            explore: "एक्सप्लोर करें",
            agency: "एजेंसी",
            sayHello: "नमस्ते कहें",
            est: "स्थापित",
            deliveringElegance: "डिजिटल लालित्य प्रदान करना।"
        },
        Home: {
            weCreate: "हम बनाते हैं",
            the: "",
            extraordinary: "असाधारण",
            introText: "डिजिटल दुनिया में, मोगलाई वाइल्ड विकास का प्रतीक है। हम सिर्फ वेबसाइट नहीं बनाते; हम डिजिटल पारिस्थितिकी तंत्र का निर्माण करते हैं जो आपके ब्रांड में जान डाल देते हैं।",
            exploreDNA: "हमारा डीएनए देखें",
            purchase: "खरीदें",
            templates: "टेम्पलेट्स",
            templateText: "हमारे प्रीमियम, उद्योग-विशिष्ट वेबसाइट टेम्पलेट्स के साथ अपने लॉन्च में तेजी लाएं। प्रदर्शन के लिए हस्तशिल्प और रूपांतरित करने के लिए डिज़ाइन किया गया।",
            viewTemplates: "टेम्पलेट्स देखें",
            readyToBegin: "यात्रा शुरू करने के लिए तैयार?",
            consultFree: "निःशुल्क परामर्श",
            studioStory: "स्टूडियो की कहानी",
            knowMore: "अभी भी अनिश्चित हैं? और जानें"
        },
        SelectedWork: {
            selected: "चुनिंदा",
            work: "काम",
            collectionDesc: "हमारी सबसे प्रभावशाली डिजिटल यात्राओं का एक क्यूरेटेड संग्रह।",
            exploreCase: "केस देखें",
            comingSoonTitle: "केस स्टडी जल्द आ रही है",
            comingSoonDesc: "इस परियोजना के लिए केस स्टडी अभी अंतिम रूप दी जा रही है। शीघ्र ही देखें!"
        },
        AestheticShowcase: {
            aesthetic: { title: "सौंदर्य", text: "शानदार दृश्य" },
            global: { title: "वैश्विक", text: "सीमाहिन अनुभव" },
            fast: { title: "तेज़", text: "तेज़ प्रदर्शन" },
            deep: { title: "गहरा", text: "सरलीकृत जटिलता" },
            mobile: { title: "मोबाइल", text: "हर जगह निर्दोष" },
            adaptation: { title: "अनुकूलन", text: "निरंतर विकास" },
            survival: { title: "उत्तरजीविता", text: "लचीला कोड" }
        },
        Services: {
            hero: {
                subtitle: "हमारी",
                title: "सेवाएं",
                description: "डिजिटल वास्तविकता में बुनी गई क्षमताएं।"
            },
            cards: {
                webDesign: {
                    category: "वेब डिज़ाइन",
                    title: "सौंदर्य उत्कृष्टता",
                    description: "आपकी वेबसाइट आपके ब्रांड का डिजिटल चेहरा है। हम नेत्रहीन आश्चर्यजनक, उत्तरदायी इंटरफेस तैयार करते हैं जो कार्यात्मक सटीकता के साथ कलात्मक अभिव्यक्ति का विलय करते हैं।",
                    details: ["यूआई/यूएक्स डिज़ाइन", "मोशन ग्राफिक्स", "ब्रांड पहचान", "उत्तरदायी लेआउट", "मोबाइल पहले"]
                },
                development: {
                    category: "विकास",
                    title: "मजबूत इंजीनियरिंग",
                    description: "सुंदरता के नीचे एक जानवर निहित है। हमारी विकास टीम स्केलेबल, सुरक्षित और बिजली की तेज वास्तुकला का निर्माण करती है जो आपके व्यवसाय को आगे बढ़ाती है।",
                    details: ["पूर्ण-स्टैक देव", "SaaS प्लेटफ़ॉर्म", "MVP बिल्ड", "MVC आर्किटेक्चर", "ई-कॉमर्स", "CMS समाधान", "API एकीकरण"]
                },
                redesign: {
                    category: "पुनः डिज़ाइन",
                    title: "डिजिटल विकास",
                    description: "पुराने का मतलब अप्रचलित नहीं होना चाहिए। हम विरासत प्लेटफार्मों में नई जान फूंकते हैं। प्रयोज्य बढ़ाएं, गति में सुधार करें, और अपने डिजिटल भविष्य को सुरक्षित करें।",
                    details: ["दृश्य ओवरहाल", "प्रदर्शन अनुकूलन", "सुरक्षा पैचिंग", "यूएक्स रणनीति"]
                },
                database: {
                    category: "डेटाबेस",
                    title: "डेटा इंटेलिजेंस",
                    description: "हम परिष्कृत डेटाबेस समाधान डिजाइन करते हैं जो सुनिश्चित करते हैं कि आपकी जानकारी व्यवस्थित, सुलभ और अभेद्य है। हम आपके आवेदन की रीढ़ को संभालते हैं।",
                    details: ["डेटाबेस वास्तुकला", "क्लाउड माइग्रेशन", "डेटा सुरक्षा", "प्रदर्शन ट्यूनिंग"]
                },
                strategy: {
                    category: "रणनीति",
                    title: "वैश्विक पहुंच",
                    description: "हमारी रणनीतियों को वैश्विक मानचित्र पर आपके ब्रांड को स्थान देने के लिए डिज़ाइन किया गया है, यह सुनिश्चित करते हुए कि आप संस्कृतियों और सीमाओं के पार दर्शकों के साथ गूंजते हैं।",
                    details: ["बाजार विश्लेषण", "एसईओ रणनीति", "सामग्री क्यूरेशन", "ग्रोथ हैकिंग"]
                },
                ai: {
                    category: "कृत्रिम बुद्धिमत्ता",
                    title: "बुद्धिमान सिस्टम",
                    description: "अगली पीढ़ी के एआई के साथ अपने मंच को सशक्त बनाएं। स्मार्ट चैटबॉट से लेकर भविष्य कहनेवाला विश्लेषण तक, हम आपके डिजिटल पारिस्थितिकी तंत्र में बुद्धिमत्ता को एकीकृत करते हैं।",
                    details: ["एआई चैटबॉट", "मशीन लर्निंग", "स्वचालन", "एकीकरण"]
                }
            }
        },
        About: {
            hero: {
                digital: "डिजिटल",
                artisans: "कारीगर",
                description: "\"हम आपके लचीले डिजिटल भागीदार हैं। दुनिया भर में महत्वाकांक्षी ब्रांडों के साथ साझेदारी करते हुए, हम स्टाइलिश, पेशेवर वेबसाइट तैयार करते हैं जो आपकी अनूठी दृष्टि के अनुकूल हैं।\""
            },
            features: [
                { title: "आधुनिक और स्टाइलिश", description: "किसी भी ग्राहक प्रोफ़ाइल के लिए मामूली लेकिन नेत्रहीन आश्चर्यजनक डिज़ाइन बनाना।" },
                { title: "पेशेवर ग्रेड", description: "मजबूत प्रोटोकॉल यह सुनिश्चित करते हैं कि आपकी डिजिटल उपस्थिति सुरक्षित और विश्वसनीय है।" },
                { title: "पीक प्रदर्शन", description: "अपने उपयोगकर्ता के समय का सम्मान करते हुए, गति और सहजता के लिए अनुकूलित।" },
                { title: "अंतर्राष्ट्रीय अनुभव", description: "कई महाद्वीपों में अग्रणी फर्मों के साथ सिद्ध ट्रैक रिकॉर्ड।" },
                { title: "ग्राहक केंद्रित", description: "हम उद्योग या पैमाने की परवाह किए बिना, आपकी विशिष्ट आवश्यकताओं के अनुकूल हैं।" },
                { title: "लचीली अनुसूची", description: "अपने वर्कफ़्लो से मेल खाने के लिए अलग-अलग समय क्षेत्रों में सोम-शनि सक्रिय।" }
            ],
            mission: {
                global: "वैश्विक",
                vision: "दृष्टि",
                internationalStandard: "अंतर्राष्ट्रीय मानक",
                builtFor: "के लिए निर्मित",
                theWorld: "दुनिया",
                discover: "खोजें",
                ourDna: "हमारा डीएनए",
                quote: "\"दुनिया भर के ग्राहकों के लिए विश्व स्तरीय गुणवत्ता लाना। हम किसी भी उद्योग के लिए मामूली, स्टाइलिश और पेशेवर वेबसाइट बनाते हैं।\"",
                description: "हम लचीलेपन के लिए बनाए गए हैं। कई समय क्षेत्रों में सोमवार से शनिवार तक काम करते हुए, हम आपके कार्यक्रम के साथ पूरी तरह से संरेखित होते हैं। चाहे आप एक स्टार्टअप हों या एक उद्यम, हमारी वैश्विक टीम आधुनिक डिजिटल शिल्प कौशल प्रदान करती है जो एक सार्वभौमिक भाषा बोलती है।"
            }
        },
        Navigation: {
            value: "अगला अध्याय"
        },
        Investment: {
            hero: { titleMain: "THE", titleSub: "PURCHASE" },
            tabs: { standard: "STANDARD", premium: "PREMIUM" },
            apex: { title: "Apex Solutions", description: "Our premium tier offers bespoke digital architecture, dedicated 24/7 survival support, and unmatched growth for industry leaders.", button: "Inquire for Apex" },
            brochure: { title: "OUR BROCHURE", description: "Get a detailed breakdown of our wild strategies and success stories.", button: "Download Brochure" },
            customQuote: { title: "CUSTOM QUOTATION", description: "Tell us your goal and we'll generate a personalized strategy for your market habitat.", button: "Download Quotation" }
        },
        Pricing: {
            subtitle: "Value Beyond Measurement",
            download: "Download Proposal",
            plans: {
                basic: { name: "BASIC", description: "Perfect for small businesses getting started online", features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"], button: "START ASCENT" },
                advanced: { name: "ADVANCED", description: "Ideal for growing businesses needing more features", features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "E-commerce ready", "3 months support"], button: "START ASCENT" },
                epic: { name: "EPIC", description: "Full-scale solutions for large organizations", features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support", "Dedicated team"], button: "START DIALOGUE" }
            }
        },
        Contact: {
            hero: { titleMain: "GET IN", titleSub: "TOUCH", subtitle: "Ready to start your project? Let's create something amazing together." },
            info: { email: "Email", phone: "Phone & WhatsApp", whatsapp: "WhatsApp", hours: "Hours", hoursValue: "Mon - Sat • Global Zones", location: "HQ Location", locationValue: "Noida, India" },
            form: { namePlaceholder: "Your Name", emailPlaceholder: "Email Address", messagePlaceholder: "Tell us about your project...", buttonSend: "Send Message", buttonSending: "Sending..." },
            customQuote: { title: "NEED", titleSub: "A CUSTOMIZED QUOTATION?", description: "हर परियोजना अद्वितीय है। आइए आपकी विशिष्ट आवश्यकताओं के लिए लागत और समयसीमा का विस्तृत विवरण प्रदान करें।", buttonMain: "REQUEST CUSTOM", buttonSub: "QUOTATION" }
        },
        ProjectRequest: {
            hero: { titleSuffix: "ASCENT", includedFeatures: "Included Features", beforeCommit: "Before you commit", downloadText: "Download the detailed PDF roadmap for the plan to see exactly what we will build for you.", downloadButton: "Download Proposal" },
            form: { title: "Tell Us More", subtitle: "To initialize the protocol, we need to know who you are and what you want to achieve.", labels: { company: "Company / Entity Name", contactName: "Contact Name", email: "Email Address", startDate: "Target Start Date", vision: "Vision / Work Plan" }, placeholders: { company: "e.g. Acme Corp", contactName: "Your Name", email: "you@company.com", startDate: "e.g. Next Month, ASAP", vision: "Describe your goals, requirements, or what you want to achieve..." }, button: "Send Project Details" },
            success: { title: "Request Sent!", description: "We've received your project details and will be in touch shortly." }
        },
        CustomRequest: {
            hero: { titleMain: "CUSTOM", titleSub: "REQUEST", subtitle: "Tell Us Your Vision" },
            steps: { idea: "Your Idea", details: "Your Details" },
            step1: { title: "What's Your Business Idea?", description: "Share your vision, goals, and what you're looking to achieve. The more details you provide, the better we can tailor our solution for you.", placeholder: "Example: I'm launching an e-commerce platform...", button: "Continue" },
            step2: { title: "Let's Get To Know You", description: "Help us understand your project better with a few more details.", labels: { name: "Your Name", email: "Email Address", phone: "Phone Number", website: "Current Website", budget: "Estimated Budget", timeline: "Timeline", additional: "Additional Information" }, buttonBack: "Back", buttonSubmit: "Submit Request" },
            success: { title: "REQUEST SENT!", description: "Thank you for sharing your vision with us. Our team will analyze your requirements and reach out within 24 hours.", checkEmail: "Check your email", button: "Back to Home" }
        },
        Explore: {
            hero: { title: "भविष्य", subtitle: "डिज़ाइन", description: "वेब अनुभवों की अगली पीढ़ी के लिए क्यूरेटेड इंटरफेस सौंदर्यशास्त्र।" },
            stats: { systems: "सिस्टम ऑनलाइन" },
            filters: { all: "सभी सिस्टम", filterBtn: "फिल्टर", reset: "रीसेट", show: "दिखाएं", budget: "बजट रेंज", complexity: "जटिलता", tech: "टेक स्टैक", aesthetics: "सौंदर्यशास्त्र", noSignals: "कोई संकेत नहीं मिला", broaden: "अपने खोज मापदंडों को व्यापक बनाने का प्रयास करें।", resetParams: "रीसेट पैरामीटर" },
            card: { viewProject: "प्रोजेक्ट देखें", pages: "पृष्ठ" }
        }
    },
    es: {
        SettingsToggle: {
            title: "Configuración",
            appearance: "Apariencia",
            light: "Claro",
            dark: "Oscuro",
            system: "Sistema",
            language: "Idioma"
        },
        Common: {
            explore: "Explorar",
            agency: "Agencia",
            sayHello: "Di Hola",
            est: "Est.",
            deliveringElegance: "Ofreciendo elegancia digital."
        },
        Home: {
            weCreate: "CREAMOS",
            the: "LO",
            extraordinary: "EXTRAORDINARIO",
            introText: "En un paisaje digital lleno de lo mundano, Mowglai Wild se erige como un faro de crecimiento. No solo construimos sitios web; arquitectamos ecosistemas digitales que dan vida a la visión de su marca.",
            exploreDNA: "Explora Nuestro ADN",
            purchase: "Comprar",
            templates: "Plantillas",
            templateText: "Acelere su lanzamiento con nuestras plantillas web premium específicas para la industria.",
            viewTemplates: "VER PLANTILLAS",
            readyToBegin: "¿Listo para comenzar el viaje?",
            consultFree: "Consulta Gratis",
            studioStory: "LA HISTORIA DEL ESTUDIO",
            knowMore: "¿Aún no estás seguro? Saber más"
        },
        SelectedWork: {
            selected: "Trabajos",
            work: "Seleccionados",
            collectionDesc: "Una colección curada de nuestros viajes digitales más impactantes.",
            exploreCase: "EXPLORAR CASO",
            comingSoonTitle: "Estudio de Caso Próximamente",
            comingSoonDesc: "El estudio de caso para este proyecto se está finalizando actualmente."
        },
        AestheticShowcase: {
            aesthetic: { title: "Estética", text: "Visuales Impresionantes" },
            global: { title: "Global", text: "Experiencias Sin Fronteras" },
            fast: { title: "Rápido", text: "Rendimiento Increíble" },
            deep: { title: "Profundo", text: "Complejidad Simplificada" },
            mobile: { title: "Móvil", text: "Impecable en Todos Lados" },
            adaptation: { title: "Adaptación", text: "Evolución Constante" },
            survival: { title: "Supervivencia", text: "Código Resistente" }
        },
        Services: {
            hero: {
                subtitle: "Nuestros",
                title: "Servicios",
                description: "Capacidades tejidas en la realidad digital."
            },
            cards: {
                webDesign: {
                    category: "Diseño Web",
                    title: "Excelencia Estética",
                    description: "Tu sitio web es la cara digital de tu marca. Creamos interfaces visualmente impresionantes y receptivas que fusionan la expresión artística con la precisión funcional.",
                    details: ["Diseño UI/UX", "Gráficos en Movimiento", "Identidad de Marca", "Diseños Responsivos", "Móvil Primero"]
                },
                development: {
                    category: "Desarrollo",
                    title: "Ingeniería Robusta",
                    description: "Debajo de la belleza yace una bestia. Nuestro equipo de desarrollo construye arquitecturas escalables, seguras y ultrarrápidas que impulsan tu negocio.",
                    details: ["Dev Full-Stack", "Plataformas SaaS", "MVPs", "Arquitectura MVC", "Comercio Electrónico", "Soluciones CMS", "Integración API"]
                },
                redesign: {
                    category: "Rediseño",
                    title: "Evolución Digital",
                    description: "Anticuado no debería significar obsoleto. Insuflamos nueva vida a las plataformas heredadas. Mejora la usabilidad, aumenta la velocidad y asegura tu futuro digital.",
                    details: ["Revisión Visual", "Optimización Rendimiento", "Parches Seguridad", "Estrategia UX"]
                },
                database: {
                    category: "Base de Datos",
                    title: "Inteligencia de Datos",
                    description: "Diseñamos soluciones de base de datos sofisticadas que aseguran que su información esté organizada, accesible e impenetrable.",
                    details: ["Arquitectura BD", "Migración Nube", "Seguridad Datos", "Ajuste Rendimiento"]
                },
                strategy: {
                    category: "Estrategia",
                    title: "Alcance Global",
                    description: "Nuestras estrategias están diseñadas para posicionar tu marca en el mapa global, asegurando que resuenes con audiencias de todas las culturas y fronteras.",
                    details: ["Análisis Mercado", "Estrategia SEO", "Curación Contenido", "Growth Hacking"]
                },
                ai: {
                    category: "Inteligencia Artificial",
                    title: "Sistemas Inteligentes",
                    description: "Potencia tu plataforma con IA de próxima generación. Desde chatbots inteligentes hasta análisis predictivos, integramos inteligencia en tu ecosistema digital.",
                    details: ["Chatbots IA", "Aprendizaje Automático", "Automatización", "Integraciones"]
                }
            }
        },
        About: {
            hero: {
                digital: "ARTESANOS",
                artisans: "DIGITALES",
                description: "\"Somos sus socios digitales flexibles. Asociándonos con marcas ambiciosas en todo el mundo, creamos sitios web elegantes y profesionales que se ajustan a su visión única.\""
            },
            features: [
                { title: "Moderno y Elegante", description: "Creación de diseños modestos pero visualmente impactantes para cualquier perfil de cliente." },
                { title: "Grado Profesional", description: "Protocolos robustos que garantizan que su presencia digital sea segura y confiable." },
                { title: "Rendimiento Máximo", description: "Optimizado para velocidad y fluidez, respetando el tiempo de sus usuarios." },
                { title: "Exp. Internacional", description: "Historial comprobado con firmas líderes en múltiples continentes." },
                { title: "Centrado en el Cliente", description: "Nos adaptamos a sus necesidades específicas, independientemente de la industria o escala." },
                { title: "Horario Flexible", description: "Activo de lun-sab en diferentes zonas horarias para coincidir con su flujo de trabajo." }
            ],
            mission: {
                global: "VISIÓN",
                vision: "GLOBAL",
                internationalStandard: "Estándar Internacional",
                builtFor: "CONSTRUIDO PARA",
                theWorld: "EL MUNDO",
                discover: "Descubrir",
                ourDna: "Nuestro ADN",
                quote: "\"Brindando calidad de clase mundial a clientes de todo el mundo. Creamos sitios web modestos, elegantes y profesionales para cualquier industria.\"",
                description: "Estamos construidos para la flexibilidad. Operando de lunes a sábado en múltiples zonas horarias, nos alineamos perfectamente con su horario. Ya sea una startup o una empresa, nuestro equipo global ofrece artesanía digital moderna que habla un idioma universal."
            }
        },
        Navigation: {
            value: "Siguiente Capítulo"
        },
        Investment: {
            hero: { titleMain: "THE", titleSub: "PURCHASE" },
            tabs: { standard: "STANDARD", premium: "PREMIUM" },
            apex: { title: "Apex Solutions", description: "Our premium tier offers bespoke digital architecture, dedicated 24/7 survival support, and unmatched growth for industry leaders.", button: "Inquire for Apex" },
            brochure: { title: "OUR BROCHURE", description: "Get a detailed breakdown of our wild strategies and success stories.", button: "Download Brochure" },
            customQuote: { title: "CUSTOM QUOTATION", description: "Tell us your goal and we'll generate a personalized strategy for your market habitat.", button: "Download Quotation" }
        },
        Pricing: {
            subtitle: "Value Beyond Measurement",
            download: "Download Proposal",
            plans: {
                basic: { name: "BASIC", description: "Perfect for small businesses getting started online", features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"], button: "START ASCENT" },
                advanced: { name: "ADVANCED", description: "Ideal for growing businesses needing more features", features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "E-commerce ready", "3 months support"], button: "START ASCENT" },
                epic: { name: "EPIC", description: "Full-scale solutions for large organizations", features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support", "Dedicated team"], button: "START DIALOGUE" }
            }
        },
        Contact: {
            hero: { titleMain: "GET IN", titleSub: "TOUCH", subtitle: "Ready to start your project? Let's create something amazing together." },
            info: { email: "Email", phone: "Phone & WhatsApp", whatsapp: "WhatsApp", hours: "Hours", hoursValue: "Mon - Sat • Global Zones", location: "HQ Location", locationValue: "Noida, India" },
            form: { namePlaceholder: "Your Name", emailPlaceholder: "Email Address", messagePlaceholder: "Tell us about your project...", buttonSend: "Send Message", buttonSending: "Sending..." },
            customQuote: { title: "NECESITA", titleSub: "¿UNA COTIZACIÓN PERSONALIZADA?", description: "Cada proyecto es único. Permítanos proporcionar un desglose detallado y personalizado de costos y plazos para sus requisitos específicos.", buttonMain: "SOLICITAR", buttonSub: "COTIZACIÓN" }
        },
        ProjectRequest: {
            hero: { titleSuffix: "ASCENT", includedFeatures: "Included Features", beforeCommit: "Before you commit", downloadText: "Download the detailed PDF roadmap for the plan to see exactly what we will build for you.", downloadButton: "Download Proposal" },
            form: { title: "Tell Us More", subtitle: "To initialize the protocol, we need to know who you are and what you want to achieve.", labels: { company: "Company / Entity Name", contactName: "Contact Name", email: "Email Address", startDate: "Target Start Date", vision: "Vision / Work Plan" }, placeholders: { company: "e.g. Acme Corp", contactName: "Your Name", email: "you@company.com", startDate: "e.g. Next Month, ASAP", vision: "Describe your goals, requirements, or what you want to achieve..." }, button: "Send Project Details" },
            success: { title: "Request Sent!", description: "We've received your project details and will be in touch shortly." }
        },
        CustomRequest: {
            hero: { titleMain: "CUSTOM", titleSub: "REQUEST", subtitle: "Tell Us Your Vision" },
            steps: { idea: "Your Idea", details: "Your Details" },
            step1: { title: "What's Your Business Idea?", description: "Share your vision, goals, and what you're looking to achieve. The more details you provide, the better we can tailor our solution for you.", placeholder: "Example: I'm launching an e-commerce platform...", button: "Continue" },
            step2: { title: "Let's Get To Know You", description: "Help us understand your project better with a few more details.", labels: { name: "Your Name", email: "Email Address", phone: "Phone Number", website: "Current Website", budget: "Estimated Budget", timeline: "Timeline", additional: "Additional Information" }, buttonBack: "Back", buttonSubmit: "Submit Request" },
            success: { title: "REQUEST SENT!", description: "Thank you for sharing your vision with us. Our team will analyze your requirements and reach out within 24 hours.", checkEmail: "Check your email", button: "Back to Home" }
        },
        Explore: {
            hero: { title: "FUTURO", subtitle: "DISEÑO", description: "Estética de interfaz curada para la próxima generación de experiencias web." },
            stats: { systems: "Sistemas en Línea" },
            filters: { all: "Todos los Sistemas", filterBtn: "Filtros", reset: "Reiniciar", show: "Mostrar", budget: "Rango de Presupuesto", complexity: "Complejidad", tech: "Tecnología", aesthetics: "Estética", noSignals: "NO SE ENCONTRARON SEÑALES", broaden: "Intenta ampliar tus parámetros de búsqueda.", resetParams: "Restablecer Parámetros" },
            card: { viewProject: "Ver Proyecto", pages: "Páginas" }
        }
    },
    fr: {
        SettingsToggle: {
            title: "Paramètres",
            appearance: "Apparence",
            light: "Clair",
            dark: "Sombre",
            system: "Système",
            language: "Langue"
        },
        Common: {
            explore: "Explorer",
            agency: "Agence",
            sayHello: "Dites Bonjour",
            est: "Est.",
            deliveringElegance: "Offrant l'élégance numérique."
        },
        Home: {
            weCreate: "NOUS CRÉONS",
            the: "L'",
            extraordinary: "EXTRAORDINAIRE",
            introText: "Dans un paysage numérique encombré, Mowglai Wild se dresse comme un phare. Nous construisons des écosystèmes numériques qui donnent vie à votre marque.",
            exploreDNA: "Explorer Notre ADN",
            purchase: "Acheter",
            templates: "Modèles",
            templateText: "Accélérez votre lancement avec nos modèles de sites Web premium.",
            viewTemplates: "VOIR LES MODÈLES",
            readyToBegin: "Prêt à commencer le voyage ?",
            consultFree: "Consultation Gratuite",
            studioStory: "L'HISTOIRE DU STUDIO",
            knowMore: "Pas encore sûr ? En savoir plus"
        },
        SelectedWork: {
            selected: "Travaux",
            work: "Sélectionnés",
            collectionDesc: "Une collection organisée de nos voyages numériques les plus percutants.",
            exploreCase: "EXPLORER LE CAS",
            comingSoonTitle: "Étude de Cas Bientôt",
            comingSoonDesc: "L'étude de cas pour ce projet est en cours de finalisation."
        },
        AestheticShowcase: {
            aesthetic: { title: "Esthétique", text: "Visuels Époustouflants" },
            global: { title: "Global", text: "Expériences Sans Frontières" },
            fast: { title: "Rapide", text: "Performance Fulgurante" },
            deep: { title: "Profond", text: "Complexité Simplifiée" },
            mobile: { title: "Mobile", text: "Impeccable Partout" },
            adaptation: { title: "Adaptation", text: "Évolution Constante" },
            survival: { title: "Survie", text: "Code Résilient" }
        },
        Services: {
            hero: {
                subtitle: "Nos",
                title: "Services",
                description: "Des capacités tissées dans la réalité numérique."
            },
            cards: {
                webDesign: {
                    category: "Web Design",
                    title: "Excellence Esthétique",
                    description: "Votre site web est le visage numérique de votre marque. Nous créons des interfaces visuellement époustouflantes qui allient expression artistique et précision fonctionnelle.",
                    details: ["UI/UX Design", "Motion Graphics", "Identité de Marque", "Mises en page Réactives", "Mobile First"]
                },
                development: {
                    category: "Développement",
                    title: "Ingénierie Robuste",
                    description: "Sous la beauté se cache une bête. Notre équipe de développement construit des architectures évolutives, sécurisées et ultra-rapides.",
                    details: ["Full-Stack Dev", "Plateformes SaaS", "MVP", "Architecture MVC", "E-Commerce", "Solutions CMS", "Intégration API"]
                },
                redesign: {
                    category: "Refonte",
                    title: "Évolution Numérique",
                    description: "Démodé ne signifie pas obsolète. Nous donnons un nouveau souffle aux plateformes existantes. Améliorez la convivialité et sécurisez votre avenir numérique.",
                    details: ["Refonte Visuelle", "Optimisation Performance", "Correctifs Sécurité", "Stratégie UX"]
                },
                database: {
                    category: "Base de Données",
                    title: "Intelligence des Données",
                    description: "Nous concevons des solutions de base de données sophistiquées qui garantissent que vos informations sont organisées et impénétrables.",
                    details: ["Architecture BDD", "Migration Cloud", "Sécurité Données", "Optimisation Perf."]
                },
                strategy: {
                    category: "Stratégie",
                    title: "Portée Mondiale",
                    description: "Nos stratégies sont conçues pour positionner votre marque sur la carte mondiale, assurant une résonance auprès des publics de toutes cultures.",
                    details: ["Analyse Marché", "Stratégie SEO", "Curation Contenu", "Growth Hacking"]
                },
                ai: {
                    category: "Intelligence Artificielle",
                    title: "Systèmes Intelligents",
                    description: "Dotez votre plateforme d'une IA de nouvelle génération. Des chatbots intelligents à l'analyse prédictive, nous intégrons l'intelligence partout.",
                    details: ["Chatbots IA", "Machine Learning", "Automatisation", "Intégrations"]
                }
            }
        },
        About: {
            hero: {
                digital: "ARTISANS",
                artisans: "NUMÉRIQUES",
                description: "Nous sommes vos partenaires numériques flexibles. En partenariat avec des marques ambitieuses du monde entier, nous créons des sites web élégants et professionnels qui correspondent à votre vision unique."
            },
            features: [
                { title: "Moderne & Élégant", description: "Création de designs modestes mais visuellement saisissants pour tout profil client." },
                { title: "Qualité Pro", description: "Protocoles robustes garantissant la sécurité et la fiabilité de votre présence numérique." },
                { title: "Performance Maximale", description: "Optimisé pour la vitesse et la fluidité, respectant le temps de vos utilisateurs." },
                { title: "Exp. Internationale", description: "Expérience prouvée avec des entreprises leaders sur plusieurs continents." },
                { title: "Centré Client", description: "Nous nous adaptons à vos besoins spécifiques, quel que soit le secteur ou l'échelle." },
                { title: "Horaire Flexible", description: "Actif du lun-sam sur différents fuseaux horaires pour correspondre à votre flux de travail." }
            ],
            mission: {
                global: "VISION",
                vision: "GLOBALE",
                internationalStandard: "Standard International",
                builtFor: "CONSTRUIT POUR",
                theWorld: "LE MONDE",
                discover: "Découvrir",
                ourDna: "Notre ADN",
                quote: "Apporter une qualité de classe mondiale aux clients du monde entier. Nous créons des sites Web modestes, élégants et professionnels pour toute industrie.",
                description: "Nous sommes construits pour la flexibilité. Opérant du lundi au samedi sur plusieurs fuseaux horaires, nous nous alignons parfaitement avec votre emploi du temps. Que vous soyez une startup ou une entreprise, notre équipe mondiale offre un savoir-faire numérique moderne qui parle un langage universel."
            }
        },
        Navigation: {
            value: "Chapitre Suivant"
        },
        Investment: {
            hero: { titleMain: "THE", titleSub: "PURCHASE" },
            tabs: { standard: "STANDARD", premium: "PREMIUM" },
            apex: { title: "Apex Solutions", description: "Our premium tier offers bespoke digital architecture, dedicated 24/7 survival support, and unmatched growth for industry leaders.", button: "Inquire for Apex" },
            brochure: { title: "OUR BROCHURE", description: "Get a detailed breakdown of our wild strategies and success stories.", button: "Download Brochure" },
            customQuote: { title: "CUSTOM QUOTATION", description: "Tell us your goal and we'll generate a personalized strategy for your market habitat.", button: "Download Quotation" }
        },
        Pricing: {
            subtitle: "Value Beyond Measurement",
            download: "Download Proposal",
            plans: {
                basic: { name: "BASIC", description: "Perfect for small businesses getting started online", features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"], button: "START ASCENT" },
                advanced: { name: "ADVANCED", description: "Ideal for growing businesses needing more features", features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "E-commerce ready", "3 months support"], button: "START ASCENT" },
                epic: { name: "EPIC", description: "Full-scale solutions for large organizations", features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support", "Dedicated team"], button: "START DIALOGUE" }
            }
        },
        Contact: {
            hero: { titleMain: "GET IN", titleSub: "TOUCH", subtitle: "Ready to start your project? Let's create something amazing together." },
            info: { email: "Email", phone: "Phone & WhatsApp", whatsapp: "WhatsApp", hours: "Hours", hoursValue: "Mon - Sat • Global Zones", location: "HQ Location", locationValue: "Noida, India" },
            form: { namePlaceholder: "Your Name", emailPlaceholder: "Email Address", messagePlaceholder: "Tell us about your project...", buttonSend: "Send Message", buttonSending: "Sending..." },
            customQuote: { title: "BESOIN", titleSub: "D'UNE OFFRE PERSONNALISÉE ?", description: "Chaque projet est unique. Laissez-nous vous fournir une ventilation détaillée et sur mesure des coûts et des délais pour vos besoins spécifiques.", buttonMain: "DEMANDER", buttonSub: "DEVIS" }
        },
        ProjectRequest: {
            hero: { titleSuffix: "ASCENT", includedFeatures: "Included Features", beforeCommit: "Before you commit", downloadText: "Download the detailed PDF roadmap for the plan to see exactly what we will build for you.", downloadButton: "Download Proposal" },
            form: { title: "Tell Us More", subtitle: "To initialize the protocol, we need to know who you are and what you want to achieve.", labels: { company: "Company / Entity Name", contactName: "Contact Name", email: "Email Address", startDate: "Target Start Date", vision: "Vision / Work Plan" }, placeholders: { company: "e.g. Acme Corp", contactName: "Your Name", email: "you@company.com", startDate: "e.g. Next Month, ASAP", vision: "Describe your goals, requirements, or what you want to achieve..." }, button: "Send Project Details" },
            success: { title: "Request Sent!", description: "We've received your project details and will be in touch shortly." }
        },
        CustomRequest: {
            hero: { titleMain: "CUSTOM", titleSub: "REQUEST", subtitle: "Tell Us Your Vision" },
            steps: { idea: "Your Idea", details: "Your Details" },
            step1: { title: "What's Your Business Idea?", description: "Share your vision, goals, and what you're looking to achieve. The more details you provide, the better we can tailor our solution for you.", placeholder: "Example: I'm launching an e-commerce platform...", button: "Continue" },
            step2: { title: "Let's Get To Know You", description: "Help us understand your project better with a few more details.", labels: { name: "Your Name", email: "Email Address", phone: "Phone Number", website: "Current Website", budget: "Estimated Budget", timeline: "Timeline", additional: "Additional Information" }, buttonBack: "Back", buttonSubmit: "Submit Request" },
            success: { title: "REQUEST SENT!", description: "Thank you for sharing your vision with us. Our team will analyze your requirements and reach out within 24 hours.", checkEmail: "Check your email", button: "Back to Home" }
        },
        Explore: {
            hero: { title: "FUTUR", subtitle: "DESIGN", description: "L'esthétique de l'interface organisée pour la prochaine génération d'expériences Web." },
            stats: { systems: "Systèmes en Ligne" },
            filters: { all: "Tous les Systèmes", filterBtn: "Filtres", reset: "Réinitialiser", show: "Afficher", budget: "Budget", complexity: "Complexité", tech: "Technologie", aesthetics: "Esthétique", noSignals: "AUCUN SIGNAL TROUVÉ", broaden: "Essayez d'élargir vos paramètres de recherche.", resetParams: "Réinitialiser Paramètres" },
            card: { viewProject: "Voir le Projet", pages: "Pages" }
        }
    },
    ja: {
        SettingsToggle: {
            title: "設定",
            appearance: "外観",
            light: "ライト",
            dark: "ダーク",
            system: "システム",
            language: "言語"
        },
        Common: {
            explore: "探る",
            agency: "代理店",
            sayHello: "こんにちは",
            est: "設立",
            deliveringElegance: "デジタルの優雅さを提供します。"
        },
        Home: {
            weCreate: "私たちが創る",
            the: "",
            extraordinary: "非日常",
            introText: "平凡なものが溢れるデジタル環境の中で、Mowglai Wild は成長の光として立っています。私たちは単にウェブサイトを構築するのではなく、ブランドのビジョンに命を吹き込むデジタル エコシステムを設計します。",
            exploreDNA: "私たちのDNAを探る",
            purchase: "購入",
            templates: "テンプレート",
            templateText: "業界特化型のプレミアム ウェブサイト テンプレートで立ち上げを加速しましょう。",
            viewTemplates: "テンプレートを見る",
            readyToBegin: "旅を始める準備はできましたか？",
            consultFree: "無料相談",
            studioStory: "スタジオストーリー",
            knowMore: "まだよくわかりませんか？ 詳細はこちら"
        },
        SelectedWork: {
            selected: "厳選された",
            work: "作品",
            collectionDesc: "私たちの最も影響力のあるデジタルの旅の厳選されたコレクション。",
            exploreCase: "事例を見る",
            comingSoonTitle: "ケーススタディ近日公開",
            comingSoonDesc: "このプロジェクトのケーススタディは現在最終調整中です。"
        },
        AestheticShowcase: {
            aesthetic: { title: "美学", text: "驚くべきビジュアル" },
            global: { title: "グローバル", text: "ボーダーレスな体験" },
            fast: { title: "高速", text: "圧倒的なパフォーマンス" },
            deep: { title: "深さ", text: "簡素化された複雑さ" },
            mobile: { title: "モバイル", text: "どこでも完璧" },
            adaptation: { title: "適応", text: "絶え間ない進化" },
            survival: { title: "生存", text: "強靭なコード" }
        },
        Services: {
            hero: {
                subtitle: "私たちの",
                title: "サービス",
                description: "デジタルリアリティに織り込まれた機能。"
            },
            cards: {
                webDesign: {
                    category: "ウェブデザイン",
                    title: "美的卓越性",
                    description: "ウェブサイトはブランドのデジタルの顔です。私たちは芸術的な表現と機能的な精度を融合させた、視覚的に素晴らしいレスポンシブなインターフェースを作成します。",
                    details: ["UI/UXデザイン", "モーショングラフィックス", "ブランドアイデンティティ", "レスポンシブレイアウト", "モバイルファースト"]
                },
                development: {
                    category: "開発",
                    title: "堅牢なエンジニアリング",
                    description: "美しさの下には野獣が潜んでいます。私たちの開発チームは、ビジネスを前進させるスケーラブルで安全、かつ超高速なアーキテクチャを構築します。",
                    details: ["フルスタック開発", "SaaSプラットフォーム", "MVP構築", "MVCアーキテクチャ", "Eコマース", "CMSソリューション", "API統合"]
                },
                redesign: {
                    category: "リデザイン",
                    title: "デジタル進化",
                    description: "時代遅れが陳腐化を意味するべきではありません。私たちはレガシープラットフォームに新しい命を吹き込みます。ユーザビリティを向上させ、速度を改善し、デジタルの未来を確保します。",
                    details: ["ビジュアルオーバーホール", "パフォーマンス最適化", "セキュリティパッチ", "UX戦略"]
                },
                database: {
                    category: "データベース",
                    title: "データインテリジェンス",
                    description: "私たちは、情報が整理され、アクセス可能で、侵入不可能であることを保証する洗練されたデータベースソリューションを設計します。",
                    details: ["DBアーキテクチャ", "クラウド移行", "データセキュリティ", "パフォーマンス調整"]
                },
                strategy: {
                    category: "戦略",
                    title: "グローバルリーチ",
                    description: "私たちの戦略は、ブランドを世界地図に位置づけ、文化や国境を越えてオーディエンスに響くように設計されています。",
                    details: ["市場分析", "SEO戦略", "コンテンツキュレーション", "グロースハック"]
                },
                ai: {
                    category: "人工知能",
                    title: "インテリジェントシステム",
                    description: "次世代AIでプラットフォームを強化します。スマートチャットボットから予測分析まで、私たちはあなたのデジタルエコシステムに知能を統合します。",
                    details: ["AIチャットボット", "機械学習", "自動化", "統合"]
                }
            }
        },
        About: {
            hero: {
                digital: "デジタル",
                artisans: "職人",
                description: "「私たちはあなたの柔軟なデジタルパートナーです。世界中の野心的なブランドと提携し、独自のビジョンに合ったスタイリッシュでプロフェッショナルなウェブサイトを作成します。」"
            },
            features: [
                { title: "モダン＆スタイリッシュ", description: "あらゆるクライアントプロファイルに合わせた、控えめでありながら視覚的に印象的なデザインを作成します。" },
                { title: "プロフェッショナルグレード", description: "デジタルプレゼンスが安全で信頼できるものであることを保証する堅牢なプロトコル。" },
                { title: "ピークパフォーマンス", description: "ユーザーの時間を尊重し、速度とスムーズさのために最適化されています。" },
                { title: "国際経験", description: "複数の大陸の主要企業との実績があります。" },
                { title: "クライアント中心", description: "業界や規模に関係なく、お客様の特定のニーズに適応します。" },
                { title: "柔軟なスケジュール", description: "ワークフローに合わせて、さまざまなタイムゾーンで月曜から土曜まで活動しています。" }
            ],
            mission: {
                global: "ビジョン",
                vision: "グローバル",
                internationalStandard: "国際基準",
                builtFor: "のために構築",
                theWorld: "世界",
                discover: "発見",
                ourDna: "私たちのDNA",
                quote: "「世界中のクライアントに世界クラスの品質をもたらします。私たちはあらゆる業界向けに控えめでスタイリッシュ、かつプロフェッショナルなウェブサイトを作成します。」",
                description: "私たちは柔軟性のために作られています。複数のタイムゾーンで月曜日から土曜日まで営業しており、お客様のスケジュールに完全に合わせます。スタートアップでも大企業でも、私たちのグローバルチームは普遍的な言語を話す現代のデジタル職人技を提供します。"
            }
        },
        Navigation: {
            value: "次の章"
        },
        Investment: {
            hero: { titleMain: "THE", titleSub: "PURCHASE" },
            tabs: { standard: "STANDARD", premium: "PREMIUM" },
            apex: { title: "Apex Solutions", description: "Our premium tier offers bespoke digital architecture, dedicated 24/7 survival support, and unmatched growth for industry leaders.", button: "Inquire for Apex" },
            brochure: { title: "OUR BROCHURE", description: "Get a detailed breakdown of our wild strategies and success stories.", button: "Download Brochure" },
            customQuote: { title: "CUSTOM QUOTATION", description: "Tell us your goal and we'll generate a personalized strategy for your market habitat.", button: "Download Quotation" }
        },
        Pricing: {
            subtitle: "Value Beyond Measurement",
            download: "Download Proposal",
            plans: {
                basic: { name: "BASIC", description: "Perfect for small businesses getting started online", features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"], button: "START ASCENT" },
                advanced: { name: "ADVANCED", description: "Ideal for growing businesses needing more features", features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "E-commerce ready", "3 months support"], button: "START ASCENT" },
                epic: { name: "EPIC", description: "Full-scale solutions for large organizations", features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support", "Dedicated team"], button: "START DIALOGUE" }
            }
        },
        Contact: {
            hero: { titleMain: "GET IN", titleSub: "TOUCH", subtitle: "Ready to start your project? Let's create something amazing together." },
            info: { email: "Email", phone: "Phone & WhatsApp", whatsapp: "WhatsApp", hours: "Hours", hoursValue: "Mon - Sat • Global Zones", location: "HQ Location", locationValue: "Noida, India" },
            form: { namePlaceholder: "Your Name", emailPlaceholder: "Email Address", messagePlaceholder: "Tell us about your project...", buttonSend: "Send Message", buttonSending: "Sending..." },
            customQuote: { title: "必要ですか", titleSub: "カスタマイズされた見積もり？", description: "すべてのプロジェクトはユニークです。お客様の特定の要件に対するコストとスケジュールの詳細でカスタマイズされた内訳を提供させてください。", buttonMain: "カスタム見積もり", buttonSub: "をリクエスト" }
        },
        ProjectRequest: {
            hero: { titleSuffix: "ASCENT", includedFeatures: "Included Features", beforeCommit: "Before you commit", downloadText: "Download the detailed PDF roadmap for the plan to see exactly what we will build for you.", downloadButton: "Download Proposal" },
            form: { title: "Tell Us More", subtitle: "To initialize the protocol, we need to know who you are and what you want to achieve.", labels: { company: "Company / Entity Name", contactName: "Contact Name", email: "Email Address", startDate: "Target Start Date", vision: "Vision / Work Plan" }, placeholders: { company: "e.g. Acme Corp", contactName: "Your Name", email: "you@company.com", startDate: "e.g. Next Month, ASAP", vision: "Describe your goals, requirements, or what you want to achieve..." }, button: "Send Project Details" },
            success: { title: "Request Sent!", description: "We've received your project details and will be in touch shortly." }
        },
        CustomRequest: {
            hero: { titleMain: "CUSTOM", titleSub: "REQUEST", subtitle: "Tell Us Your Vision" },
            steps: { idea: "Your Idea", details: "Your Details" },
            step1: { title: "What's Your Business Idea?", description: "Share your vision, goals, and what you're looking to achieve. The more details you provide, the better we can tailor our solution for you.", placeholder: "Example: I'm launching an e-commerce platform...", button: "Continue" },
            step2: { title: "Let's Get To Know You", description: "Help us understand your project better with a few more details.", labels: { name: "Your Name", email: "Email Address", phone: "Phone Number", website: "Current Website", budget: "Estimated Budget", timeline: "Timeline", additional: "Additional Information" }, buttonBack: "Back", buttonSubmit: "Submit Request" },
            success: { title: "REQUEST SENT!", description: "Thank you for sharing your vision with us. Our team will analyze your requirements and reach out within 24 hours.", checkEmail: "Check your email", button: "Back to Home" }
        },
        Explore: {
            hero: { title: "未来", subtitle: "デザイン", description: "次世代のウェブ体験のための厳選されたインターフェース美学。" },
            stats: { systems: "システムオンライン" },
            filters: { all: "すべてのシステム", filterBtn: "フィルター", reset: "リセット", show: "表示", budget: "予算範囲", complexity: "複雑さ", tech: "技術スタック", aesthetics: "美学", noSignals: "信号が見つかりません", broaden: "検索パラメータを広げてみてください。", resetParams: "パラメータをリセット" },
            card: { viewProject: "プロジェクトを見る", pages: "ページ" }
        }
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    // Persist language preference
    useEffect(() => {
        const saved = localStorage.getItem("language") as Language;
        if (saved && translations[saved]) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translations[language],
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
