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

    return (
        <section
            id="home"
            className="relative w-full h-screen z-10 overflow-hidden flex flex-col items-center justify-center border-none py-6 px-4 md:px-8 select-none"
        >
            {/* Main Content Container - Flex layout sized to prevent scrollbars */}
            {/* z-30 and mix-blend-difference allows expanded hover circles to invert the text to black */}
            <div 
                className="container mx-auto relative z-30 flex flex-col items-center justify-center h-full max-h-[85vh] w-full max-w-6xl border-none pointer-events-none mix-blend-difference"
                style={{ mixBlendMode: "difference" }}
            >
                
                {/* 4-Row Uniform Font Editorial Grid */}
                {/* Generous vertical gap-4 to gap-10 to prevent vertical row merging */}
                <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 select-none my-auto max-w-5xl text-white">
                    
                    {/* Row 1: YOUR WEBSITE [Laptop Slideshow Box] */}
                    <div className="flex items-center justify-between w-full pl-[2%] pr-[3%] md:pl-[4%] md:pr-[6%]">
                        {/* Text wrapper with absolute anchoring to lock slideshow position */}
                        <div className="relative h-[1.4em] flex items-center flex-1 justify-start z-20 mix-blend-difference">
                            <AnimatePresence initial={false}>
                                <motion.span
                                    key={lineState1.key}
                                    initial={{ opacity: 0, y: "-30%" }}
                                    animate={{ opacity: 1, y: "0%" }}
                                    exit={{ opacity: 0, y: "30%" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className={`flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[5.8vw] md:text-[8.2vw] ${lineState1.fontClass}`}
                                    style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                                >
                                    {lineState1.text.split(" ").map((word, idx) => (
                                        <span key={idx} className="inline-block">{word}</span>
                                    ))}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* Laptop slideshow box at z-10 (pointer-events-auto allows slideshow hover scaling) */}
                        <div className="relative aspect-[4/3] w-[18%] md:w-[24%] lg:w-[13vw] rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] bg-card hover:scale-105 transition-transform duration-500 ease-out pointer-events-auto z-10">
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
                    <div className="flex items-center justify-between w-full pl-[3%] pr-[2%] md:pl-[6%] md:pr-[4%] -mt-1 sm:-mt-2">
                        {/* Wave slideshow box at z-10 */}
                        <div className="relative aspect-[4/3] w-[18%] md:w-[24%] lg:w-[13vw] rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] bg-card hover:scale-105 transition-transform duration-500 ease-out pointer-events-auto z-10">
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
                                    className={`flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[7.5vw] md:text-[8.2vw] ${lineState2.fontClass}`}
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
                                    className={`flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[7.5vw] md:text-[8.2vw] ${lineState3.fontClass}`}
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
                    <div className="flex items-center justify-between w-full pl-[3%] pr-[2%] md:pl-[6%] md:pr-[4%]">
                        {/* Text wrapper with absolute left-0 anchoring */}
                        <div className="relative h-[1.4em] flex items-center flex-1 justify-start z-20 mix-blend-difference">
                            <AnimatePresence initial={false}>
                                <motion.span
                                    key={lineState4.key}
                                    initial={{ opacity: 0, y: "-30%" }}
                                    animate={{ opacity: 1, y: "0%" }}
                                    exit={{ opacity: 0, y: "30%" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className={`flex items-center gap-[0.3em] origin-center transform-gpu text-white tracking-tighter hover:text-primary transition-colors duration-300 mix-blend-difference text-[6.2vw] md:text-[8.2vw] ${lineState4.fontClass}`}
                                    style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                                >
                                    {lineState4.text.split(" ").map((word, idx) => (
                                        <span key={idx} className="inline-block">{word}</span>
                                    ))}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 z-10">
                            {/* Mobile slideshow box at z-10 */}
                            <div className="relative aspect-[3/4] w-[12%] md:w-[16%] lg:w-[9vw] rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] bg-card hover:scale-105 transition-transform duration-500 ease-out pointer-events-auto">
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
                            <svg className="w-[5vw] h-[5vw] md:w-[6vw] md:h-[6vw] max-w-[80px] max-h-[80px] text-white rotate-0 translate-y-[0.8vw] animate-bounce pointer-events-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>

                </div>

            </div>

            {/* Floating Circular CTA Buttons at z-10 (GET FREE AUDIT Left/Bottom, START PROJECT Right/Bottom) */}
            
            {/* Left/Bottom: GET FREE AUDIT Circle */}
            <div className="absolute bottom-[5%] left-[8%] md:top-1/2 md:bottom-auto md:left-8 md:-translate-y-1/2 z-10 opacity-0 animate-fade-in animate-duration-1000" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
                <Magnetic>
                    <Link
                        href="/audit"
                        className="group relative flex flex-col items-center justify-center text-center w-28 h-28 md:w-36 md:h-36 rounded-full transition-all duration-500 hover:scale-110"
                    >
                        {/* 10x Scaling background mask */}
                        <div className="absolute inset-0 rounded-full bg-background/5 backdrop-blur-3xl border border-primary/20 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[10] group-hover:bg-white z-10" />
                        
                        <span className="relative z-20 flex flex-col items-center justify-center gap-1 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] leading-tight text-white transition-colors duration-500 group-hover:text-black">
                            <span>GET FREE</span>
                            <span>AUDIT</span>
                            <ScanLine className="w-3.5 h-3.5 mt-1 transition-all duration-500 group-hover:rotate-180 group-hover:text-black group-hover:stroke-black" />
                        </span>
                    </Link>
                </Magnetic>
            </div>

            {/* Right/Bottom: START PROJECT Circle */}
            <div className="absolute bottom-[5%] right-[8%] md:top-1/2 md:bottom-auto md:right-8 md:-translate-y-1/2 z-10 opacity-0 animate-fade-in animate-duration-1000" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
                <Magnetic>
                    <Link
                        href="/investment"
                        className="group relative flex flex-col items-center justify-center text-center w-28 h-28 md:w-36 md:h-36 rounded-full transition-all duration-500 hover:scale-110"
                    >
                        {/* 10x Scaling background mask */}
                        <div className="absolute inset-0 rounded-full bg-primary transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[10] group-hover:bg-white z-10" />
                        
                        <span className="relative z-20 flex flex-col items-center justify-center gap-1 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] leading-tight text-white transition-colors duration-500 group-hover:text-black">
                            <span>START</span>
                            <span>PROJECT</span>
                            <ArrowRight className="w-3.5 h-3.5 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black" />
                        </span>
                    </Link>
                </Magnetic>
            </div>

        </section>
    );
};

export default HeroSection;
