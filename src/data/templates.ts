import { Stethoscope, Flower, GraduationCap, Dumbbell, Component } from 'lucide-react'
import React from 'react'

export type Template = {
    id: string
    title: string
    description: string
    image: string
    gallery: string[]
    tags: string[]
    price: string
    features: string[]
    pages: number
    structure: 'Single Page' | 'Multi Page'
    type: 'Landing Page' | 'Full Website' | 'Dashboard' | 'E-commerce'
    cms: 'Static' | 'Dynamic (CMS)'
}

export type Sector = {
    id: string
    label: string
    icon: React.ElementType
    description: string
    color: string
}

export const sectors: Sector[] = [
    {
        id: 'healthcare',
        label: 'Healthcare',
        icon: Stethoscope,
        description: 'Medical clinics, hospitals, and wellness centers',
        color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
    },
    {
        id: 'yoga',
        label: 'Yoga & Wellness',
        icon: Flower,
        description: 'Yoga studios, meditation centers, and spas',
        color: 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
    },
    {
        id: 'school',
        label: 'Education',
        icon: GraduationCap,
        description: 'Schools, universities, and online courses',
        color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
    },
    {
        id: 'gym',
        label: 'Fitness & Gym',
        icon: Dumbbell,
        description: 'Gyms, personal trainers, and fitness clubs',
        color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
    },
    {
        id: 'real-estate',
        label: 'Real Estate',
        icon: Component,
        description: 'Property listings, agencies, and architecture',
        color: 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20'
    },
    {
        id: 'restaurant',
        label: 'Restaurant',
        icon: Component,
        description: 'Cafes, fine dining, and fast food',
        color: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
    },
    {
        id: 'ecommerce',
        label: 'E-Commerce',
        icon: Component,
        description: 'Online stores, shops, and marketplaces',
        color: 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20'
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        icon: Component,
        description: 'Personal, agency, and creative portfolios',
        color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20'
    }
]

// Helper to generate gallery images
const getGallery = (title: string, color: string) => [
    `https://placehold.co/600x400/${color}/ffffff?text=${encodeURIComponent(title + ' - Home')}`,
    `https://placehold.co/600x400/${color}/ffffff?text=${encodeURIComponent(title + ' - Services')}`,
    `https://placehold.co/600x400/${color}/ffffff?text=${encodeURIComponent(title + ' - Contact')}`
];

