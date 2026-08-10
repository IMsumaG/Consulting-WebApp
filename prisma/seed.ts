import { PrismaClient, DeliveryMode, CohortStatus, BookingStatus, Role, TestimonialSource } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@merxano.co.tz" },
    update: {
      name: "Merxano Admin",
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
    create: {
      name: "Merxano Admin",
      email: "admin@merxano.co.tz",
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      companyName: "Merxano Consulting",
      email: "training@merxano.co.tz",
      phone: "+255 746 000 000",
      whatsapp: "255746000000",
      address: "Dar es Salaam, Tanzania",
      linkedIn: "https://www.linkedin.com",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      youtube: "https://www.youtube.com",
      twitter: "https://www.x.com",
      bankName: "CRDB Bank",
      bankAccountName: "Merxano Consulting",
      bankAccountNumber: "012345678901",
      bankBranch: "Dar es Salaam",
      mobileMoneyName: "M-Pesa",
      mobileMoneyNumber: "+255 746 000 000",
      paymentGateway: null,
    },
    create: {
      companyName: "Merxano Consulting",
      email: "training@merxano.co.tz",
      phone: "+255 746 000 000",
      whatsapp: "255746000000",
      address: "Dar es Salaam, Tanzania",
      linkedIn: "https://www.linkedin.com",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      youtube: "https://www.youtube.com",
      twitter: "https://www.x.com",
      bankName: "CRDB Bank",
      bankAccountName: "Merxano Consulting",
      bankAccountNumber: "012345678901",
      bankBranch: "Dar es Salaam",
      mobileMoneyName: "M-Pesa",
      mobileMoneyNumber: "+255 746 000 000",
      paymentGateway: null,
    },
  });

  const hero = await prisma.heroSection.upsert({
    where: { id: 1 },
    update: {
      headline: "Empowering Professionals & Organizations to Deliver Excellence",
      subheadline:
        "Merxano Consulting provides practical professional training, advisory support, and business growth solutions for organizations across Tanzania.",
      ctaText: "Explore Training",
      ctaLink: "/training",
      backgroundImageUrl: "/images/hero-merxano.jpg",
    },
    create: {
      headline: "Empowering Professionals & Organizations to Deliver Excellence",
      subheadline:
        "Merxano Consulting provides practical professional training, advisory support, and business growth solutions for organizations across Tanzania.",
      ctaText: "Explore Training",
      ctaLink: "/training",
      backgroundImageUrl: "/images/hero-merxano.jpg",
    },
  });

  const courses = [
    {
      title: "Project Management Professional",
      slug: "project-management-professional",
      category: "Project Management",
      overview:
        "Practical training for professionals preparing to plan, execute, monitor, and close projects with confidence.",
      objectives: [
        "Understand project life cycle fundamentals",
        "Apply planning, execution, and control techniques",
        "Prepare for PMI-aligned certification pathways",
      ],
      whoShouldAttend:
        "Project coordinators, managers, team leads, and professionals seeking structured project delivery skills.",
      entryRequirements:
        "No strict prerequisite; basic work experience and commitment to complete assignments is recommended.",
      outline: [
        "Project foundations and stakeholders",
        "Scope, schedule, cost, and risk management",
        "Exam preparation and practice scenarios",
      ],
      duration: "5 days",
      deliveryMode: DeliveryMode.HYBRID,
      trainerInfo:
        "Delivered by Merxano facilitators with practical project delivery and professional certification experience.",
      certInfo: "Aligned to PMI-style learning outcomes with completion certificates issued.",
      imageUrl: "/images/courses/project-management.jpg",
      published: true,
      cohorts: [
        {
          startDate: new Date("2026-09-12T06:00:00.000Z"),
          endDate: new Date("2026-09-16T13:00:00.000Z"),
          sessionDays: "Sat - Wed",
          sessionTimes: "09:00 - 13:00 EAT",
          venue: "Dar es Salaam",
          onlinePlatform: "Zoom",
          fee: "650000",
          currency: "TZS",
          seatsTotal: 20,
          seatsBooked: 6,
          registrationDeadline: new Date("2026-09-08T23:59:59.000Z"),
          status: CohortStatus.OPEN,
        },
        {
          startDate: new Date("2026-11-14T06:00:00.000Z"),
          endDate: new Date("2026-11-18T13:00:00.000Z"),
          sessionDays: "Sat - Wed",
          sessionTimes: "09:00 - 13:00 EAT",
          venue: "Dar es Salaam",
          onlinePlatform: "Zoom",
          fee: "650000",
          currency: "TZS",
          seatsTotal: 20,
          seatsBooked: 0,
          registrationDeadline: new Date("2026-11-10T23:59:59.000Z"),
          status: CohortStatus.COMING_SOON,
        },
      ],
    },
    {
      title: "Business Analysis Certification Pathway",
      slug: "business-analysis-certification-pathway",
      category: "Business Analysis",
      overview:
        "A practical programme for analysts who want to strengthen requirements gathering, stakeholder engagement, and solution design.",
      objectives: [
        "Elicit and document business requirements",
        "Map stakeholders and analyse processes",
        "Improve solution recommendations and handover",
      ],
      whoShouldAttend:
        "Business analysts, product owners, operations staff, and professionals transitioning into analysis roles.",
      entryRequirements:
        "Basic workplace experience and interest in structured analysis approaches.",
      outline: [
        "Business analysis fundamentals",
        "Requirements techniques and modelling",
        "Validation, prioritization, and solution evaluation",
      ],
      duration: "4 days",
      deliveryMode: DeliveryMode.ONLINE,
      trainerInfo:
        "Facilitated by analysts with practical transformation and systems experience.",
      certInfo: "Suitable for ECBA/CBAP-style learning preparation.",
      imageUrl: "/images/courses/business-analysis.jpg",
      published: true,
      cohorts: [
        {
          startDate: new Date("2026-10-10T06:00:00.000Z"),
          endDate: new Date("2026-10-13T13:00:00.000Z"),
          sessionDays: "Sat - Tue",
          sessionTimes: "18:00 - 21:00 EAT",
          venue: null,
          onlinePlatform: "Zoom",
          fee: "480000",
          currency: "TZS",
          seatsTotal: 18,
          seatsBooked: 3,
          registrationDeadline: new Date("2026-10-06T23:59:59.000Z"),
          status: CohortStatus.FEW_SEATS,
        },
        {
          startDate: new Date("2026-12-05T06:00:00.000Z"),
          endDate: new Date("2026-12-08T13:00:00.000Z"),
          sessionDays: "Sat - Tue",
          sessionTimes: "18:00 - 21:00 EAT",
          venue: null,
          onlinePlatform: "Zoom",
          fee: "480000",
          currency: "TZS",
          seatsTotal: 18,
          seatsBooked: 0,
          registrationDeadline: new Date("2026-12-01T23:59:59.000Z"),
          status: CohortStatus.COMING_SOON,
        },
      ],
    },
    {
      title: "Agile & Scrum Delivery",
      slug: "agile-scrum-delivery",
      category: "Agile",
      overview:
        "Hands-on training for teams wanting to adopt agile delivery practices and improve sprint planning, collaboration, and value delivery.",
      objectives: [
        "Understand agile values and Scrum roles",
        "Run effective sprint ceremonies",
        "Apply agile practices in real delivery environments",
      ],
      whoShouldAttend:
        "Product teams, Scrum Masters, project teams, and managers supporting agile adoption.",
      entryRequirements:
        "A willingness to practice new ways of working and participate in group exercises.",
      outline: [
        "Agile principles and team collaboration",
        "Scrum framework, backlog, and sprint flow",
        "Retrospectives and continuous improvement",
      ],
      duration: "3 days",
      deliveryMode: DeliveryMode.PHYSICAL,
      trainerInfo:
        "Delivered by facilitators experienced in team coaching and delivery improvement.",
      certInfo: "Certificate of completion issued on successful attendance.",
      imageUrl: "/images/courses/agile-scrum.jpg",
      published: true,
      cohorts: [
        {
          startDate: new Date("2026-09-26T06:00:00.000Z"),
          endDate: new Date("2026-09-28T13:00:00.000Z"),
          sessionDays: "Sat - Mon",
          sessionTimes: "09:00 - 13:00 EAT",
          venue: "Dar es Salaam",
          onlinePlatform: null,
          fee: "420000",
          currency: "TZS",
          seatsTotal: 16,
          seatsBooked: 10,
          registrationDeadline: new Date("2026-09-22T23:59:59.000Z"),
          status: CohortStatus.FEW_SEATS,
        },
        {
          startDate: new Date("2026-11-21T06:00:00.000Z"),
          endDate: new Date("2026-11-23T13:00:00.000Z"),
          sessionDays: "Sat - Mon",
          sessionTimes: "09:00 - 13:00 EAT",
          venue: "Dar es Salaam",
          onlinePlatform: null,
          fee: "420000",
          currency: "TZS",
          seatsTotal: 16,
          seatsBooked: 0,
          registrationDeadline: new Date("2026-11-17T23:59:59.000Z"),
          status: CohortStatus.COMING_SOON,
        },
      ],
    },
  ] as const;

  for (const courseData of courses) {
    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {
        title: courseData.title,
        category: courseData.category,
        overview: courseData.overview,
        objectives: courseData.objectives,
        whoShouldAttend: courseData.whoShouldAttend,
        entryRequirements: courseData.entryRequirements,
        outline: courseData.outline,
        duration: courseData.duration,
        deliveryMode: courseData.deliveryMode,
        trainerInfo: courseData.trainerInfo,
        certInfo: courseData.certInfo,
        imageUrl: courseData.imageUrl,
        published: courseData.published,
      },
      create: {
        title: courseData.title,
        slug: courseData.slug,
        category: courseData.category,
        overview: courseData.overview,
        objectives: courseData.objectives,
        whoShouldAttend: courseData.whoShouldAttend,
        entryRequirements: courseData.entryRequirements,
        outline: courseData.outline,
        duration: courseData.duration,
        deliveryMode: courseData.deliveryMode,
        trainerInfo: courseData.trainerInfo,
        certInfo: courseData.certInfo,
        imageUrl: courseData.imageUrl,
        published: courseData.published,
      },
    });

    await prisma.cohort.deleteMany({
      where: { courseId: course.id },
    });

    for (const cohortData of courseData.cohorts) {
      await prisma.cohort.createMany({
        data: [
          {
            courseId: course.id,
            startDate: cohortData.startDate,
            endDate: cohortData.endDate,
            sessionDays: cohortData.sessionDays,
            sessionTimes: cohortData.sessionTimes,
            venue: cohortData.venue,
            onlinePlatform: cohortData.onlinePlatform,
            fee: cohortData.fee,
            currency: cohortData.currency,
            seatsTotal: cohortData.seatsTotal,
            seatsBooked: cohortData.seatsBooked,
            registrationDeadline: cohortData.registrationDeadline,
            status: cohortData.status,
          },
        ],
      });
    }
  }

  const testimonials = [
    {
      authorName: "Asha M.",
      role: "Operations Lead",
      company: "Dar es Salaam Logistics",
      message:
        "The training was practical, well structured, and immediately useful for our team.",
      approved: true,
      featured: true,
      source: TestimonialSource.MANUAL,
    },
    {
      authorName: "Juma K.",
      role: "Business Analyst",
      company: "Financial Services Tanzania",
      message:
        "Merxano turned a complex subject into a clear and actionable learning experience.",
      approved: true,
      featured: false,
      source: TestimonialSource.MANUAL,
    },
    {
      authorName: "Neema R.",
      role: "Project Coordinator",
      company: "Mwanza Development Group",
      message:
        "The sessions gave me tools I could apply right away with my project stakeholders.",
      approved: true,
      featured: true,
      source: TestimonialSource.MANUAL,
    },
  ] as const;

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: {
        token: `${testimonial.authorName}-${testimonial.company}`,
      },
      update: {
        authorName: testimonial.authorName,
        role: testimonial.role,
        company: testimonial.company,
        message: testimonial.message,
        approved: testimonial.approved,
        featured: testimonial.featured,
        source: testimonial.source,
      },
      create: {
        authorName: testimonial.authorName,
        role: testimonial.role,
        company: testimonial.company,
        message: testimonial.message,
        approved: testimonial.approved,
        featured: testimonial.featured,
        source: testimonial.source,
        token: `${testimonial.authorName}-${testimonial.company}`,
      },
    });
  }

  // Seed completed — no console output in non-interactive environments
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
