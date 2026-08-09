import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/site-shell";
import { BookingForm } from "@/components/public/forms";
import { courses } from "@/lib/site-content";

export async function generateMetadata({ params }: any) {
  const course = courses.find((item) => item.cohortId === params.cohortId);
  return {
    title: course ? `Booking - ${course.title}` : "Booking",
    description: "Reserve your seat with Merxano Consulting.",
  };
}

export default function BookingPage({ params }: any) {
  const course = courses.find((item) => item.cohortId === params.cohortId);
  if (!course) {
    notFound();
  }

  return (
    <PublicShell message={`Hello, I'm interested in ${course.title} starting ${course.cohortDates}. Please assist me with registration.`}>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">{course.category}</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-navy">{course.title}</h1>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600">
              <p><span className="font-semibold text-slate-900">Dates:</span> {course.cohortDates}</p>
              <p><span className="font-semibold text-slate-900">Time:</span> {course.sessionTimes}</p>
              <p><span className="font-semibold text-slate-900">Venue:</span> {course.venue}</p>
              <p><span className="font-semibold text-slate-900">Fee:</span> {course.fee}</p>
            </div>
          </div>
          <BookingForm endpoint="/api/bookings" cohortId={course.cohortId} courseTitle={course.title} deliveryMode={course.deliveryMode} />
        </div>
      </section>
    </PublicShell>
  );
}
