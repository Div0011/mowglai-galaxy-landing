"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Message {
    id: string;
    sender: 'bot' | 'user';
    text: string;
    options?: { label: string; action: () => void; path?: string; external?: boolean }[];
}

interface ChatbotModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- KNOWLEDGE BASE ---
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
        options: [{ label: "Contact Us", path: "/contact" }]
    },
    {
        keywords: ['turnaround', 'how long', 'duration', 'time', 'timeline', 'weeks', 'days'],
        response: "Project timelines vary by complexity. A 'Basic' single-page site typically launches in 5-7 days, while 'Advanced' sites take 10-14 days. 'Epic' enterprise solutions follow a custom roadmap.",
        options: [{ label: "View Process", path: "/mowglai-brochure.html", external: true }]
    },
    {
        keywords: ['ecommerce', 'shop', 'store', 'selling', 'products', 'shopify', 'woocommerce'],
        response: "Yes, we build high-performance e-commerce platforms. We ensure secure payment gateways, inventory management, and seamless user checkouts.",
        options: [{ label: "View Services", path: "/services" }]
    },
    {
        keywords: ['brochure', 'download', 'pdf', 'catalog', 'deck'],
        response: "You can download our detailed brochure to explore our full capabilities and success stories.",
        options: [{ label: "Open Brochure", path: "/mowglai-brochure.html", external: true }]
    },
    {
        keywords: ['technology', 'stack', 'tech', 'react', 'nextjs', 'typescript', 'framework'],
        response: "We exclusively use the 2025 Tech Stack: React, Next.js, TypeScript, Tailwind CSS, and Supabase. This ensures your digital asset is fast, secure, and future-proof.",
        options: [{ label: "See Our DNA", path: "/our-dna" }]
    },
    {
        keywords: ['guarantee', 'warranty', 'support', 'maintenance', 'fix'],
        response: "We provide 30 days of post-launch support for bug fixes and minor tweaks. Ongoing maintenance packages are available for long-term peace of mind.",
        options: [{ label: "Contact Support", path: "/contact" }]
    }
];

const FUTURE_SERVICES = [
    'blockchain', 'crypto', 'nft', 'web3', 'vr', 'ar', 'metaverse',
    'video editing', 'video production', 'photography', 'social media management',
    'iot', 'hardware', 'training', 'courses', 'tutorial'
];

