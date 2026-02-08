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
        { id: 'health-4', title: 'Kids Care', description: 'Playful yet professional design for pediatricians.', image: '/images/templates/healthcare/health4-1.png', gallery: ['/images/templates/healthcare/health4-2.png', '/images/templates/healthcare/health4-3.png', '/images/templates/healthcare/health4-4.png'], tags: ['Pediatric', 'Kids', 'Care', 'Dynamic'], price: '$349', features: ['Events Calendar', 'Parent Portal', 'Gallery'], pages: 8, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'health-5', title: 'LabTech Analytics', description: 'Scientific and data-focused layout for labs.', image: '/images/templates/healthcare/health5-1.png', gallery: ['/images/templates/healthcare/health5-2.png', '/images/templates/healthcare/health5-3.png'], tags: ['Lab', 'Science', 'Data', 'Professional'], price: '$249', features: ['Results Login', 'Services List', 'Research'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' }
    ],
    yoga: [
        { id: 'yoga-1', title: 'Zen Sanctuary', description: 'Peaceful design for yoga studios.', image: '/images/templates/yoga/yoga1-1.png', gallery: ['/images/templates/yoga/yoga1-2.png', '/images/templates/yoga/yoga1-3.png', '/images/templates/yoga/yoga1-4.png', '/images/templates/yoga/yoga1-5.png'], tags: ['Yoga', 'Peace', 'Zen', 'Minimalist'], price: '$299', features: ['Timetable', 'Instructor Bios', 'Mindfulness'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'yoga-2', title: 'Flow State', description: 'Dynamic layout for power yoga.', image: '/images/templates/yoga/yoga2-1.png', gallery: ['/images/templates/yoga/yoga2-2.png', '/images/templates/yoga/yoga2-3.png', '/images/templates/yoga/yoga2-4.png'], tags: ['Power', 'Flow', 'Energy', 'Dynamic'], price: '$199', features: ['Video Backgrounds', 'Class Signing', 'Blog'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'yoga-3', title: 'Mindful Retreat', description: 'Elegant design for wellness retreats.', image: '/images/templates/yoga/yoga3-1.png', gallery: ['/images/templates/yoga/yoga3-2.png', '/images/templates/yoga/yoga3-3.png', '/images/templates/yoga/yoga3-4.png', '/images/templates/yoga/yoga3-5.png', '/images/templates/yoga/yoga3-6.png'], tags: ['Retreat', 'Travel', 'Spa', 'Professional'], price: '$599', features: ['Booking Engine', 'Itinerary', 'Gallery'], pages: 10, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'yoga-4', title: 'Chakra Balance', description: 'Colorful template for holistic healing.', image: '/images/templates/yoga/yoga4-1.png', gallery: ['/images/templates/yoga/yoga4-2.png', '/images/templates/yoga/yoga4-3.png', '/images/templates/yoga/yoga4-4.png'], tags: ['Healing', 'Holistic', 'Colors', 'Dynamic'], price: '$249', features: ['Service Menu', 'About Me', 'Contact'], pages: 4, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'yoga-5', title: 'Yogi Personal', description: 'Brand template for influencers.', image: '/images/templates/yoga/yoga5-1.png', gallery: ['/images/templates/yoga/yoga5-2.png', '/images/templates/yoga/yoga5-3.png', '/images/templates/yoga/yoga5-4.png'], tags: ['Influencer', 'Personal', 'Social', 'Minimalist'], price: '$179', features: ['Instagram Feed', 'Affiliate Links', 'Bio'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Dynamic (CMS)' }
    ],
    school: [
        { id: 'school-1', title: 'Ivy League', description: 'Prestigious layout for universities.', image: '/images/templates/school/school1-1.png', gallery: ['/images/templates/school/school1-2.png', '/images/templates/school/school1-3.png'], tags: ['University', 'College', 'Education', 'Professional'], price: '$899', features: ['Course Catalog', 'Student Portal', 'Faculty'], pages: 20, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'school-2', title: 'Bright Future', description: 'Colorful design for primary schools.', image: '/images/templates/school/school2-1.png', gallery: ['/images/templates/school/school2-2.png', '/images/templates/school/school2-3.png', '/images/templates/school/school2-4.png'], tags: ['School', 'Kids', 'Learning', 'Dynamic'], price: '$499', features: ['News & Events', 'Admissions', 'Gallery'], pages: 8, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'school-3', title: 'EduTech Pro', description: 'Interface for online learning.', image: '/images/templates/school/school3-1.png', gallery: ['/images/templates/school/school3-2.png', '/images/templates/school/school3-3.png'], tags: ['LMS', 'Online', 'Course', 'Professional'], price: '$799', features: ['LMS Integration', 'Video Player', 'Quizzes'], pages: 15, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'school-4', title: 'Campus Life', description: 'Community template for high schools.', image: '/images/templates/school/school4-1.png', gallery: ['/images/templates/school/school4-2.png', '/images/templates/school/school4-3.png', '/images/templates/school/school4-4.png', '/images/templates/school/school4-5.png'], tags: ['Community', 'High School', 'Social', 'Dynamic'], price: '$449', features: ['Forum', 'Events', 'Clubs'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'school-5', title: 'Science Lab', description: 'Design for technical institutes.', image: '/images/templates/school/school5-1.png', gallery: ['/images/templates/school/school5-2.png', '/images/templates/school/school5-3.png'], tags: ['Tech', 'Science', 'Institute', 'Minimalist'], price: '$399', features: ['Research Papers', 'Lab Equipment', 'Staff'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Static' }
    ],
    gym: [
        { id: 'gym-1', title: 'Iron Strong', description: 'Dark design for bodybuilding gyms.', image: '/images/templates/gym/gym1-1.png', gallery: ['/images/templates/gym/gym1-2.png', '/images/templates/gym/gym1-3.png', '/images/templates/gym/gym1-4.png'], tags: ['Gym', 'Fitness', 'Muscle', 'Dynamic'], price: '$349', features: ['Membership Plans', 'Trainer List', 'Store'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'gym-2', title: 'Fit Life', description: 'Clean layout for lifestyle gyms.', image: '/images/templates/gym/gym2-1.png', gallery: ['/images/templates/gym/gym2-2.png', '/images/templates/gym/gym2-3.png', '/images/templates/gym/gym2-4.png'], tags: ['Lifestyle', 'Health', 'Clean', 'Minimalist'], price: '$199', features: ['Class Booking', 'Nutrition Blog', 'App Link'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Dynamic (CMS)' },
        { id: 'gym-3', title: 'CrossFit Box', description: 'Raw design for CrossFit places.', image: '/images/templates/gym/gym3-1.png', gallery: ['/images/templates/gym/gym3-2.png', '/images/templates/gym/gym3-3.png', '/images/templates/gym/gym3-4.png'], tags: ['CrossFit', 'Raw', 'Training', 'Dynamic'], price: '$299', features: ['WOD Board', 'Events', 'Community'], pages: 4, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'gym-4', title: 'Personal Trainer', description: 'Transformation focused personal site.', image: '/images/templates/gym/gym4-1.png', gallery: ['/images/templates/gym/gym4-2.png', '/images/templates/gym/gym4-3.png', '/images/templates/gym/gym4-4.png'], tags: ['Trainer', 'Coach', 'Personal', 'Professional'], price: '$189', features: ['Testimonials', 'Pricing', 'Before/After'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'gym-5', title: 'Wellness Studio', description: 'Soft design for pilates studios.', image: '/images/templates/gym/gym5-1.png', gallery: ['/images/templates/gym/gym5-2.png', '/images/templates/gym/gym5-3.png', '/images/templates/gym/gym5-4.png'], tags: ['Pilates', 'Wellness', 'Soft', 'Minimalist'], price: '$349', features: ['Schedule', 'Instructor Bios', 'Shop'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Static' }
    ],
    'real-estate': [
        { id: 're-1', title: 'Luxury Living', description: 'High-end property listings.', image: '/images/templates/real-estate/re1-1.png', gallery: ['/images/templates/real-estate/re1-2.png', '/images/templates/real-estate/re1-3.png', '/images/templates/real-estate/re1-4.png', '/images/templates/real-estate/re1-5.png'], tags: ['Real Estate', 'Luxury', 'Home', 'Professional'], price: '$699', features: ['Property Search', 'Virtual Tours', 'Agent Profiles'], pages: 10, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 're-2', title: 'Urban Loft', description: 'Industrial design for city apartments.', image: '/images/templates/real-estate/re2-1.png', gallery: ['/images/templates/real-estate/re2-2.png', '/images/templates/real-estate/re2-3.png'], tags: ['Apartment', 'City', 'Modern', 'Minimalist'], price: '$249', features: ['Gallery', 'Map View', 'Contact'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 're-3', title: 'Family Home', description: 'Warm design for agencies.', image: '/images/templates/real-estate/re3-1.png', gallery: ['/images/templates/real-estate/re3-2.png', '/images/templates/real-estate/re3-3.png', '/images/templates/real-estate/re3-4.png'], tags: ['Family', 'House', 'Agency', 'Professional'], price: '$599', features: ['Listing Grid', 'Mortgage Calc', 'Blog'], pages: 8, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 're-4', title: 'Modern Architect', description: 'Portfolio for architects.', image: '/images/templates/real-estate/re4-1.png', gallery: ['/images/templates/real-estate/re4-2.png', '/images/templates/real-estate/re4-3.png', '/images/templates/real-estate/re4-4.png'], tags: ['Architect', 'Portfolio', 'Design', 'Minimalist'], price: '$399', features: ['Project Gallery', 'Services', 'Awards'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 're-5', title: 'Rental Hub', description: 'Interface for rental platforms.', image: '/images/templates/real-estate/re5-1.png', gallery: ['/images/templates/real-estate/re5-2.png', '/images/templates/real-estate/re5-3.png', '/images/templates/real-estate/re5-4.png', '/images/templates/real-estate/re5-5.png'], tags: ['Rental', 'Search', 'Platform', 'Dynamic'], price: '$899', features: ['User Dashboard', 'Search Filters', 'Map'], pages: 12, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' }
    ],
    restaurant: [
        { id: 'rest-1', title: 'Fine Dining', description: 'Sophisticated restaurant layout.', image: '/images/templates/restaurant/rest1-1.png', gallery: ['/images/templates/restaurant/rest1-2.png', '/images/templates/restaurant/rest1-3.png','/images/templates/restaurant/rest1-4.png'], tags: ['Restaurant', 'Luxury', 'Food', 'Professional'], price: '$499', features: ['Reservation', 'Digital Menu', 'Chef Bio'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'rest-2', title: 'Urban Cafe', description: 'Trendy cafe design.', image: '/images/templates/restaurant/rest2-1.png', gallery: ['/images/templates/restaurant/rest2-2.png', '/images/templates/restaurant/rest2-3.png'], tags: ['Cafe', 'Coffee', 'Shop', 'Dynamic'], price: '$199', features: ['Menu', 'Location', 'Social Feed'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'rest-3', title: 'Burger Joint', description: 'Bold fast food style.', image: '/images/templates/restaurant/rest3-1.png', gallery: ['/images/templates/restaurant/rest3-2.png', '/images/templates/restaurant/rest3-3.png'], tags: ['Burger', 'Fast Food', 'Bold', 'Dynamic'], price: '$349', features: ['Online Order', 'Menu', 'Offers'], pages: 4, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'rest-4', title: 'Fresh Greens', description: 'Clean design for salad bars.', image: '/images/templates/restaurant/rest4-1.png', gallery: ['/images/templates/restaurant/rest4-2.png', '/images/templates/restaurant/rest4-3.png', '/images/templates/restaurant/rest4-4.png'], tags: ['Health', 'Salad', 'Fresh', 'Minimalist'], price: '$299', features: ['Nutrition Info', 'Locations', 'Philosophy'], pages: 3, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'rest-5', title: 'Bakery Love', description: 'Pastel design for bakeries.', image: '/images/templates/restaurant/rest5-1.png', gallery: ['/images/templates/restaurant/rest5-2.png', '/images/templates/restaurant/rest5-3.png'], tags: ['Bakery', 'Sweet', 'Cake', 'Minimalist'], price: '$399', features: ['Gallery', 'Custom Orders', 'Menu'], pages: 5, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' }
    ],
    ecommerce: [
        { id: 'ecom-1', title: 'Fashion Forward', description: 'Trendy fashion store.', image: '/images/templates/ecommerce/ecom1-1.png', gallery: ['/images/templates/ecommerce/ecom1-2.png', '/images/templates/ecommerce/ecom1-3.png', '/images/templates/ecommerce/ecom1-4.png'], tags: ['Fashion', 'Shop', 'Style', 'Dynamic'], price: '$799', features: ['Product Grid', 'Cart', 'Checkout'], pages: 15, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' },
        { id: 'ecom-2', title: 'Tech Gadgets', description: 'Sleek electronics store.', image: '/images/templates/ecommerce/ecom2-1.png', gallery: ['/images/templates/ecommerce/ecom2-2.png', '/images/templates/ecommerce/ecom2-3.png'], tags: ['Tech', 'Shop', 'Modern', 'Professional'], price: '$699', features: ['Comparisons', 'Specs', 'Reviews'], pages: 12, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' },
        { id: 'ecom-3', title: 'Handmade Crafts', description: 'Artistic goods shop.', image: '/images/templates/ecommerce/ecom3-1.png', gallery: ['/images/templates/ecommerce/ecom3-2.png', '/images/templates/ecommerce/ecom3-2.png'], tags: ['Crafts', 'Art', 'Handmade', 'Minimalist'], price: '$499', features: ['Artist Bio', 'Gallery', 'Shop'], pages: 8, structure: 'Multi Page', type: 'E-commerce', cms: 'Static' },
        { id: 'ecom-4', title: 'Beauty Bliss', description: 'Cosmetics store.', image: '/images/templates/ecommerce/ecom4-1.png', gallery: ['/images/templates/ecommerce/ecom4-2.png', '/images/templates/ecommerce/ecom4-3.png'], tags: ['Beauty', 'Shop', 'Makeup', 'Dynamic'], price: '$599', features: ['Looks', 'Ingredients', 'Shop'], pages: 10, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' },
        { id: 'ecom-5', title: 'Home Decor', description: 'Interior products shop.', image: '/images/templates/ecommerce/ecom5-1.png', gallery: ['/images/templates/ecommerce/ecom5-2.png', '/images/templates/ecommerce/ecom5-3.png'], tags: ['Home', 'Decor', 'Shop', 'Minimalist'], price: '$649', features: ['Room View', 'Collections', 'Shop'], pages: 14, structure: 'Multi Page', type: 'E-commerce', cms: 'Dynamic (CMS)' }
    ],
    portfolio: [
        { id: 'port-1', title: 'Creative Agency', description: 'Bold agency site.', image: '/images/templates/portfolio/port1-1.png', gallery: ['/images/templates/portfolio/port1-2.png', '/images/templates/portfolio/port1-3.png', '/images/templates/portfolio/port1-4.png', '/images/templates/portfolio/port1-5.png'], tags: ['Agency', 'Creative', 'Design', 'Professional'], price: '$499', features: ['Cases', 'Services', 'Contact'], pages: 7, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'port-2', title: 'Freelance Pro', description: 'Personal freelancer site.', image: '/images/templates/portfolio/port2-1.png', gallery: ['/images/templates/portfolio/port2-2.png', '/images/templates/portfolio/port2-3.png', '/images/templates/portfolio/port2-4.png', '/images/templates/portfolio/port2-5.png', '/images/templates/portfolio/port2-6.png'], tags: ['Freelance', 'Portfolio', 'Me', 'Minimalist'], price: '$249', features: ['Resume', 'Portfolio', 'Contact'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' },
        { id: 'port-3', title: 'Minimalist', description: 'Simple work focus.', image: '/images/templates/portfolio/port3-1.png', gallery: ['/images/templates/portfolio/port3-2.png', '/images/templates/portfolio/port3-3.png', '/images/templates/portfolio/port3-4.png'], tags: ['Minimal', 'Design', 'Clean', 'Minimalist'], price: '$199', features: ['Gallery', 'About', 'Contact'], pages: 3, structure: 'Multi Page', type: 'Full Website', cms: 'Static' },
        { id: 'port-4', title: 'Photographer', description: 'Photo gallery heavy.', image: '/images/templates/portfolio/port4-1.png', gallery: ['/images/templates/portfolio/port4-2.png', '/images/templates/portfolio/port4-3.png', '/images/templates/portfolio/port4-4.png'], tags: ['Photo', 'Gallery', 'Art', 'Dynamic'], price: '$399', features: ['Masonry Grid', 'Albums', 'Booking'], pages: 6, structure: 'Multi Page', type: 'Full Website', cms: 'Dynamic (CMS)' },
        { id: 'port-5', title: 'Developer', description: 'Code focused portfolio.', image: '/images/templates/portfolio/port5-1.png', gallery: ['/images/templates/portfolio/port5-2.png', '/images/templates/portfolio/port5-3.png', '/images/templates/portfolio/port5-4.png'], tags: ['Code', 'Dev', 'Tech', 'Professional'], price: '$189', features: ['Snippets', 'Github', 'Projects'], pages: 1, structure: 'Single Page', type: 'Landing Page', cms: 'Static' }
    ]
}

export function getTemplateById(id: string): Template | undefined {
    for (const sector in allTemplates) {
        const template = allTemplates[sector].find(t => t.id === id);
        if (template) return template;
    }
    return undefined;
}
