export const photographerInfo = {
  name: "Raju Das & Kuushaal Debnaath",
  experience: "10 Years",
  location: "Howrah, West Bengal, India",
  stats: [
    { target: 350, suffix: "+", label: "Weddings" },
    { target: 10, suffix: " Years", label: "Experience" },
    { target: 15, suffix: "", label: "Cities" },
    { target: 600, suffix: "+", label: "Happy Couples" }
  ],
  bio: "Raju Das & Kuushaal Debnaath are the award-winning principal founders behind The Gallery Creation & Shoot Insights, based in Howrah, West Bengal. With over 10 years of professional experience, they have traveled across 15+ cities, capturing the raw emotion, grandeur, and quiet intimacies of love. Their signature style blends editorial fine-art with candid photojournalism, crafting visuals that resonate for generations.",
  philosophy: "We believe that photography is not merely documenting an event; it is the art of capturing an emotion in its purest form. Timeless memories, treasured forever."
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" }
];

export const portfolioImages = [
  {
    id: 1,
    src: "/portfolio/wedding-1.jpg",
    alt: "Luxury wedding couple standing together in scenic outdoor garden setting",
    category: "wedding",
    width: 800,
    height: 1200
  },
  {
    id: 2,
    src: "/portfolio/wedding-2.jpg",
    alt: "Indian wedding couple holding hands walking down aisle covered in flower petals",
    category: "wedding",
    width: 800,
    height: 533
  },
  {
    id: 3,
    src: "/portfolio/wedding-3.jpg",
    alt: "Close up shot of Indian bride and groom during wedding rituals",
    category: "wedding",
    width: 800,
    height: 1000
  },
  {
    id: 4,
    src: "/portfolio/wedding-4.jpg",
    alt: "Wedding couple embracing under soft warm light outdoors",
    category: "wedding",
    width: 800,
    height: 600
  },
  {
    id: 5,
    src: "/portfolio/prewedding-1.jpg",
    alt: "Close up of wedding rings resting on top of elegant bridal flowers",
    category: "pre-wedding",
    width: 800,
    height: 533
  },
  {
    id: 6,
    src: "/portfolio/prewedding-2.jpg",
    alt: "Pre-wedding couple standing hand-in-hand smiling at sunset",
    category: "pre-wedding",
    width: 800,
    height: 1200
  },
  {
    id: 7,
    src: "/portfolio/prewedding-3.jpg",
    alt: "Couple walking through scenic open field together laughing",
    category: "pre-wedding",
    width: 800,
    height: 533
  },
  {
    id: 8,
    src: "/portfolio/portrait-1.jpg",
    alt: "Fine art personal portrait of a woman looking directly at camera with natural lighting",
    category: "portraits",
    width: 800,
    height: 1200
  },
  {
    id: 9,
    src: "/portfolio/portrait-2.jpg",
    alt: "Elegant studio portrait of a man looking thoughtful in dark background",
    category: "portraits",
    width: 800,
    height: 1200
  },
  {
    id: 10,
    src: "/portfolio/events-1.jpg",
    alt: "Corporate gala night dinner setup with luxury table settings and warm lighting",
    category: "events",
    width: 800,
    height: 533
  },
  {
    id: 11,
    src: "/portfolio/events-2.jpg",
    alt: "Group of friends toasted with champagne glasses during event reception",
    category: "events",
    width: 800,
    height: 533
  },
  {
    id: 12,
    src: "/portfolio/events-3.jpg",
    alt: "Luxury ballroom reception hall decorated with grand chandeliers and flower displays",
    category: "events",
    width: 800,
    height: 1200
  },
  {
    id: 13,
    src: "/portfolio/wedding-1.jpg",
    alt: "Cinematic wedding highlights film teaser video placeholder",
    category: "film",
    width: 800,
    height: 533,
    isVideo: true
  },
  {
    id: 14,
    src: "/portfolio/prewedding-2.jpg",
    alt: "Romantic sunset prewedding cinematic teaser video placeholder",
    category: "film",
    width: 800,
    height: 533,
    isVideo: true
  },
  {
    id: 15,
    src: "/portfolio/wedding-2.jpg",
    alt: "Short vertical wedding dance instagram reels placeholder",
    category: "reels",
    width: 800,
    height: 1200,
    isReel: true
  },
  {
    id: 16,
    src: "/portfolio/prewedding-1.jpg",
    alt: "Fine-art portrait shoot short vertical reels placeholder",
    category: "reels",
    width: 800,
    height: 1200,
    isReel: true
  }
];

export const services = [
  {
    id: "wedding-coverage",
    name: "Wedding Coverage",
    description: "Complete luxury documentation of your wedding day, capturing every detail, ritual, and emotion in cinematic style.",
    price: "₹1,50,000",
    deliverables: [
      "12 Hours of coverage by Raju Das, Kuushaal Debnaath & team",
      "500+ High-resolution edited digital photos",
      "Signature hardbound luxury wedding album (40 pages)",
      "Online private gallery with 1-year access",
      "Delivery timeline: 6-8 weeks"
    ]
  },
  {
    id: "pre-wedding-shoot",
    name: "Pre-Wedding Shoot",
    description: "An intimate, personalized photo session in stunning locations, telling the story of your love before the big day.",
    price: "₹60,000",
    deliverables: [
      "6 Hours of outdoor shooting",
      "2-3 Costume changes",
      "80+ High-resolution edited digital photos",
      "1-Minute cinematic slideshow video",
      "Delivery timeline: 3-4 weeks"
    ]
  },
  {
    id: "portrait-session",
    name: "Portrait Session",
    description: "Fine-art personal, couple, or family portraits that bring out your character and beauty in a sophisticated setting.",
    price: "₹25,000",
    deliverables: [
      "2 Hours of session time (studio/outdoor)",
      "20+ High-resolution edited digital photos",
      "Professional styling advice",
      "Digital delivery & print release",
      "Delivery timeline: 2 weeks"
    ]
  },
  {
    id: "event-coverage",
    name: "Event Coverage",
    description: "Elite coverage for corporate events, galas, fashion shows, and milestones, delivering polished high-impact media.",
    price: "₹80,000",
    deliverables: [
      "8 Hours of coverage",
      "200+ High-resolution edited photos",
      "Fast-turnaround preview within 48 hours",
      "Full digital gallery delivery",
      "Delivery timeline: 3 weeks"
    ]
  }
];

import testimonialsData from './testimonials.json';
export const testimonials = testimonialsData;

export const timeline = [
  {
    year: "2016",
    title: "The Genesis",
    description: "Raju Das & Kuushaal Debnaath complete their photography studies and start taking freelance wedding projects in Kolkata and Howrah."
  },
  {
    year: "2019",
    title: "The Gallery Creation Founded",
    description: "Establish a physical studio space on Jogendra NATH Mukherjee Road in Howrah, assembling a team of passionate videographers and editors."
  },
  {
    year: "2022",
    title: "Going National",
    description: "Expanded coverage to 8 major Indian cities, capturing high-profile weddings and cultural fusions under the brand The Gallery Creation & Shoot Insights."
  },
  {
    year: "2024",
    title: "Milestone: 250 Weddings",
    description: "Featured in leading Indian bridal platforms. Celebrated the milestone of documenting 250 love stories."
  },
  {
    year: "2026",
    title: "Present Day",
    description: "Now boasting over 10 years of experience, 350+ weddings documented across 15 cities, and a reputation for unmatched luxury photography."
  }
];