const ChatbotModal = ({ isOpen, onClose }: ChatbotModalProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Drafting State
    const [draftStep, setDraftStep] = useState<'none' | 'service' | 'details'>('none');
    const [draftData, setDraftData] = useState({ service: '', details: '' });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const handleDraftInputRef = useRef<(text: string) => void>(() => {});
    const startDraftingRef = useRef<() => void>(() => {});
    const router = useRouter();

    const addMessage = useCallback((text: string, sender: 'user' | 'bot', options?: Message['options']) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), text, sender, options }]);
    }, []);

    const simulateTyping = useCallback((callback: () => void) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            callback();
        }, 1000);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleDraftInput = useCallback((text: string) => {
        addMessage(text, 'user');

        if (draftStep === 'service') {
            setDraftData(prev => ({ ...prev, service: text }));
            setDraftStep('details');
            simulateTyping(() => {
                addMessage(`Understood: ${text}. Now, please describe your requirements, goals, or any specific features you need. The more details, the accurate our initial assessment will be.`, 'bot');
            });
        }
        else if (draftStep === 'details') {
            setDraftData(prev => ({ ...prev, details: text }));
            setDraftStep('none');

            simulateTyping(() => {
                const mailSubject = `New Project Request: ${draftData.service}`;
                const mailBody = `Service Requested: ${draftData.service}\n\nProject Details:\n${text}`;
                const mailToLink = `mailto:info@mowglai.in?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

                addMessage("I have compiled your request dossier. You can now transmit this directly to our command center.", 'bot');
                addMessage(`Summary:\nService: ${draftData.service}\nDetails: ${text}`, 'bot', [
                    { label: "Send Request via Email", action: () => { window.location.href = mailToLink; } },
                    { label: "Restart", action: () => startDraftingRef.current() }
                ]);
            });
        }
    }, [addMessage, draftData.service, draftStep, simulateTyping]);

    const startDrafting = useCallback(() => {
        setDraftStep('service');
        addMessage("Initiating Protocol: Project Request.", 'bot');
        simulateTyping(() => {
            addMessage("First, what kind of service do you require? (e.g., Web Design, Development, SEO, Full Redesign)", 'bot', [
                { label: "Web Design", action: () => handleDraftInputRef.current("Web Design") },
                { label: "Development", action: () => handleDraftInputRef.current("Development") },
                { label: "Full Custom Project", action: () => handleDraftInputRef.current("Full Custom Project") }
            ]);
        });
    }, [addMessage, simulateTyping]);

    useEffect(() => {
        handleDraftInputRef.current = handleDraftInput;
    }, [handleDraftInput]);

    useEffect(() => {
        startDraftingRef.current = startDrafting;
    }, [startDrafting]);

    // --- BRAIN ---
    const processInput = useCallback((input: string) => {
        // If in drafting mode, route to draft handler
        if (draftStep !== 'none') {
            handleDraftInput(input);
            return;
        }

        // 1. User Message
        addMessage(input, 'user');
        const lowerInput = input.toLowerCase();

        simulateTyping(() => {
            // Priority Check: "Write request", "Hire", "Project"
            if (lowerInput.includes('hire') || lowerInput.includes('project') || lowerInput.includes('request') || lowerInput.includes('proposal')) {
                startDraftingRef.current();
                return;
            }

            // 0. CHECK FAQ KNOWLEDGE BASE FIRST
            const faqMatch = FAQ_KNOWLEDGE_BASE.find(item => item.keywords.some(k => lowerInput.includes(k)));
            if (faqMatch) {
                const opts = faqMatch.options?.map(opt => {
                    const isExternal = 'external' in opt ? opt.external : false;
                    const path = opt.path;
                    return {
                        label: opt.label,
                        action: () => {
                            if (isExternal) {
                                window.open(path, '_blank');
                            } else {
                                onClose();
                                router.push(path);
                            }
                        },
                        path: path,
                        external: isExternal
                    };
                });

                addMessage(faqMatch.response, 'bot', opts);
                return;
            }

            // 2. Check for Future/Unsupported Services
            const futureMatch = FUTURE_SERVICES.find(keyword => lowerInput.includes(keyword));
            if (futureMatch) {
                addMessage(`That is an ambitious frontier! While we are currently focused on core web technologies, our labs are in the process of upgrading our capabilities to include ${futureMatch.toUpperCase()}.`, 'bot');
                addMessage("Would you like to explore our current high-performance solutions or join our waitlist for future tech?", 'bot', [
                    { label: "Explore Current Services", action: () => { onClose(); router.push('/services'); } },
                    { label: "Contact for Waitlist", action: () => { onClose(); router.push('/contact'); } }
                ]);
                return;
            }

            // 3. Check for Supported Services & Intents
            let matchType = '';
            if (SUPPORTED_SERVICES.web_design.some(k => lowerInput.includes(k))) matchType = 'design';
            else if (SUPPORTED_SERVICES.development.some(k => lowerInput.includes(k))) matchType = 'dev';
            else if (SUPPORTED_SERVICES.strategy.some(k => lowerInput.includes(k))) matchType = 'strat';
            else if (SUPPORTED_SERVICES.database.some(k => lowerInput.includes(k))) matchType = 'data';
            else if (SUPPORTED_SERVICES.investment.some(k => lowerInput.includes(k))) matchType = 'price';
            else if (SUPPORTED_SERVICES.about.some(k => lowerInput.includes(k))) matchType = 'about';
            else if (SUPPORTED_SERVICES.contact.some(k => lowerInput.includes(k))) matchType = 'contact';
            else if (SUPPORTED_SERVICES.social.some(k => lowerInput.includes(k))) matchType = 'social';

            // 4. Responses based on match
            if (matchType === 'design') {
                addMessage("Aesthetic excellence is our specialty. We craft visually stunning, responsive interfaces that merge art with precision.", 'bot', [
                    { label: "See Design Services", action: () => { onClose(); router.push('/services'); } },
                    { label: "View Portfolio", action: () => { onClose(); router.push('/work'); } }
                ]);
            } else if (matchType === 'dev') {
                addMessage("Robust engineering is in our DNA. Whether it's a complex web app, CMS, or API integration, we build for scale and security.", 'bot', [
                    { label: "View Dev Solutions", action: () => { onClose(); router.push('/services'); } },
                    { label: "Start a Project", action: () => { onClose(); router.push('/contact'); } }
                ]);
            } else if (matchType === 'strat') {
                addMessage("Growth requires map-making. Our strategy team assists with SEO, Content Curation, and Market Analysis to position your brand globally.", 'bot', [
                    { label: "Explore Strategy", action: () => { onClose(); router.push('/services'); } }
                ]);
            } else if (matchType === 'data') {
                addMessage("Data is the lifeblood of modern business. We design secure, high-performance database architectures and cloud solutions.", 'bot', [
                    { label: "Data Services", action: () => { onClose(); router.push('/services'); } }
                ]);
            } else if (matchType === 'price') {
                addMessage("Financial clarity is key. We offer transparent investment plans: Basic, Advanced, and Epic, tailored to your growth stage.", 'bot', [
                    { label: "View Investment Plans", action: () => { onClose(); router.push('/investment'); } }
                ]);
            } else if (matchType === 'about') {
                addMessage("Mowglai is a global collective of Digital Artisans. We operate Monday to Saturday across multiple time zones, ensuring we align perfectly with your schedule.", 'bot');
                addMessage("Our philosophy is 'Growth in the Wild'—combining rapid Adaptation with resilient Survival strategies. We have delivered 100+ projects in 15+ countries.", 'bot', [
                    { label: "Read Our DNA", action: () => { onClose(); router.push('/our-dna'); } },
                    { label: "Meet the Team", action: () => { onClose(); router.push('/about'); } }
                ]);
            } else if (matchType === 'contact') {
                addMessage("Communication is the first step to evolution. You can reach our command center directly via email or through our social channels.", 'bot', [
                    { label: "Go to Contact Page", action: () => { onClose(); router.push('/contact'); } },
                    { label: "Email: info@mowglai.in", action: () => { window.location.href = "mailto:info@mowglai.in"; } }
                ]);
            } else if (matchType === 'social') {
                addMessage("Join our tribe in the digital wild. Follow us for updates, insights, and success stories.", 'bot', [
                    { label: "Instagram", action: () => { window.open("https://www.instagram.com/mowglai_", "_blank"); } },
                    { label: "LinkedIn", action: () => { window.open("https://linkedin.com/company/mowglai", "_blank"); } },
                    { label: "X", action: () => { window.open("https://x.com/mowglai_in", "_blank"); } }
                ]);
            } else {
                // Fallback or Generic
                addMessage("I am processing your signal. While I didn't catch a specific service request, our team can likely assist. We specialize in Web Design, Development, and Digital Strategy.", 'bot', [
                    { label: "Start a Project Request", action: () => startDraftingRef.current() },
                    { label: "View All Services", action: () => { onClose(); router.push('/services'); } },
                    { label: "Contact Human Command", action: () => { onClose(); router.push('/contact'); } }
                ]);
            }
        });
    }, [addMessage, draftStep, handleDraftInput, onClose, router, simulateTyping]);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    sender: 'bot',
                    text: "Greetings, traveler. I am the Mowglai Guardian. I can guide you to the perfect digital solution. Tell me, what are you looking to build or achieve?",
                    options: [
                        { label: "I need a Website", action: () => processInput("I need a Website") },
                        { label: "Start a Project Request", action: () => startDrafting() },
                        { label: "View Pricing", action: () => processInput("View Pricing") }
                    ]
                }
            ]);
        }
    }, [isOpen, messages.length, processInput, startDrafting]);

    const recommendPlan = useCallback((plan: string) => {
        addMessage(plan, 'user');
        simulateTyping(() => {
            let text = "";
            if (plan === "BASIC") text = "Excellent. The BASIC plan is perfect for startups needing a single-page powerhouse to establish a footprint.";
            if (plan === "ADVANCED") text = "A wise choice. The ADVANCED plan offers multi-page depth, analytics, and enhanced SEO for growing brands.";
            if (plan === "EPIC") text = "The EPIC plan provides custom-engineered digital ecosystems and unlimited scalability for market leaders.";

            addMessage(text, 'bot', [
                { label: "View Details & Pricing", action: () => { onClose(); router.push('/investment'); } },
                { label: "Request This Plan", action: () => { onClose(); router.push('/contact'); } }
            ]);
        });
    }, [addMessage, onClose, router, simulateTyping]);

    const handleSend = useCallback(() => {
        if (!inputValue.trim()) return;
        const temp = inputValue;
        setInputValue('');
        processInput(temp);
    }, [inputValue, processInput]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[70]"
                    />

                    {/* Chat Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] bg-background border border-primary/20 rounded-[2rem] shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] z-[71] flex flex-col overflow-hidden origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-primary/10 bg-primary/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-primary/10 text-primary animate-pulse">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl text-primary">Mowglai Guardian</h3>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Sparkles size={8} className="text-primary" />
                                        AI Online
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-primary/10">
                                <X size={20} className="text-muted-foreground" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-primary/20">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "p-4 rounded-2xl text-base leading-relaxed shadow-sm",
                                        msg.sender === 'user'
                                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                                            : "bg-primary/10 text-foreground border border-primary/10 rounded-tl-sm"
                                    )}>
                                        <div className="whitespace-pre-wrap">{msg.text}</div>
                                    </div>

                                    {/* Options Buttons */}
                                    {msg.options && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {msg.options.map((option, idx) => (
                                                option.path && !option.external ? (
                                                    <Link
                                                        key={idx}
                                                        href={option.path}
                                                        onClick={() => { onClose(); option.action(); }}
                                                        className="px-4 py-2 rounded-full border border-primary/30 bg-background/50 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                                    >
                                                        {option.label}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        key={idx}
                                                        onClick={option.action}
                                                        className="px-4 py-2 rounded-full border border-primary/30 bg-background/50 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                                    >
                                                        {option.label}
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    )}

                                    <span className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">
                                        {msg.sender === 'bot' ? 'Guardian AI' : 'You'}
                                    </span>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="mr-auto flex items-center gap-1 p-4 bg-primary/5 rounded-2xl rounded-tl-sm">
                                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-primary/10 bg-background/80 backdrop-blur-md">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={draftStep !== 'none' ? "Enter details..." : "Ask about plans, services..."}
                                    className="flex-1 bg-primary/5 hover:bg-primary/10 transition-colors border-none rounded-full px-6 py-3 text-base focus:ring-1 focus:ring-primary/50 outline-none placeholder:text-muted-foreground/50 text-foreground"
                                />
                                <Button type="submit" size="icon" className="rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 transition-all active:scale-95 shadow-lg shadow-primary/20">
                                    <Send size={18} />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ChatbotModal;