export const allTemplates: Record<string, Template[]> = {
    healthcare: [
        { id: 'health-1', title: 'MediCare Premium', description: 'A modern, trustworthy design for large hospitals.', image: '/images/templates/healthcare/health1-1.png', gallery: ['/images/templates/healthcare/health1-2.png', '/images/templates/healthcare/health1-3.png'], tags: ['Hospital', 'Booking', 'Medical', 'Professional'], price: '$499', features: ['Online Booking', 'Doctor Profiles', 'Departments'], pages: 12, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'health-2', title: 'Dental Pro', description: 'Clean and bright template specifically for dental clinics.', image: '/images/templates/healthcare/health2-1.png', gallery: ['/images/templates/healthcare/health2-2.png', '/images/templates/healthcare/health2-3.png', '/images/templates/healthcare/health2-4.png'], tags: ['Dental', 'Clinic', 'Smile', 'Minimalist'], price: '$299', features: ['Smile Gallery', 'Pricing', 'Contact Form'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'health-3', title: 'TeleHealth Connect', description: 'Digital-first interface for telemedicine platforms.', image: '/images/templates/healthcare/health3-1.png', gallery: ['/images/templates/healthcare/health3-2.png'], tags: ['Telemedicine', 'App', 'Health', 'Dynamic'], price: '$599', features: ['Video Integration', 'User Dashboard', 'Messaging'], pages: 1, structure: 'Single Page', type: 'Dashboard', cms: 'Dynamic (CMS)' },
        { id: 'health-4', title: 'Kids Care', description: 'Playful yet professional design for pediatricians.', image: 'https://placehold.co/600x400/60a5fa/ffffff?text=Kids+Care', gallery: getGallery('Kids Care', '60a5fa'), tags: ['Pediatric', 'Kids', 'Care', 'Dynamic'], price: '$349', features: ['Events Calendar', 'Parent Portal', 'Gallery'], pages: 8, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'health-5', title: 'LabTech Analytics', description: 'Scientific and data-focused layout for labs.', image: 'https://placehold.co/600x400/93c5fd/ffffff?text=LabTech+Analytics', gallery: getGallery('LabTech', '93c5fd'), tags: ['Lab', 'Science', 'Data', 'Professional'], price: '$249', features: ['Results Login', 'Services List', 'Research'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' }
    ],
    yoga: [
        { id: 'yoga-1', title: 'Zen Sanctuary', description: 'Peaceful design for yoga studios.', image: 'https://placehold.co/600x400/be123c/ffffff?text=Zen+Sanctuary', gallery: getGallery('Zen Sanctuary', 'be123c'), tags: ['Yoga', 'Peace', 'Zen', 'Minimalist'], price: '$299', features: ['Timetable', 'Instructor Bios', 'Mindfulness'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'yoga-2', title: 'Flow State', description: 'Dynamic layout for power yoga.', image: 'https://placehold.co/600x400/e11d48/ffffff?text=Flow+State', gallery: getGallery('Flow State', 'e11d48'), tags: ['Power', 'Flow', 'Energy', 'Dynamic'], price: '$199', features: ['Video Backgrounds', 'Class Signing', 'Blog'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'yoga-3', title: 'Mindful Retreat', description: 'Elegant design for wellness retreats.', image: 'https://placehold.co/600x400/f43f5e/ffffff?text=Mindful+Retreat', gallery: getGallery('Mindful Retreat', 'f43f5e'), tags: ['Retreat', 'Travel', 'Spa', 'Professional'], price: '$599', features: ['Booking Engine', 'Itinerary', 'Gallery'], pages: 10, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'yoga-4', title: 'Chakra Balance', description: 'Colorful template for holistic healing.', image: 'https://placehold.co/600x400/fb7185/ffffff?text=Chakra+Balance', gallery: getGallery('Chakra Balance', 'fb7185'), tags: ['Healing', 'Holistic', 'Colors', 'Dynamic'], price: '$249', features: ['Service Menu', 'About Me', 'Contact'], pages: 4, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'yoga-5', title: 'Yogi Personal', description: 'Brand template for influencers.', image: 'https://placehold.co/600x400/fda4af/ffffff?text=Yogi+Personal', gallery: getGallery('Yogi Personal', 'fda4af'), tags: ['Influencer', 'Personal', 'Social', 'Minimalist'], price: '$179', features: ['Instagram Feed', 'Affiliate Links', 'Bio'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Dynamic (CMS)' }
    ],
    school: [
        { id: 'school-1', title: 'Ivy League', description: 'Prestigious layout for universities.', image: 'https://placehold.co/600x400/b45309/ffffff?text=Ivy+League', gallery: getGallery('Ivy League', 'b45309'), tags: ['University', 'College', 'Education', 'Professional'], price: '$899', features: ['Course Catalog', 'Student Portal', 'Faculty'], pages: 20, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'school-2', title: 'Bright Future', description: 'Colorful design for primary schools.', image: 'https://placehold.co/600x400/d97706/ffffff?text=Bright+Future', gallery: getGallery('Bright Future', 'd97706'), tags: ['School', 'Kids', 'Learning', 'Dynamic'], price: '$499', features: ['News & Events', 'Admissions', 'Gallery'], pages: 8, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'school-3', title: 'EduTech Pro', description: 'Interface for online learning.', image: 'https://placehold.co/600x400/f59e0b/ffffff?text=EduTech+Pro', gallery: getGallery('EduTech Pro', 'f59e0b'), tags: ['LMS', 'Online', 'Course', 'Professional'], price: '$799', features: ['LMS Integration', 'Video Player', 'Quizzes'], pages: 15, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'school-4', title: 'Campus Life', description: 'Community template for high schools.', image: 'https://placehold.co/600x400/fbbf24/ffffff?text=Campus+Life', gallery: getGallery('Campus Life', 'fbbf24'), tags: ['Community', 'High School', 'Social', 'Dynamic'], price: '$449', features: ['Forum', 'Events', 'Clubs'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'school-5', title: 'Science Lab', description: 'Design for technical institutes.', image: 'https://placehold.co/600x400/fcd34d/ffffff?text=Science+Lab', gallery: getGallery('Science Lab', 'fcd34d'), tags: ['Tech', 'Science', 'Institute', 'Minimalist'], price: '$399', features: ['Research Papers', 'Lab Equipment', 'Staff'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Static' }
    ],
    gym: [
        { id: 'gym-1', title: 'Iron Strong', description: 'Dark design for bodybuilding gyms.', image: 'https://placehold.co/600x400/047857/ffffff?text=Iron+Strong', gallery: getGallery('Iron Strong', '047857'), tags: ['Gym', 'Fitness', 'Muscle', 'Dynamic'], price: '$349', features: ['Membership Plans', 'Trainer List', 'Store'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'gym-2', title: 'Fit Life', description: 'Clean layout for lifestyle gyms.', image: 'https://placehold.co/600x400/059669/ffffff?text=Fit+Life', gallery: getGallery('Fit Life', '059669'), tags: ['Lifestyle', 'Health', 'Clean', 'Minimalist'], price: '$199', features: ['Class Booking', 'Nutrition Blog', 'App Link'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Dynamic (CMS)' },
        { id: 'gym-3', title: 'CrossFit Box', description: 'Raw design for CrossFit places.', image: 'https://placehold.co/600x400/10b981/ffffff?text=CrossFit+Box', gallery: getGallery('CrossFit Box', '10b981'), tags: ['CrossFit', 'Raw', 'Training', 'Dynamic'], price: '$299', features: ['WOD Board', 'Events', 'Community'], pages: 4, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'gym-4', title: 'Personal Trainer', description: 'Transformation focused personal site.', image: 'https://placehold.co/600x400/34d399/ffffff?text=Personal+Trainer', gallery: getGallery('Personal Trainer', '34d399'), tags: ['Trainer', 'Coach', 'Personal', 'Professional'], price: '$189', features: ['Testimonials', 'Pricing', 'Before/After'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'gym-5', title: 'Wellness Studio', description: 'Soft design for pilates studios.', image: 'https://placehold.co/600x400/6ee7b7/ffffff?text=Wellness+Studio', gallery: getGallery('Wellness Studio', '6ee7b7'), tags: ['Pilates', 'Wellness', 'Soft', 'Minimalist'], price: '$349', features: ['Schedule', 'Instructor Bios', 'Shop'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Static' }
    ],
    'real-estate': [
        { id: 're-1', title: 'Luxury Living', description: 'High-end property listings.', image: 'https://placehold.co/600x400/3730a3/ffffff?text=Luxury+Living', gallery: getGallery('Luxury Living', '3730a3'), tags: ['Real Estate', 'Luxury', 'Home', 'Professional'], price: '$699', features: ['Property Search', 'Virtual Tours', 'Agent Profiles'], pages: 10, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 're-2', title: 'Urban Loft', description: 'Industrial design for city apartments.', image: 'https://placehold.co/600x400/4338ca/ffffff?text=Urban+Loft', gallery: getGallery('Urban Loft', '4338ca'), tags: ['Apartment', 'City', 'Modern', 'Minimalist'], price: '$249', features: ['Gallery', 'Map View', 'Contact'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 're-3', title: 'Family Home', description: 'Warm design for agencies.', image: 'https://placehold.co/600x400/4f46e5/ffffff?text=Family+Home', gallery: getGallery('Family Home', '4f46e5'), tags: ['Family', 'House', 'Agency', 'Professional'], price: '$599', features: ['Listing Grid', 'Mortgage Calc', 'Blog'], pages: 8, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 're-4', title: 'Modern Architect', description: 'Portfolio for architects.', image: 'https://placehold.co/600x400/6366f1/ffffff?text=Modern+Architect', gallery: getGallery('Modern Architect', '6366f1'), tags: ['Architect', 'Portfolio', 'Design', 'Minimalist'], price: '$399', features: ['Project Gallery', 'Services', 'Awards'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 're-5', title: 'Rental Hub', description: 'Interface for rental platforms.', image: 'https://placehold.co/600x400/818cf8/ffffff?text=Rental+Hub', gallery: getGallery('Rental Hub', '818cf8'), tags: ['Rental', 'Search', 'Platform', 'Dynamic'], price: '$899', features: ['User Dashboard', 'Search Filters', 'Map'], pages: 12, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' }
    ],
    restaurant: [
        { id: 'rest-1', title: 'Fine Dining', description: 'Sophisticated restaurant layout.', image: 'https://placehold.co/600x400/c2410c/ffffff?text=Fine+Dining', gallery: getGallery('Fine Dining', 'c2410c'), tags: ['Restaurant', 'Luxury', 'Food', 'Professional'], price: '$499', features: ['Reservation', 'Digital Menu', 'Chef Bio'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'rest-2', title: 'Urban Cafe', description: 'Trendy cafe design.', image: 'https://placehold.co/600x400/ea580c/ffffff?text=Urban+Cafe', gallery: getGallery('Urban Cafe', 'ea580c'), tags: ['Cafe', 'Coffee', 'Shop', 'Dynamic'], price: '$199', features: ['Menu', 'Location', 'Social Feed'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'rest-3', title: 'Burger Joint', description: 'Bold fast food style.', image: 'https://placehold.co/600x400/f97316/ffffff?text=Burger+Joint', gallery: getGallery('Burger Joint', 'f97316'), tags: ['Burger', 'Fast Food', 'Bold', 'Dynamic'], price: '$349', features: ['Online Order', 'Menu', 'Offers'], pages: 4, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'rest-4', title: 'Fresh Greens', description: 'Clean design for salad bars.', image: 'https://placehold.co/600x400/fb923c/ffffff?text=Fresh+Greens', gallery: getGallery('Fresh Greens', 'fb923c'), tags: ['Health', 'Salad', 'Fresh', 'Minimalist'], price: '$299', features: ['Nutrition Info', 'Locations', 'Philosophy'], pages: 3, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'rest-5', title: 'Bakery Love', description: 'Pastel design for bakeries.', image: 'https://placehold.co/600x400/fdba74/ffffff?text=Bakery+Love', gallery: getGallery('Bakery Love', 'fdba74'), tags: ['Bakery', 'Sweet', 'Cake', 'Minimalist'], price: '$399', features: ['Gallery', 'Custom Orders', 'Menu'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' }
    ],
    ecommerce: [
        { id: 'ecom-1', title: 'Fashion Forward', description: 'Trendy fashion store.', image: 'https://placehold.co/600x400/be185d/ffffff?text=Fashion+Forward', gallery: getGallery('Fashion Forward', 'be185d'), tags: ['Fashion', 'Shop', 'Style', 'Dynamic'], price: '$799', features: ['Product Grid', 'Cart', 'Checkout'], pages: 15, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' },
        { id: 'ecom-2', title: 'Tech Gadgets', description: 'Sleek electronics store.', image: 'https://placehold.co/600x400/db2777/ffffff?text=Tech+Gadgets', gallery: getGallery('Tech Gadgets', 'db2777'), tags: ['Tech', 'Shop', 'Modern', 'Professional'], price: '$699', features: ['Comparisons', 'Specs', 'Reviews'], pages: 12, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' },
        { id: 'ecom-3', title: 'Handmade Crafts', description: 'Artistic goods shop.', image: 'https://placehold.co/600x400/ec4899/ffffff?text=Handmade+Crafts', gallery: getGallery('Handmade Crafts', 'ec4899'), tags: ['Crafts', 'Art', 'Handmade', 'Minimalist'], price: '$499', features: ['Artist Bio', 'Gallery', 'Shop'], pages: 8, structure: 'Multi Page', type: 'E-commerce', cms: 'Static' },
        { id: 'ecom-4', title: 'Beauty Bliss', description: 'Cosmetics store.', image: 'https://placehold.co/600x400/f472b6/ffffff?text=Beauty+Bliss', gallery: getGallery('Beauty Bliss', 'f472b6'), tags: ['Beauty', 'Shop', 'Makeup', 'Dynamic'], price: '$599', features: ['Looks', 'Ingredients', 'Shop'], pages: 10, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' },
        { id: 'ecom-5', title: 'Home Decor', description: 'Interior products shop.', image: 'https://placehold.co/600x400/f9a8d4/ffffff?text=Home+Decor', gallery: getGallery('Home Decor', 'f9a8d4'), tags: ['Home', 'Decor', 'Shop', 'Minimalist'], price: '$649', features: ['Room View', 'Collections', 'Shop'], pages: 14, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' }
    ],
    portfolio: [
        { id: 'port-1', title: 'Creative Agency', description: 'Bold agency site.', image: 'https://placehold.co/600x400/7e22ce/ffffff?text=Creative+Agency', gallery: getGallery('Creative Agency', '7e22ce'), tags: ['Agency', 'Creative', 'Design', 'Professional'], price: '$499', features: ['Cases', 'Services', 'Contact'], pages: 7, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'port-2', title: 'Freelance Pro', description: 'Personal freelancer site.', image: 'https://placehold.co/600x400/9333ea/ffffff?text=Freelance+Pro', gallery: getGallery('Freelance Pro', '9333ea'), tags: ['Freelance', 'Portfolio', 'Me', 'Minimalist'], price: '$249', features: ['Resume', 'Portfolio', 'Contact'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'port-3', title: 'Minimalist', description: 'Simple work focus.', image: 'https://placehold.co/600x400/a855f7/ffffff?text=Minimalist', gallery: getGallery('Minimalist', 'a855f7'), tags: ['Minimal', 'Design', 'Clean', 'Minimalist'], price: '$199', features: ['Gallery', 'About', 'Contact'], pages: 3, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'port-4', title: 'Photographer', description: 'Photo gallery heavy.', image: 'https://placehold.co/600x400/c084fc/ffffff?text=Photographer', gallery: getGallery('Photographer', 'c084fc'), tags: ['Photo', 'Gallery', 'Art', 'Dynamic'], price: '$399', features: ['Masonry Grid', 'Albums', 'Booking'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'port-5', title: 'Developer', description: 'Code focused portfolio.', image: 'https://placehold.co/600x400/d8b4fe/ffffff?text=Developer', gallery: getGallery('Developer', 'd8b4fe'), tags: ['Code', 'Dev', 'Tech', 'Professional'], price: '$189', features: ['Snippets', 'Github', 'Projects'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' }
    ]
}

export function getTemplateById(id: string): Template | undefined {
    for (const sector in allTemplates) {
        const template = allTemplates[sector].find(t => t.id === id);
        if (template) return template;
    }
    return undefined;
}
