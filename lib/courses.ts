import prisma from "@/lib/prisma";
import { courses as staticCourses, type PublicCourse } from "@/lib/site-content";

export async function getPublishedCourses(): Promise<PublicCourse[]> {
  try {
    const dbCourses = await prisma.course.findMany({
      where: { published: true },
      include: { cohorts: { orderBy: { startDate: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    if (dbCourses.length > 0) {
      return dbCourses.map((course) => {
        const firstCohort = course.cohorts[0];
        const fee = firstCohort
          ? `${firstCohort.currency ?? "TZS"} ${Number(firstCohort.fee).toLocaleString()}`
          : "TZS 450,000";

        let cohortDates = "Upcoming";
        if (firstCohort?.startDate && firstCohort?.endDate) {
          cohortDates = `${new Intl.DateTimeFormat("en-GB", { month: "short", day: "numeric" }).format(
            new Date(firstCohort.startDate)
          )} – ${new Intl.DateTimeFormat("en-GB", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(firstCohort.endDate))}`;
        }

        return {
          slug: course.slug,
          title: course.title,
          category: course.category,
          overview: course.overview,
          duration: course.duration,
          deliveryMode: course.deliveryMode,
          fee,
          imageUrl: course.imageUrl || "/images/courses/project-management.jpg",
          cohortLabel: firstCohort?.status ?? "OPEN",
          cohortId: firstCohort?.id ?? course.id,
          cohortDates,
          sessionTimes: firstCohort?.sessionTimes ?? "09:00 – 16:00",
          venue: firstCohort?.venue ?? "Dar es Salaam",
        };
      });
    }
  } catch (error) {
    console.warn("[courses] Database not reachable, falling back to static catalogue:", error instanceof Error ? error.message : error);
  }

  return staticCourses;
}
