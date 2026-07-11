"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";
import { ArrowRight, ScanLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const box1Images = [
    "/images/templates/portfolio/port1-1.png",
    "/images/templates/portfolio/port2-2.png",
    "/images/templates/real-estate/re1-1.png",
    "/images/templates/real-estate/re2-2.png",
];

const box2Images = [
    "/images/templates/yoga/yoga1-1.png",
    "/images/templates/yoga/yoga4-3.png",
    "/images/templates/gym/gym1-1.png",
    "/images/templates/gym/gym3-2.png",
];

const box4Images = [
    "/images/templates/school/school2-3.png",
    "/images/templates/school/school1-1.png",
    "/images/templates/ecommerce/ecom1-1.png",
    "/images/templates/ecommerce/ecom2-3.png",
];

const HeroSection = () => {
    const { t, language } = useLanguage();
    const [slideIndex, setSlideIndex] = useState(0);
    const [tick, setTick] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    // Automatic slideshow timer
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 3-second interval timer for revolving texts
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Scroll listener to keep slideshows static during scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fontStyles = [
        "font-sans font-black tracking-tighter uppercase",
        "font-serif italic font-light tracking-wide",
        "font-mono tracking-widest uppercase font-medium",
        "font-serif font-extrabold uppercase tracking-tight",
    ];

    const getAlternates = (rowNum: number, index: number) => {
        // index is 0 or 1
        switch (language) {
            case "hi":
                if (rowNum === 1) return index === 0 ? "आपकी वेबसाइट" : "आपका मंच";
                if (rowNum === 2) return index === 0 ? "है आपकी" : "बनाता है";
                if (rowNum === 3) return index === 0 ? "खिड़की" : "द्वार";
                return index === 0 ? "दुनिया के लिए" : "भविष्य के लिए";
            case "es":
                if (rowNum === 1) return index === 0 ? "TU SITIO WEB" : "TU PLATAFORMA";
                if (rowNum === 2) return index === 0 ? "ES TU" : "DEFINE";
                if (rowNum === 3) return index === 0 ? "VENTANA AL" : "PORTAL AL";
                return index === 0 ? "MUNDO." : "FUTURO.";
            case "fr":
                if (rowNum === 1) return index === 0 ? "VOTRE SITE WEB" : "VOTRE PLATEFORME";
                if (rowNum === 2) return index === 0 ? "EST VOTRE" : "DÉFINIT";
                if (rowNum === 3) return index === 0 ? "FENÊTRE SUR LE" : "PORTAIL VERS LE";
                return index === 0 ? "MONDE." : "AVENIR.";
            case "ja":
                if (rowNum === 1) return index === 0 ? "あなたのウェブサイトは" : "あなたのプラットフォームは";
                if (rowNum === 2) return index === 0 ? "あなたの" : "象徴する";
                if (rowNum === 3) return index === 0 ? "世界への窓" : "未来への扉";
                return index === 0 ? "です。" : "になります。";
            case "en":
            default:
                if (rowNum === 1) return index === 0 ? "YOUR WEBSITE" : "YOUR PLATFORM";
                if (rowNum === 2) return index === 0 ? "IS YOUR" : "DEFINES";
                if (rowNum === 3) return index === 0 ? "WINDOW TO" : "PORTAL TO";
                return index === 0 ? "THE WORLD." : "THE FUTURE.";
        }
    };

    const getLineState = (lineNum: number) => {
        // Synchronized trigger: all rows update on the same tick
        const updatesCount = tick;
        const alternateIndex = updatesCount % 2;
        const fontIndex = updatesCount % 4;

        return {
            text: getAlternates(lineNum, alternateIndex),
            fontClass: fontStyles[fontIndex],
            key: `${lineNum}-${updatesCount}`,
        };
    };

    const lineState1 = getLineState(1);
    const lineState2 = getLineState(2);
    const lineState3 = getLineState(3);
    const lineState4 = getLineState(4);

    // Calculate dynamic styles for scroll parallax (offsetting upward scroll and fading out)
    const getSlideshowStyle = () => {
        const opacity = Math.max(0, 1 - scrollY / 400);
        return {
            transform: `translateY(${scrollY}px) translateZ(0)`,
            opacity,
            pointerEvents: opacity === 0 ? "none" : ("auto" as "none" | "auto"),
        };
    };

    const slideshowStyle = getSlideshowStyle();

    return (
        <section
            id="home"
            className="relative w-full h-[100dvh] z-10 overflow-hidden flex flex-col items-center justify-center border-none py-6 px-4 md:px-8 select-none"
        >
            {/* Main Content Container - Flex layout sized to prevent scrollbars */}
            {/* max-h-[72dvh] reserves vertical space for the buttons at the bottom on mobile */}
            {/* z-30 and mix-blend-difference allows expanded hover circles to invert the text to black */}
            <div 
                className="container mx-auto relative z-30 flex flex-col items-center justify-center h-full max-h-[72dvh] md:max-h-[85vh] w-full max-w-6xl border-none pointer-events-none mix-blend-difference"
                style={{ mixBlendMode: "difference" }}
            >
                
                {/* 1. DESKTOP ONLY: 4-Row Uniform Font Editorial Grid */}
                <div className="hidden md:flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 select-none my-auto w-full max-w-5xl text-white">
                    
                    {/* Row 1: YOUR WEBSITE [Laptop Slideshow Box] */}
                    <div className="flex items-center justify-between w-full pl-[4%] pr-[6%]">
                        {/* Text wrapper with absolute anchoring to lock slideshow position */}
                        <div className="relative h-[1.4em] flex items-center flex-1 justify-start z-20 mix-blend-difference">
                            <AnimatePresence initial={false}>
                                <motion.span
                                    key={lineState1.key}
                                    initial={{ opacity: 0, y: "-30%" }}
                                    animate={{ opacity: 1, y: "0%" }}
                                    exit={{ opacity: 0, y: "30%" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className={`absolute left-0 flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] lg:text-[8.5vw] ${lineState1.fontClass}`}
                                    style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                                >
                                    {lineState1.text.split(" ").map((word, idx) => (
                                        <span key={idx} className="inline-block">{word}</span>
                                    ))}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* Laptop slideshow box */}
                        <div 
                            className="relative aspect-[4/3] w-[24%] lg:w-[13vw] rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] bg-card hover:scale-105 transition-transform duration-500 ease-out pointer-events-auto z-10 transform-gpu"
                            style={slideshowStyle}
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={box1Images[slideIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image 
                                        src={box1Images[slideIndex]} 
                                        alt="Website Preview Laptop" 
                                        fill 
                                        unoptimized 
                                        className="object-cover object-top" 
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Row 2: [Wave Slideshow Box] IS YOUR */}
                    <div className="flex items-center justify-between w-full pl-[6%] pr-[4%] -mt-2">
                        {/* Wave slideshow box (offset exactly 4px to the right via translate-x-[4px]) */}
                        <div 
                            className="relative aspect-[4/3] w-[24%] lg:w-[13vw] rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] bg-card hover:scale-105 transition-transform duration-500 ease-out pointer-events-auto z-10 transform-gpu translate-x-[4px]"
                            style={slideshowStyle}
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={box2Images[slideIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image 
                                        src={box2Images[slideIndex]} 
                                        alt="Website Preview Wave" 
                                        fill 
                                        unoptimized 
                                        className="object-cover object-top" 
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Text wrapper with absolute right-0 anchoring */}
                        <div className="relative h-[1.4em] flex items-center flex-1 justify-end z-20 mix-blend-difference">
                            <AnimatePresence initial={false}>
                                <motion.span
                                    key={lineState2.key}
                                    initial={{ opacity: 0, y: "-30%" }}
                                    animate={{ opacity: 1, y: "0%" }}
                                    exit={{ opacity: 0, y: "30%" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className={`absolute right-0 flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] lg:text-[8.5vw] ${lineState2.fontClass}`}
                                    style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                                >
                                    {lineState2.text.split(" ").map((word, idx) => (
                                        <span key={idx} className="inline-block">{word}</span>
                                    ))}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Row 3: WINDOW TO (Centered, no slideshow box) */}
                    <div className="flex items-center justify-center w-full">
                        {/* Text wrapper centered via left-1/2 -translate-x-1/2 */}
                        <div className="relative h-[1.4em] flex items-center justify-center w-full z-20 mix-blend-difference">
                            <AnimatePresence initial={false}>
                                <motion.span
                                    key={lineState3.key}
                                    initial={{ opacity: 0, y: "-30%" }}
                                    animate={{ opacity: 1, y: "0%" }}
                                    exit={{ opacity: 0, y: "30%" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] lg:text-[8.5vw] ${lineState3.fontClass}`}
                                    style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                                >
                                    {lineState3.text.split(" ").map((word, idx) => (
                                        <span key={idx} className="inline-block">{word}</span>
                                    ))}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Row 4: THE WORLD. [Mobile Slideshow Box] [Down Arrow] */}
                    <div className="flex items-center justify-between w-full pl-[6%] pr-[4%]">
                        {/* Text wrapper with absolute left-0 anchoring */}
                        <div className="relative h-[1.4em] flex items-center flex-1 justify-start z-20 mix-blend-difference">
                            <AnimatePresence initial={false}>
                                <motion.span
                                    key={lineState4.key}
                                    initial={{ opacity: 0, y: "-30%" }}
                                    animate={{ opacity: 1, y: "0%" }}
                                    exit={{ opacity: 0, y: "30%" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className={`absolute left-0 flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] lg:text-[8.5vw] ${lineState4.fontClass}`}
                                    style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                                >
                                    {lineState4.text.split(" ").map((word, idx) => (
                                        <span key={idx} className="inline-block">{word}</span>
                                    ))}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-8 z-10">
                            {/* Mobile inline slideshow box */}
                            <div 
                                className="relative aspect-[3/4] w-[16%] lg:w-[9vw] rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] bg-card hover:scale-105 transition-transform duration-500 ease-out pointer-events-auto z-10 transform-gpu"
                                style={slideshowStyle}
                            >
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={box4Images[slideIndex]}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <Image 
                                            src={box4Images[slideIndex]} 
                                            alt="Website Preview Mobile" 
                                            fill 
                                            unoptimized 
                                            className="object-cover object-top" 
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Down Arrow indicator */}
                            <svg className="w-[6vw] h-[6vw] max-w-[80px] max-h-[80px] text-white rotate-0 translate-y-[0.8vw] animate-bounce pointer-events-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>

                </div>

                {/* 2. MOBILE ONLY: Vertically Stacked Alternate Layout (Slideshow -> Text -> Slideshow -> Text...) */}
                {/* mt-2 and gap-[2.4vh] shift the mobile elements upward away from the bottom buttons */}
                <div className="flex md:hidden flex-col gap-[2.4vh] select-none mt-2 mb-auto w-full text-white">
                    
                    {/* Item 1: Slideshow 1 (Centered at top, leaving some margin) */}
                    <div className="w-full flex justify-center pt-2 pointer-events-auto">
                        <div 
                            className="relative aspect-[4/3] w-[42vw] rounded-lg border border-white/10 overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.15)] bg-card transform-gpu z-10"
                            style={slideshowStyle}
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={box1Images[slideIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image 
                                        src={box1Images[slideIndex]} 
                                        alt="Website Preview Laptop Mobile" 
                                        fill 
                                        unoptimized 
                                        className="object-cover object-top" 
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Item 2: Text 1 (YOUR WEBSITE) */}
                    <div className="relative h-[1.4em] flex items-center justify-start pl-[8%] z-20 mix-blend-difference">
                        <AnimatePresence initial={false}>
                            <motion.span
                                key={lineState1.key}
                                initial={{ opacity: 0, y: "-30%" }}
                                animate={{ opacity: 1, y: "0%" }}
                                exit={{ opacity: 0, y: "30%" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute left-[8%] flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] ${lineState1.fontClass}`}
                                style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                            >
                                {lineState1.text.split(" ").map((word, idx) => (
                                    <span key={idx} className="inline-block">{word}</span>
                                ))}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Item 3: Slideshow 2 (Middle right side) */}
                    <div className="w-full flex justify-end pr-[8%] pointer-events-auto">
                        <div 
                            className="relative aspect-[4/3] w-[42vw] rounded-lg border border-white/10 overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.15)] bg-card transform-gpu z-10 translate-x-[4px]"
                            style={slideshowStyle}
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={box2Images[slideIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image 
                                        src={box2Images[slideIndex]} 
                                        alt="Website Preview Wave Mobile" 
                                        fill 
                                        unoptimized 
                                        className="object-cover object-top" 
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Item 4: Text 2 (IS YOUR) */}
                    <div className="relative h-[1.4em] flex items-center justify-end pr-[8%] z-20 mix-blend-difference">
                        <AnimatePresence initial={false}>
                            <motion.span
                                key={lineState2.key}
                                initial={{ opacity: 0, y: "-30%" }}
                                animate={{ opacity: 1, y: "0%" }}
                                exit={{ opacity: 0, y: "30%" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute right-[8%] flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] ${lineState2.fontClass}`}
                                style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                            >
                                {lineState2.text.split(" ").map((word, idx) => (
                                    <span key={idx} className="inline-block">{word}</span>
                                ))}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Item 5: Slideshow 3 (Left hand side, bottom, above the button) */}
                    <div className="w-full flex justify-start pl-[8%] pointer-events-auto">
                        <div 
                            className="relative aspect-[3/4] w-[28vw] rounded-lg border border-white/10 overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.15)] bg-card transform-gpu z-10"
                            style={slideshowStyle}
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={box4Images[slideIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image 
                                        src={box4Images[slideIndex]} 
                                        alt="Website Preview Mobile Mobile" 
                                        fill 
                                        unoptimized 
                                        className="object-cover object-top" 
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Item 6: Text 3 (WINDOW TO) */}
                    <div className="relative h-[1.4em] flex items-center justify-center w-full z-20 mix-blend-difference">
                        <AnimatePresence initial={false}>
                            <motion.span
                                key={lineState3.key}
                                initial={{ opacity: 0, y: "-30%" }}
                                animate={{ opacity: 1, y: "0%" }}
                                exit={{ opacity: 0, y: "30%" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] ${lineState3.fontClass}`}
                                style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                            >
                                {lineState3.text.split(" ").map((word, idx) => (
                                    <span key={idx} className="inline-block">{word}</span>
                                ))}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Item 7: Text 4 (THE WORLD. + Arrow) */}
                    <div className="relative h-[1.4em] flex items-center justify-between w-full pl-[8%] pr-[8%] z-20 mix-blend-difference">
                        <AnimatePresence initial={false}>
                            <motion.span
                                key={lineState4.key}
                                initial={{ opacity: 0, y: "-30%" }}
                                animate={{ opacity: 1, y: "0%" }}
                                exit={{ opacity: 0, y: "30%" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute left-[8%] flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[8.2vw] ${lineState4.fontClass}`}
                                style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                            >
                                {lineState4.text.split(" ").map((word, idx) => (
                                    <span key={idx} className="inline-block">{word}</span>
                                ))}
                            </motion.span>
                        </AnimatePresence>
                        
                        {/* Down Arrow indicator aligned to right side in bottom line */}
                        <svg className="absolute right-[8%] w-[5vw] h-[5vw] max-w-[80px] max-h-[80px] text-white rotate-0 translate-y-[0.8vw] animate-bounce pointer-events-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>

                </div>

            </div>

            {/* Floating Circular CTA Buttons at z-10 (GET FREE AUDIT Left, START PROJECT Right) */}
            {/* Positioned side-by-side at bottom-8 on mobile, and vertically centered on desktop/laptop */}
            
            {/* Left Edge / Bottom Left: GET FREE AUDIT Circle */}
            <div className="absolute bottom-8 left-[8%] top-auto translate-y-0 md:top-1/2 md:-translate-y-1/2 md:left-8 md:bottom-auto z-10 opacity-0 animate-fade-in animate-duration-1000" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
                <Magnetic>
                    <Link
                        href="/audit"
                        className="group relative flex flex-col items-center justify-center text-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full transition-all duration-500 hover:scale-110"
                    >
                        {/* 10x Scaling background mask */}
                        <div className="absolute inset-0 rounded-full bg-background/5 backdrop-blur-3xl border border-primary/20 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[10] group-hover:bg-white z-10" />
                        
                        <span className="relative z-20 flex flex-col items-center justify-center gap-0.5 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] leading-tight text-white transition-colors duration-500 group-hover:text-black">
                            <span>GET FREE</span>
                            <span>AUDIT</span>
                            <ScanLine className="w-3 h-3 md:w-4 md:h-4 mt-0.5 transition-all duration-500 group-hover:rotate-180 group-hover:text-black group-hover:stroke-black" />
                        </span>
                    </Link>
                </Magnetic>
            </div>

            {/* Right Edge / Bottom Right: START PROJECT Circle */}
            <div className="absolute bottom-8 right-[8%] top-auto translate-y-0 md:top-1/2 md:-translate-y-1/2 md:right-8 md:bottom-auto z-10 opacity-0 animate-fade-in animate-duration-1000" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
                <Magnetic>
                    <Link
                        href="/investment"
                        className="group relative flex flex-col items-center justify-center text-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full transition-all duration-500 hover:scale-110"
                    >
                        {/* 10x Scaling background mask */}
                        <div className="absolute inset-0 rounded-full bg-primary transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[10] group-hover:bg-white z-10" />
                        
                        <span className="relative z-20 flex flex-col items-center justify-center gap-0.5 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] leading-tight text-white transition-colors duration-500 group-hover:text-black">
                            <span>START</span>
                            <span>PROJECT</span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 mt-0.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black" />
                        </span>
                    </Link>
                </Magnetic>
            </div>

        </section>
    );
};

export default HeroSection;
