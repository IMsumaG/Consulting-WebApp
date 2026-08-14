export type CourseMode = "ONLINE" | "PHYSICAL" | "HYBRID";

export type PublicCourse = {
  slug: string;
  title: string;
  category: string;
  overview: string;
  duration: string;
  deliveryMode: CourseMode;
  fee: string;
  imageUrl: string;
  featured?: boolean;
  cohortLabel: string;
  cohortId: string;
  cohortDates: string;
  sessionTimes: string;
  venue: string;
};

export type InsightArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  body: string[];
};

export type Testimonial = {
  authorName: string;
  role: string;
  company: string;
  message: string;
};

export const brand = {
  name: "Merxano Consulting",
  domain: "merxano.co.tz",
  tag: "Training and consulting for professionals and organisations in Tanzania",
  phone: "+255 746 000 000",
  whatsapp: "255746000000",
  email: "training@merxano.co.tz",
  location: "Dar es Salaam, Tanzania",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/calendar", label: "Calendar" },
  { href: "/corporate", label: "Corporate" },
  { href: "/consulting", label: "Consulting" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const courses: PublicCourse[] = [
  {
    slug: "project-management-professional",
    title: "Project Management Professional",
    category: "Project Management",
    overview:
      "A practical programme for professionals who want to plan and deliver projects with clarity, structure, and confidence.",
    duration: "5 days",
    deliveryMode: "HYBRID",
    fee: "TZS 650,000",
    imageUrl: "/images/courses/project-management.jpg",
    featured: true,
    cohortLabel: "Open cohort",
    cohortId: "course-pmp-open-2026",
    cohortDates: "12 - 16 September 2026",
    sessionTimes: "09:00 - 13:00 EAT",
    venue: "Dar es Salaam / Zoom",
  },
  {
    slug: "business-analysis-certification-pathway",
    title: "Business Analysis Certification Pathway",
    category: "Business Analysis",
    overview:
      "A focused course for analysts who want to sharpen requirements, stakeholder, and process analysis skills.",
    duration: "4 days",
    deliveryMode: "ONLINE",
    fee: "TZS 480,000",
    imageUrl: "/images/courses/business-analysis.jpg",
    featured: true,
    cohortLabel: "Few seats left",
    cohortId: "course-ba-open-2026",
    cohortDates: "10 - 13 October 2026",
    sessionTimes: "18:00 - 21:00 EAT",
    venue: "Zoom",
  },
  {
    slug: "agile-scrum-delivery",
    title: "Agile & Scrum Delivery",
    category: "Agile",
    overview:
      "Hands-on agile training for teams that want to improve delivery flow, collaboration, and continuous learning.",
    duration: "3 days",
    deliveryMode: "PHYSICAL",
    fee: "TZS 420,000",
    imageUrl: "/images/courses/agile-scrum.jpg",
    cohortLabel: "Open cohort",
    cohortId: "course-agile-open-2026",
    cohortDates: "26 - 28 September 2026",
    sessionTimes: "09:00 - 13:00 EAT",
    venue: "Dar es Salaam",
  },
];

export const services = [
  {
    title: "Professional Training",
    text: "Training experiences that are practical, structured, and geared toward immediate workplace use.",
  },
  {
    title: "Corporate Upskilling",
    text: "Tailored learning for teams that need capability uplift without generic classroom noise.",
  },
  {
    title: "Consulting & Advisory",
    text: "Support for teams that need sharper thinking, clearer direction, and smoother execution.",
  },
] as const;

export const testimonials: Testimonial[] = [
  {
    authorName: "Asha M.",
    role: "Operations Lead",
    company: "Dar es Salaam Logistics",
    message:
      "The training was practical, well structured, and immediately useful for our team.",
  },
  {
    authorName: "Juma K.",
    role: "Business Analyst",
    company: "Financial Services Tanzania",
    message:
      "Merxano turned a complex subject into a clear and actionable learning experience.",
  },
  {
    authorName: "Neema R.",
    role: "Project Coordinator",
    company: "Mwanza Development Group",
    message:
      "The sessions gave me tools I could apply right away with my project stakeholders.",
  },
];

export const insights: InsightArticle[] = [
  {
    slug: "business-consulting-improves-your-company",
    title: "Five Ways Business Consulting Can Improve Your Company",
    category: "Consulting",
    excerpt:
      "A short look at how consulting support can clarify priorities, reduce friction, and improve outcomes.",
    date: "2026-08-03",
    body: [
      "Clearer priorities lead to better decisions.",
      "External perspective helps teams see recurring blind spots.",
      "Good consulting creates momentum, not dependency.",
    ],
  },
  {
    slug: "why-every-business-needs-professional-consulting",
    title: "Why Every Business Needs Professional Consulting to Grow",
    category: "Growth",
    excerpt:
      "Professional consulting is often less about big speeches and more about disciplined problem solving.",
    date: "2026-07-26",
    body: [
      "Structured advice helps leadership teams move with more confidence.",
      "Practical support is especially useful when the next step is unclear.",
      "The right guidance shortens the distance between intention and execution.",
    ],
  },
];

export const pagePolicies = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary:
      "We only collect information needed to process enquiries, bookings, and newsletters.",
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "By using the site, you agree to reasonable use of the content, forms, and services provided.",
  },
  {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    summary:
      "Course cancellations and rescheduling are handled with clear communication and fair notice.",
  },
] as const;
